// src/services/index.js

export {
  setupPlayer,
  stopTrack,
  playTrack,
  isPlayingTrack,
  fadeInMusic,
  fadeOutMusic,
} from "./AudioService";
export { default as createMatchLink } from "./MatchLinkService";
export { saveMusicPreference, getMusicPreference } from "./SettingsService";
