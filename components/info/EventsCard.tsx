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

export default function Events({
  event,
}: {
  event: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
    categoryId: number;
  };
}) {
  const convertedDate = new Date(event.date);
  if (event.categoryId !== 1) {
    return null;
  }

  return (
    <Card className="mb-6">
      <View className="p-4" style={{ height: 200 }}>
        <Image
          source={event.imageUrl}
          contentFit="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 16,
          }}
        />
      </View>
      <CardHeader className="items-center">
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="items-center">
        <TextUi>{convertedDate.toDateString()}</TextUi>
        <Button className="flex-row gap-4 mt-8" style={{ width: 200 }}>
          <Ionicons
            name="calendar-clear-outline"
            size={20}
            color={useColorScheme().colorScheme === "dark" ? "black" : "white"}
          />
          <TextUi>Add to calendar</TextUi>
        </Button>
      </CardContent>
    </Card>
  );
}
