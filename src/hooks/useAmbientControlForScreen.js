import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { fadeOutMusic, playTrack, getMusicPreference, isPlayingTrack } from "@services";
import { setShouldPlayAmbient } from "@utils";
import { MUSIC_PREF_KEY } from "@constants";

export const useAmbientControlForScreen = (playMusic = true) => {
  useFocusEffect(
    useCallback(() => {
      const controlMusic = async () => {
        try {
          // check global setting for sound on
          const userPref = await getMusicPreference(MUSIC_PREF_KEY);
          const playingStatus = await isPlayingTrack();
          if (playMusic && userPref && playingStatus === "playing") return;
          //   console.log('userpref', userPref)
          //    console.log("is music playing:", playingStatus);
          // set ambient per screen
          setShouldPlayAmbient(playMusic);
          // make sure global and screen ambient are true before playing
          if (!playMusic || !userPref) {
            console.log("fading out");
            fadeOutMusic();
          } else if (playMusic && userPref && playingStatus.state.state !== "playing") {
            //   console.log("playingStatus.state: ", playingStatus);
            //   console.log("tellingmusictoplay");
            playTrack();
          }
        } catch (e) {
          console.warn("Error in controlMusic:", e);
        }
      };

      controlMusic();

      return () => {
        ////console.log("cleanup music control");
      };
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  );
};
