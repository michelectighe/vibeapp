// utils/useKickJS.js
import { useEffect, useState } from "react";

export const useKickJS = (delay = 100) => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      forceUpdate((x) => x + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);
};
