
import TrackPlayer, { RepeatMode } from "react-native-track-player";

export const setupPlayer = async () => {
  //console.log("trying to set up player now");
  await TrackPlayer.setupPlayer();
  await TrackPlayer.setVolume(0.1);
  await TrackPlayer.setRepeatMode(0); // repeat mode off
};

export const playTrack = async (
  id = "ambient",
  url = require("@assets/audio/waves.mp3"),
  title = "Waves",
  artist = "VibeKey",
  vol = 0.03,
  fadeIn = true,
  loop = true,
) => {
  await TrackPlayer.reset();
  await TrackPlayer.add({ id, url, title, artist });
  await TrackPlayer.setRepeatMode(loop ? RepeatMode.Track : RepeatMode.Off);
  if (fadeIn) {
    console.log("fading in");
    await TrackPlayer.setVolume(0); // start silent
    await TrackPlayer.play();
    await fadeInMusic(vol); // fade to target volume
  } else {
    await TrackPlayer.setVolume(vol);
    await TrackPlayer.play();
  }
};

export const stopTrack = async () => {
  await TrackPlayer.stop();
};

export const isPlayingTrack = async (getTitle = false) => {
  const state = await TrackPlayer.getPlaybackState();
  try {
    const activeTrackId = await TrackPlayer.getActiveTrack(); // this gives you the ID
    if (!activeTrackId) return { state, title: null };

    const track = await TrackPlayer.getTrack(activeTrackId); // this gives you the full track object
    const title = track?.title || null;
    if (getTitle) {
      return { state: state, title: title };
    } else {
      return { state: state };
    }
  } catch (error) {
    console.warn("Error fetching track title:", error);
    return { state: state };
  }
};

export const fadeOutMusic = async (duration = 2000, steps = 10) => {
  const currentState = await TrackPlayer.getPlaybackState();
  if (currentState.state !== "playing") {
    console.log("⏭️ Music is not playing — skipping fade out");
    return;
  }
  const initialVolume = await TrackPlayer.getVolume();
  const stepTime = duration / steps;
  const stepSize = initialVolume / steps;

  for (let i = 0; i < steps; i++) {
    await TrackPlayer.setVolume(initialVolume - i * stepSize);
    await new Promise((res) => setTimeout(res, stepTime));
  }
  await TrackPlayer.stop();
};

export const fadeInMusic = async (targetVolume = 1.0, duration = 2000, steps = 10) => {
  const stepTime = duration / steps;
  const stepSize = targetVolume / steps;

  for (let i = 0; i < steps; i++) {
    await TrackPlayer.setVolume(stepSize * i);
    await new Promise((res) => setTimeout(res, stepTime));
  }

  await TrackPlayer.setVolume(targetVolume); // ensure exact final value
};
