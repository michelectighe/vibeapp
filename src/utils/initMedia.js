import { Camera } from "react-native-vision-camera";
import AudioRecord from "react-native-audio-record";


export const initMedia = async (
  frameProcessorActiveRef = null,
  audioConfig = {},
  mode = "audio",
) => {
  try {
    //console.log("🎙️ Initializing media...");
    const devices = await Camera.getAvailableCameraDevices();
    if (!devices || devices.length === 0) {
      console.warn("No cameras available.");
      return;
    }

    // Only request camera if we're using it
    if (frameProcessorActiveRef) {
      const cameraPermission = Camera.getCameraPermissionStatus();
      //console.log("camera permission:", cameraPermission);
      if (cameraPermission !== "authorized" && cameraPermission !== "granted") {
        const newStatus = await Camera.requestCameraPermission();
        if (newStatus !== "authorized" && newStatus !== "granted")
          throw new Error("Camera permission denied");
      }

      // Optional frame processor flag activation
      frameProcessorActiveRef.current = true;
      ////console.log("📸 Camera initialized & frame processor active");
    }

    // Mic permission needed for both modes
    if (mode === "audio") {
      const micPermission = Camera.getMicrophonePermissionStatus();
      //console.log('mic permission: ', micPermission)
      if (micPermission !== "authorized" && micPermission !== "granted") {
        const newStatus = await Camera.requestMicrophonePermission();
        if (newStatus !== "authorized" && newStatus !== "granted")
          throw new Error("Mic permission denied");
      }
    }

    if (mode === "audio") {
      const defaultConfig = {
        sampleRate: 16000, // Hz
        channels: 1,       // mono
        bitsPerSample: 16,
        audioSource: 6,    // voice recognition
        wavFile: "test.wav",
        ...audioConfig,
      };

      AudioRecord.init(defaultConfig);
      // AudioRecord.start();
    }


    ////console.log("✅ Media initialized.");
  } catch (error) {
    console.warn("⚠️ Error during media initialization:", error);
    throw error;
  }
};
