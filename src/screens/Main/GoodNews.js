import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Linking } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { dbFs } from "@/config/firebaseConfig";
import { getTodayGoodNews } from "@/utils";
import { CloseX, GradientBackground } from "@components";
import { Colors } from "@constants";
import { styles } from "./GoodNewsScreen.styles"; // 👈 your new style file

export const GoodNewsScreen = () => {
  const [story, setStory] = useState(null);
  const [imageError, setImageError] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const storyId = route.params?.storyId || null;


  useEffect(() => {
    const loadStory = async () => {
      if (storyId) {
        const ref = doc(dbFs, "goodNews", storyId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setStory(snap.data());
          //console.log('story url:', snap.data().imageUrl)
          return;
        }
      }

      const todayStory = await getTodayGoodNews();
      setStory(todayStory);
    };

    loadStory();
  }, [storyId]);

  if (!story) return <Text>Loading good vibes...</Text>;

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <CloseX xColor={Colors.textDark} onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Text style={styles.header}>Today`&apos`s Good News</Text>
        <View style={styles.newsView}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {story.imageUrl && !imageError && (
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: story.imageUrl }}
                  style={styles.image}
                  onError={() => setImageError(true)} // ✅ handle failure
                />
              </View>
            )}

            <Text style={styles.title}>{story.title}</Text>
            <Text style={styles.content}>{story.content}</Text>

            {story.sourceUrl && (
              <Text style={styles.link} onPress={() => Linking.openURL(story.sourceUrl)}>
                Read more
              </Text>
            )}
            <Text style={styles.vibe}>
              Frequency Vibe: {story.vibeLabel} ({story.vibeLevel})
            </Text>
          </ScrollView>
        </View>
      </View>
    </GradientBackground>
  );
};
