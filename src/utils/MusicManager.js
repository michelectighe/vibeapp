import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { setupPlayer, playTrack, stopTrack, getMusicPreference } from "@services";

let shouldPlayAmbient = true;
let userMusicPref = true;

export const setShouldPlayAmbient = (value) => {
  shouldPlayAmbient = value;
};

export const setUserMusicPref = (value) => {
  userMusicPref = value;
};

export const MusicManager = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        await setupPlayer();

        const musicPref = await getMusicPreference();
        setUserMusicPref(musicPref);

        if (userMusicPref && shouldPlayAmbient) {
          await playTrack(); // this will play default ambient (with no flags)
        }
      } catch (err) {
        console.error("❌ Error during music init:", err);
      }
    };

    init();

    const subscription = AppState.addEventListener("change", async (nextAppState) => {
      if (!isMounted) return;

      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        const musicPref = await getMusicPreference();
        setUserMusicPref(musicPref);

        if (userMusicPref && shouldPlayAmbient) {
          await playTrack(); // this will play default ambient (with no flags)
        }
      } else if (nextAppState.match(/inactive|background/)) {
        // App going to background
        await stopTrack();
      }

      appState.current = nextAppState;
    });

    return () => {
      console.log("returning");
      isMounted = false;
      subscription.remove();
      stopTrack();
    };
  }, []);

  return null; // This component doesn’t render anything
};
