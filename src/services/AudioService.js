import TrackPlayer from "react-native-track-player";

export const setupPlayer = async () => {
  console.log("trying to set up player now");
  await TrackPlayer.setupPlayer();
  await TrackPlayer.setVolume(0.1);
  await TrackPlayer.setRepeatMode(0); // repeat mode off
};

export const playTrack = async (
  id = "ambient",
  //  url = require("@assets/audio/Enchantment.mp3"),
  url = require("@assets/audio/waves.mp3"),
  title = "Enchantment",
  artist = "VibeKey",
  vol = 0.03,
  fadeIn = true
) => {
  await TrackPlayer.reset();
  await TrackPlayer.add({ id, url, title, artist });

  if (fadeIn) {
    await TrackPlayer.setVolume(0); // start silent
    await TrackPlayer.play();
    await fadeInMusic((targetVolume = vol)); // fade to target volume
  } else {
    await TrackPlayer.setVolume(vol);
    await TrackPlayer.play();
  }
};

export const stopTrack = async () => {
  await TrackPlayer.stop();
};

export const isPlayingTrack = async () => {
  const state = await TrackPlayer.getPlaybackState();
  console.log("state:", state);
  return state;
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

export const fadeInMusic = async (
  targetVolume = 1.0,
  duration = 2000,
  steps = 10
) => {
  const stepTime = duration / steps;
  const stepSize = targetVolume / steps;

  for (let i = 0; i < steps; i++) {
    await TrackPlayer.setVolume(stepSize * i);
    await new Promise((res) => setTimeout(res, stepTime));
  }

  await TrackPlayer.setVolume(targetVolume); // ensure exact final value
};
