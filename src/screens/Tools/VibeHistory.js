import React, { useState, useRef, useContext, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { vibrationLevels } from "@/data";
import { SectionLayout, FuzzyGlow } from "@components";
import { styles } from "./VibeHistory.styles";
import { getVibeHistory, groupScores } from "@/utils";
import LinearGradient from "react-native-linear-gradient";
import { EdgeGlow } from "@/components";
import { SCREEN_WIDTH , parseMetric} from "@/utils";
import { chakraData } from "@/data";
import { GradientBackground } from "@/components";
import { Colors } from "@/constants";
import { CloseX } from "@/components";
import { MyResultsContext } from "@/context/MyResultsContext";

const ITEM_WIDTH = 60;

export const VibeHistoryScreen = () => {
  const navigation = useNavigation();
  const { myResults } = useContext(MyResultsContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatListRef = useRef();
  const [data, setData] = useState(null);
  const BASE_GLOW_CONTAINER_SIZE = SCREEN_WIDTH / 6;

  useEffect(() => {
 if (!myResults) return;
     try {
    const getHistory = async () => {
      const scores = await getVibeHistory(myResults);
     console.log('scores back from vibehistoryget:', scores)
      const grouped = groupScores(scores, "daily"); // or weekly
      setData(grouped);
      console.log('grouped scores:', grouped)
    }
    getHistory();
  } catch(error) {
    console.error('error getting vibe history:', error)
  }
  }, [myResults]);

  const getLevelInfo = (score) => vibrationLevels.find((level) => score >= level.minScore);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setSelectedIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.chartItem, selectedIndex === index && styles.chartItemSelected]}
      onPress={() => {
        flatListRef.current.scrollToIndex({ index, animated: true });
        setSelectedIndex(index);
      }}
    >
      <LinearGradient
        colors={[item.barColor + "33", item.barColor]} // gradient to transparent
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={[
          styles.bar,
          {
            height: item.value * 1.5,
          },
        ]}
      />

      <Text style={styles.chartLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  const selectedItem = React.useMemo(() => {
    return data?.[selectedIndex] ?? null;
  }, [data, selectedIndex]);

  const levelInfo = React.useMemo(() => {
    return selectedItem ? getLevelInfo(selectedItem.value) : null;
  }, [selectedItem]);
  const paddedChakras =
    selectedItem?.chakraScores?.length === 7
      ? [...selectedItem.chakraScores]
      : chakraData.map((chakra) => ({
          ...chakra,
          score: 0,
        }));

  const handlePress = (event, chakra) => {
    const { pageX, pageY } = event.nativeEvent;
    navigation.navigate("ChakraDetailModal", {
      chakra,
      originX: pageX,
      originY: pageY,
    });
  };

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <CloseX xColor={Colors.textDark} onPress={() => navigation.goBack()} />
      <SectionLayout
        topFlex={0}
        middleFlex={2}
        bottomFlex={1}
        topContent={
          data && (
            <Text style={styles.yearLabel}>{format(new Date(selectedItem?.date), "yyyy")}</Text>
          )
        }
        middleContent={
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              {data && (
                <FlatList
                  ref={flatListRef}
                  data={data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  getItemLayout={(data, index) => ({
                    length: ITEM_WIDTH,
                    offset: ITEM_WIDTH * index,
                    index,
                  })}
                  initialScrollIndex={selectedIndex}
                  onViewableItemsChanged={onViewRef.current}
                  viewabilityConfig={viewConfigRef.current}
                  contentContainerStyle={{ paddingHorizontal: 16 }}
                />
              )}
            </View>
            <View style={{ flex: 1.2, justifyContent: "center" }}>
              {selectedItem && levelInfo && (
                <View style={styles.detailsBox}>
                  <EdgeGlow
                    width={SCREEN_WIDTH * 0.9}
                    height={"120%"}
                    borderRadius={12}
                    glowColor={selectedItem.barColor}
                  />
                  {/* <Text style={styles.detailDate}>
                  {format(new Date(selectedItem.date), "EEEE, MMMM do")}
                </Text> */}
                  <Text style={styles.detailScore}>
                    Vibration Score: {selectedItem.value.toFixed(0)}
                  </Text>
                  <Text style={styles.detailText}>{levelInfo?.label}</Text>
                  <Text style={styles.detailDescription}>{levelInfo?.historyDescription}</Text>
                </View>
              )}
            </View>
          </View>
        }
        bottomContent={
          paddedChakras.length === 7 ? (
            <View
              style={{
                width: SCREEN_WIDTH,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 24,
              }}
            >
              {paddedChakras.map((chakra, index) => (
                <View
                  key={index}
                  style={{
                    width: SCREEN_WIDTH / 4 - 12,
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  {/* Glow Wrapper with fixed height */}
                  <View
                    style={{
                      width: BASE_GLOW_CONTAINER_SIZE,
                      height: BASE_GLOW_CONTAINER_SIZE,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Pressable onPress={(event) => handlePress(event, chakra)}>
                      <FuzzyGlow
                        glowSize={(chakra.score / 100) * BASE_GLOW_CONTAINER_SIZE} // scale 0–100 to 0–base size
                        glowColor={chakra.color}
                      />
                    </Pressable>
                  </View>

                  <Text
                    style={{
                      marginTop: 0,
                      fontSize: 12,
                      color: chakra.color,
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    {chakra.name.split(" ")[0]}
                  </Text>
                </View>
              ))}
            </View>
          ) : null
        }
      />
    </GradientBackground>
  );
};
