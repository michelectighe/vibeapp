import React, { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { setupPlayer, playTrack, stopTrack } from "@services";

const MusicManager = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      await setupPlayer();
      await playTrack();
    };

    init();

    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        if (!isMounted) return;

        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          // App came back to foreground
          await playTrack();
        } else if (nextAppState.match(/inactive|background/)) {
          // App going to background
          await stopTrack();
        }

        appState.current = nextAppState;
      }
    );

    return () => {
      isMounted = false;
      subscription.remove();
      stopTrack();
    };
  }, []);

  return null; // This component doesn’t render anything
};

export default MusicManager;
