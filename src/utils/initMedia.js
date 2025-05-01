//import { Camera } from "react-native-vision-camera";
import { AudioRecorder } from "react-native-audio";
import SoundLevel from "react-native-sound-level";

export const initMedia = async (
  frameProcessorActiveRef = null,
  audioConfig = {},
  mode = "audio" // or "soundLevel", or "both"
) => {
  try {
    //console.log("🎙️ Initializing media...");


    // const devices = await Camera.getAvailableCameraDevices();
    // if (!devices || devices.length === 0) {
    //   console.warn("No cameras available.");
    //   return;
    // }

    // // Safe to use the first camera
    // const device = devices[0];
    // // Proceed with camera usage...





    // Only request camera if we're using it
    if (frameProcessorActiveRef) {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission !== "authorized" && cameraPermission !== "granted") {
        const newStatus = await Camera.requestCameraPermission();
        if (newStatus !== "authorized" && newStatus !== "granted")
          throw new Error("Camera permission denied");
      }

      // Optional frame processor flag activation
      frameProcessorActiveRef.current = true;
      //console.log("📸 Camera initialized & frame processor active");
    }

    // Mic permission needed for both modes
    if (mode === "audio" || mode === "soundLevel" || mode === "both") {
      const micPermission = await Camera.getMicrophonePermissionStatus();
      if (micPermission !== "authorized" && micPermission !== "granted") {
        const newStatus = await Camera.requestMicrophonePermission();
        if (newStatus !== "authorized" && newStatus !== "granted")
          throw new Error("Mic permission denied");
      }
    }

    if (mode === "audio" || mode === "both") {
      const mergedConfig = {
        path: "test.aac",
        settings: {
          SampleRate: 16000,
          Channels: 1,
          AudioQuality: "Medium",
          AudioEncoding: "aac",
          ...audioConfig.settings,
        },
        ...audioConfig,
      };

      await AudioRecorder.prepareRecordingAtPath(
        mergedConfig.path,
        mergedConfig.settings
      );
      //console.log("✅ AudioRecorder prepared");
    }

    if (mode === "soundLevel" || mode === "both") {
      SoundLevel.start();
      //console.log("✅ Sound level monitoring started");
    }

    //console.log("✅ Media initialized.");
  } catch (error) {
    console.warn("⚠️ Error during media initialization:", error);
    throw error;
  }
};
