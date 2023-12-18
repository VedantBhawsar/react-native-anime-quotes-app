import { Dimensions, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import React, { useEffect, useState } from "react";
import HomeScreen from "./src/Screens/HomeScreen";
import { Text } from "react-native-paper";
import { fetchQuote } from "./src/api";
import { Button } from "react-native-paper";
import { demoQuotes } from "./src/constants/data";
const { width, height } = Dimensions.get("window");

export default function App() {
  const [animeQuotes, setAnimeQuotes] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getAnime() {
      const response = await fetchQuote()
        .then((response) => {
          setAnimeQuotes(response);
        })
        .catch(() => setAnimeQuotes(demoQuotes));
    }
    getAnime();
  }, [count]);

  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: "#232f34",
          justifyContent: "center",
          alignItems: "center",
          // gap: 40,
        }}
      >
        <HomeScreen animeQuotes={animeQuotes} />
        <Button
          onPress={() => setCount((prev) => prev + 1)}
          mode="outlined"
          buttonColor="#232f34"
          textColor="white"
          style={{
            marginBottom: 50,
          }}
        >
          Random
        </Button>
      </View>
    </PaperProvider>
  );
}
