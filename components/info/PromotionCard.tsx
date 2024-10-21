import { View } from "react-native";
import React from "react";
import { useColorScheme } from "~/lib/useColorScheme";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
  Text as TextUi,
} from "~/components/ui";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PromotionCard({
  promotion,
}: {
  promotion: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
    categoryId: number;
  };
}) {
  if (promotion.categoryId !== 3) {
    return null;
  }
  return (
    <Card key={promotion.id} className="mb-6">
      <View className="p-4" style={{ height: 200 }}>
        {/* <Image
          source={promotion.image}
          contentFit="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 16,
          }}
        /> */}
        <Image
          source={require("~/assets/training/training-white.jpg")}
          contentFit="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 16,
          }}
        />
      </View>
      <CardHeader className="items-center">
        <CardTitle>{promotion.title}</CardTitle>
        {/* <CardTitle>New Promotion</CardTitle> */}
      </CardHeader>
      <CardContent className="items-center">
        <CardDescription>{promotion.description}</CardDescription>
        {/* <CardDescription>
          Get a 50% discount on all products in the store
        </CardDescription> */}
        <TextUi>{promotion.date}</TextUi>
        <TextUi>
          {new Date("2024-02-22").toDateString()} -{" "}
          {new Date("2024-05-29").toDateString()}
        </TextUi>
        {/* <TextUi>{new Date(promotion.endDate!).toDateString()}</TextUi> */}
        <TextUi>{new Date("2024-05-29").toDateString()}</TextUi>
        <Progress
          value={getDaysPercentage({
            startDate: new Date("2024-02-22"),
            endDate: new Date("2024-05-29"),
          })}
          max={100}
          className="flex-1 mx-2"
        />
        {/* <TextUi>
          {(
            (new Date(promotion.endDate!).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
          ).toFixed(0)}{" "}
          days left
        </TextUi> */}
        <TextUi>
          {(
            (new Date("2024-12-29").getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
          ).toFixed(0)}{" "}
          days left
        </TextUi>
        <Button className="flex-row gap-4 mt-8" style={{ width: 200 }}>
          <Ionicons
            name="newspaper-outline"
            size={20}
            color={useColorScheme().colorScheme === "dark" ? "black" : "white"}
          />
          <TextUi>Watch more</TextUi>
        </Button>
      </CardContent>
    </Card>
  );
}

const getDaysPercentage = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  const totalDays =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const pastDays =
    getPastDays({
      startDate: startDate,
      endDate: new Date(),
    }) /
    (1000 * 60 * 60 * 24);
  const percentage = (pastDays / totalDays) * 100;
  return percentage;
};

const getPastDays = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  const post = new Date(startDate);
  const diff = endDate.getTime() - post.getTime();
  return diff;
};
