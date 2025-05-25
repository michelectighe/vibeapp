export const checkConnection = async () => {
  const state = await NetInfo.fetch();
  const isOffline = !state.isConnected || !state.isInternetReachable;
  console.log("Connection status:", isOffline ? "No internet" : "Connected");
  return isOffline;
};
