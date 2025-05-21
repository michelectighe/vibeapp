import TrackPlayer, { Event, RepeatMode } from "react-native-track-player";
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

        await TrackPlayer.setRepeatMode(RepeatMode.Track);
        const musicPref = await getMusicPreference();
        setUserMusicPref(musicPref);

        if (userMusicPref && shouldPlayAmbient) {
          await playTrack();
        }
      } catch (err) {
        console.error("❌ Error during music init:", err);
      }
    };

    init();

    // 🔁 TrackPlayer event listeners
    const listeners = [
      TrackPlayer.addEventListener(Event.PlaybackState, () => {
      }),
      TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, () => {
      }),
      TrackPlayer.addEventListener(Event.PlaybackPlayWhenReadyChanged, () => {
      }),
    ];

    const subscription = AppState.addEventListener("change", async (nextAppState) => {
      if (!isMounted) return;

      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        const musicPref = await getMusicPreference();
        setUserMusicPref(musicPref);

        if (userMusicPref && shouldPlayAmbient) {
          await playTrack();
        }
      } else if (nextAppState.match(/inactive|background/)) {
        await stopTrack();
      }

      appState.current = nextAppState;
    });

    return () => {
      //console.log("🛑 Cleaning up MusicManager");
      isMounted = false;
      subscription.remove();
      listeners.forEach((l) => l.remove());
      stopTrack();
    };
  }, []);

  return null;
};
