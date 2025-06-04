import React, { useEffect, useState, useContext } from "react";
import {
  View,
  ActivityIndicator,
  Share,
  TextInput,
  Keyboard,
  Switch,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { MyResultsContext } from "@/context/MyResultsContext";
import { useAuth, useUserProfile } from "@context";
import { GradientBackground, ResultSelector, SectionLayout } from "@components";
import { createMatchLink } from "@services";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { SubscriptionModal } from "@components";
import { styles } from "./ShareScreen.styles";
import { deleteResult } from "@/database";
import { clearCreateShare, setCreateShare, SCREEN_HEIGHT } from "@/utils";
import { CustomSpiritualButton } from "@/components";

export const ShareScreen = () => {
  useAmbientControlForScreen(true);
  const navigation = useNavigation();
  const { myResults, setMyResults, loading } = useContext(MyResultsContext);
  const { profile } = useUserProfile();
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(true);
  const [showSubModal, setShowSubModal] = useState(false);
  const auth = getAuth();
  const { user, authLoading, isPremium } = useAuth(); // 🔑 assuming `isPremium` is part of auth context
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [shareName, setShareName] = useState("Someone");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      console.log("trying to navigate to sign in screen");
      navigation.navigate("Tabs", {
        screen: "Settings",
        params: {
          screen: "SignInScreen",
          params: {
            returnTo: {
              name: "VibeMatch",
              params: { screen: "ShareScreen" },
            },
          },
        },
      });
      // } else if (!isPremium) {
      //   //console.log("not premium - show modal");
      //   setShowSubModal(true);
      //   setLoading(false);
    } else {
      if (user.displayName) {
        setShareName(user.displayName);
      }
      if (myResults && !loading && myResults.length > 0) {
        setResults(myResults);
        setNoResults(false);
      }
    }
  }, [authLoading, loading, user, isPremium, myResults]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTakeTest = () => {
    setCreateShare();
    navigation.navigate("VibeCheck", { screen: "VibecheckScreen" });
  };
  const onShare = async (item) => {
    try {
      //console.log("onshare item:", item);
      clearCreateShare();
      const name = profile.displayName;
      const link = await createMatchLink(item.resultId, auth.currentUser.uid, name, isAnonymous);
      await Share.share({
        message: `Compare your vibe with mine! Tap this link to begin: ${link}`,
      });
    } catch (err) {
      console.error("Share error:", err);
    }
  };

  const onTrash = async (item) => {
    try {
      if (!user?.uid || !item) {
        console.error("❌ Cannot delete — missing user or item.");
        return;
      }
      const success = await deleteResult(user.uid, item.resultId);
      if (success) {
        console.log("succeeded");
        setMyResults((prev) => prev.filter((r) => r.resultId !== item.resultId));
      } else {
        console.log("failed");
      }
    } catch (err) {
      console.error("Deletion error:", err);
    }
  };

  const showResults = async (item) => {
    try {
      navigation.navigate("Tabs", {
        screen: "VibeCheck",
        params: {
          screen: "Results",
          params: {
            resultId: item.resultId,
            returnTo: "VibeMatch",
          },
        },
      });
    } catch (err) {
      console.error("Get Results error:", err);
    }
  };

  if (!myResults) {
    return <ActivityIndicator size="large" style={{ marginTop: SCREEN_HEIGHT * 0.2 }} />;
  }
  // console.log("results:", results);
  return (
    <>
      <GradientBackground
        colors={[
          Colors.gradient1Match,
          Colors.gradient2Match,
          Colors.gradient3Match,
          Colors.gradient1Match,
        ]}
      >
        <SectionLayout
          topFlex={1}
          middleFlex={0}
          bottomFlex={0}
          safe={false}
          topContent={
            <>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>Vibe Match</Text>
                {!noResults && (
                  <Text style={styles.subTitle}>Let&apos;s see if your vibes are in sync.</Text>
                )}
              </View>

              <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
   
                  <CustomSpiritualButton
                    label="Do a New Vibe Check"
                    onPress={() => {
                      setCreateShare();
                      navigation.navigate("VibeCheck", { screen: "VibecheckScreen" });
                    }}
                    color={Colors.surface}
                    textColor={Colors.textDark}
                  />
  
                {!noResults && (
                  <ResultSelector
                    results={myResults}
                    onSelect={(item) => showResults(item)}
                    onShare={(item) => onShare(item)}
                    onTrash={(item) => onTrash(item)}
                  />
                )}
              </ScrollView>
            </>
          }
        />
      </GradientBackground>

      <SubscriptionModal
        visible={showSubModal}
        onClose={(shouldUpgrade) => {
          setShowSubModal(false);
          if (!shouldUpgrade) {
            navigation.replace("Tabs", { screen: "Home" });
          }
        }}
        onUpgrade={() => {
          navigation.navigate("Tabs", {
            screen: "Settings",
            params: {
              screen: "SubscriptionScreen",
              params: { returnTo: "ShareScreen" },
            },
          });
        }}
      />
    </>
  );
};
