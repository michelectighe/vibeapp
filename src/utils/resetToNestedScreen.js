export const resetToNestedScreen = (navigation, screens = [], paramsMap = {}) => {
  if (!navigation || screens.length === 0) return;

  // Build nested state from deepest to root
  let route = {
    name: screens[screens.length - 1],
    params: paramsMap[screens[screens.length - 1]] || {},
  };

  for (let i = screens.length - 2; i >= 0; i--) {
    route = {
      name: screens[i],
      params: paramsMap[screens[i]] || {},
      state: {
        routes: [route],
      },
    };
  }

  navigation.reset({
    index: 0,
    routes: [route],
  });
};
