import Purchases from "react-native-purchases";

export const startPurchaseFlow = async () => {
  try {
    const offerings = await Purchases.getOfferings();

    if (offerings.current && offerings.current.availablePackages.length > 0) {
      const packageToBuy = offerings.current.availablePackages[0];

      const { customerInfo } = await Purchases.purchasePackage(packageToBuy);

      if (typeof customerInfo.entitlements.active.Premium_Access !== "undefined") {
        // 🥳 Purchase success, entitlement is now active!
        return { success: true };
      }
    }

    return { success: false, message: "No packages available" };
  } catch (e) {
    if (!e.userCancelled) {
      console.error("Purchase failed:", e);
    }
    return { success: false, message: e.message };
  }
};
