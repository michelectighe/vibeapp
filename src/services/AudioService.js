import TrackPlayer from "react-native-track-player";

export const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.setVolume(0.1);
  await TrackPlayer.setRepeatMode(0); // repeat mode off
};

export const playTrack = async ({ id, url, title }) => {
  await TrackPlayer.reset(); // Stop current and clear queue
  await TrackPlayer.add({
    id,
    url,
    title,
    artist: "VibeKey",
  });
  await TrackPlayer.play();
};

export const stopTrack = async () => {
  await TrackPlayer.stop();
};

export const isPlayingTrack = async () => {
  const state = await TrackPlayer.getPlaybackState();
  console.log('state:', state)
  return state;
};

export const fadeOutMusic = async (duration = 2000, steps = 10) => {
  const initialVolume = 0.1; // or whatever volume you started with
  const stepTime = duration / steps;
  const stepSize = initialVolume / steps;

  for (let i = 0; i < steps; i++) {
    await TrackPlayer.setVolume(initialVolume - i * stepSize);
    await new Promise((res) => setTimeout(res, stepTime));
  }

  await TrackPlayer.stop();
};

export const fadeInMusic = async (duration = 2000, steps = 10) => {
  const initialVolume = 0.1; // or whatever volume you started with
  const stepTime = duration / steps;
  const stepSize = initialVolume / steps;

  for (let i = 0; i < steps; i++) {
    await TrackPlayer.setVolume(initialVolume + i * stepSize);
    await new Promise((res) => setTimeout(res, stepTime));
  }

  await TrackPlayer.stop();
};
