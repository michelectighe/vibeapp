// matchLinkStore.js
let matchId = null;
let createShare = false;

export const setMatchId = (id) => {
  matchId = id;
};

export const getMatchId = () => matchId;

export const clearMatchId = () => {
  matchId = null;
};

export const setCreateShare = () => {
  createShare = true;
};

export const getCreateShare = () => createShare;

export const clearCreateShare = () => {
  createShare = false;
};
