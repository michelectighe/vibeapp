export const debounceLabel = ({
  newLabel,
  lastLabelRef,
  lastSetTimestampRef,
  timeoutRef,
  setter,
  delay = 1000,
}) => {
  const now = Date.now();
  if (!lastLabelRef.current) {
    lastLabelRef.current = newLabel;
    lastSetTimestampRef.current = now;
    requestAnimationFrame(() => setter(newLabel));
    return;
  }
  if (
    newLabel !== lastLabelRef.current &&
    now - lastSetTimestampRef.current > delay
  ) {
    clearTimeout(timeoutRef.current);
    lastLabelRef.current = newLabel;
    lastSetTimestampRef.current = Date.now();
    requestAnimationFrame(() => setter(newLabel));
  }
};

export const debounceSoundLabel = ({
  newLabel,
  lastLabelRef,
  lastSetTimestampRef,
  timeoutRef,
  setter,
  delay = 1000,
}) => {
  const now = Date.now();
  if (!lastLabelRef.current) {
    lastLabelRef.current = newLabel;
    lastSetTimestampRef.current = now;
    requestAnimationFrame(() => setter(newLabel));
    return;
  }
  if (
    newLabel !== lastLabelRef.current &&
    now - lastSetTimestampRef.current > delay
  ) {
    clearTimeout(timeoutRef.current);
    lastLabelRef.current = newLabel;
    lastSetTimestampRef.current = Date.now();
    requestAnimationFrame(() => setter(newLabel));
  }
};

export const debounceMotionLabel = ({
  newLabel,
  lastLabelRef,
  lastSetTimestampRef,
  timeoutRef,
  setter,
  delay = 1000,
}) => {
  const now = Date.now();
  if (!lastLabelRef.current) {
    lastLabelRef.current = newLabel;
    lastSetTimestampRef.current = now;
    requestAnimationFrame(() => setter(newLabel));
    return;
  }

  if (newLabel !== lastLabelRef.current) {
    clearTimeout(timeoutRef.current);
    lastLabelRef.current = newLabel;
    lastSetTimestampRef.current = Date.now();
    requestAnimationFrame(() => setter(newLabel));
  }
};

export const debounceMagLabel = ({
  newLabel,
  lastLabelRef,
  lastSetTimestampRef,
  timeoutRef,
  setter,
  delay = 1000,
}) => {
  const now = Date.now();
  if (!lastLabelRef.current) {
    lastLabelRef.current = newLabel;
    lastSetTimestampRef.current = now;
    requestAnimationFrame(() => setter(newLabel));
    return;
  }

  if (newLabel !== lastLabelRef.current) {
    clearTimeout(timeoutRef.current);
    lastLabelRef.current = newLabel;
    lastSetTimestampRef.current = Date.now();
    requestAnimationFrame(() => setter(newLabel));
  }
};
