import React, { useEffect, useState } from "react";
import { Card, Text } from "react-native-paper";
import { Image } from "expo-image";
import { Button } from "react-native-paper";
import { fetchAnime } from "../../../api";
import { Dimensions, Linking } from "react-native";
import { ScrollView, View } from "react-native-web";
const { height } = Dimensions.get("window");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const AnimeCard = ({ animeQuote, index }) => {
  const [anime, setAnime] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAnime() {
      setLoading(true);
      const name = animeQuote?.anime?.replace(/ /g, "%20");
      try {
        await delay(parseInt(`${index}000`));
        const response1 = await fetchAnime(name);
        const data = {
          title: response1.data[0].title,
          images: response1.data[0].images.jpg,
          quote: animeQuote.quote,
          url: response1.data[0].url,
        };
        setAnime(data);
        setLoading(false);
      } catch (error) {
        console.warn(error);
        setLoading(false);
      }
    }
    getAnime();
  }, [animeQuote]);

  return (
    <Card
      mode="elevated"
      contentStyle={{
        height: height / 1.6,
        padding: 10,
        alignItems: "center",
        gap: 10,
      }}
    >
      <Image
        contentFit={"cover"}
        style={{
          height: 330,
          width: 250,
          borderRadius: 15,
        }}
        source={anime?.images?.large_image_url}
        transition={1000}
      />
      <Card.Content
        style={{
          width: 250,
          gap: 10,
          alignItems: "center",
          overflow: "scroll",
          height: height / 9,
        }}
      >
        <Text variant="titleMedium" style={{ textAlign: "center" }}>
          {anime?.title}
        </Text>
        <Text
          numberOfLines={3}
          variant="bodySmall"
          style={{
            textAlign: "center",
          }}
        >
          {anime?.quote}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => Linking.openURL(anime?.url)}
          mode="elevated"
          buttonColor="#232f34"
          textColor="white"
        >
          View
        </Button>
      </Card.Actions>
    </Card>
  );
};
