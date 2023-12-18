import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { View } from "react-native";
import { AnimeCard } from "../../Components/HomeScreenComponents/AnimeCard";
import { Animated } from "react-native";
import { Text } from "react-native-paper";
const { width, height } = Dimensions.get("window");

const ITEM_SIZE = width * 0.68;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const HomeScreen = ({ animeQuotes }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [animes, setAnimes] = useState([
    { key: "left-spacer" },
    ...animeQuotes,
    { key: "right-space" },
  ]);

  useEffect(() => {
    function setQuotes() {
      setAnimes([
        { key: "left-spacer" },
        ...animeQuotes,
        { key: "right-space" },
      ]);
    }
    setQuotes();
  }, [animeQuotes]);

  return (
    <View>
      <Animated.FlatList
        data={animes}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        bounces={true}
        decelerationRate={99}
        renderItem={({ item, index }) => {
          if (!item.anime) {
            return <View style={{ width: SPACER_ITEM_SIZE }} />;
          }
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [220, 180, 220],
          });
          return (
            <Animated.View
              style={{
                flex: 1,
                margin: 10,
                transform: [{ translateY }],
              }}
            >
              <AnimeCard animeQuote={item} index={index} />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;
