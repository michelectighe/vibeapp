// cleanupAudioRecording.js
import { Camera } from "react-native-vision-camera";
import { AudioRecorder } from "react-native-audio";
import SoundLevel from "react-native-sound-level";

export const cleanupMedia = async (
  useAudio = false,
  useSoundLevel = false,
  useCamera = false,
  frameProcessorActiveRef = null,
  isAudioRecording = false,
) => {
  try {
    //console.log("🔇 Cleaning up all media ...");
    const devices = await Camera.getAvailableCameraDevices();
    if (!devices || devices.length === 0) {
      console.warn("No cameras available.");
      return;
    }

    if (useCamera) {
      try {
        // Stop the camera if it’s running
        await Camera.stopRecording?.();
      } catch (e) {
        console.warn("Error stopping camera recording:", e);
      }
    }
    if (useAudio && isAudioRecording) {
      try {
        // Stop recording if it’s in progress
        await AudioRecorder.stopRecording();
      } catch (e) {
        console.warn("Error stopping Audio recording:", e);
      }
    }

    // Stop sound level monitoring
    if (useSoundLevel) {
      SoundLevel.stop();
    }

    if (frameProcessorActiveRef?.current !== undefined) {
      frameProcessorActiveRef.current = false;
    }

    //console.log("✅ Media cleanup complete.");
  } catch (error) {
    console.warn("⚠️ Error during media cleanup:", error);
  }
};
