// src/services/index.js

export {
  setupPlayer,
  stopTrack,
  playTrack,
  isPlayingTrack,
  fadeInMusic,
  fadeOutMusic,
} from "./AudioService";
export { createMatchLink } from "./MatchLinkService";
export { saveMusicPreference, getMusicPreference } from "./SettingsService";
