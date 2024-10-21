import { View } from "react-native";
import React from "react";
import { useColorScheme } from "~/lib/useColorScheme";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Text as TextUi,
} from "~/components/ui";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

export default function NewsCard({
  news,
}: {
  news: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
    categoryId: number;
    eventUrl: string;
  };
}) {
  const convertedDate = new Date(news.date);
  if (news.categoryId !== 2) {
    return null;
  }
  return (
    <Card className="mb-6">
      <View className="p-4" style={{ height: 200 }}>
        <Image
          source={news.imageUrl}
          contentFit="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 16,
          }}
        />
      </View>
      <CardHeader className="items-center">
        <CardTitle>{news.title}</CardTitle>
      </CardHeader>
      <CardContent className="items-center">
        <TextUi>{convertedDate.toDateString()}</TextUi>

        <Button className="flex-row gap-4 mt-8" style={{ width: 200 }}>
          <Ionicons
            name="newspaper-outline"
            size={20}
            color={useColorScheme().colorScheme === "dark" ? "black" : "white"}
          />
          <Link href={news.eventUrl}>
            <TextUi>Read</TextUi>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
