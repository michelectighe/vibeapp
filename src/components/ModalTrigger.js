import React, { useState, useMemo, useEffect } from "react";
import { CustomModal } from "./CustomModal";

export const ModalTrigger = ({ navigation, children }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [pendingNav, setPendingNav] = useState(null);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handleClose = () => {
    setModalVisible(false);
    setShouldNavigate(true);
  };

  useEffect(() => {
    if (!modalVisible && shouldNavigate && pendingNav) {
      navigation.navigate(pendingNav.stack, {
        screen: pendingNav.screen,
        params: pendingNav.params || {},
      });
      setShouldNavigate(false);
      setPendingNav(null);
    }
  }, [modalVisible, shouldNavigate, pendingNav]);

  const clonedChild = useMemo(() => {
    if (!React.isValidElement(children)) return null;
    return React.cloneElement(children, {
      navigation,
      close: handleClose,
      setNextScreen: setPendingNav,
    });
  }, [children, navigation]);

  return (
    <CustomModal visible={modalVisible} onClose={handleClose}>
      {clonedChild}
    </CustomModal>
  );
};
