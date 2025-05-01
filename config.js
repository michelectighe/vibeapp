// src/config/index.js
export const IS_DEV = __DEV__;
export const API_BASE_URL = IS_DEV
  ? "http://localhost:3000"
  : "https://api.myapp.com";
