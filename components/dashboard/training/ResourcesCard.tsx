import { View } from "react-native";
import React from "react";
import {
  Text,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Progress,
} from "~/components/ui";
import { Image } from "expo-image";

export default function ResourcesCard() {
  return (
    <Card className="mb-4">
      <CardHeader className="flex-row">
        <View className="flex-1">
          <CardTitle className="text-base">
            Progress at the Professional level
          </CardTitle>
          <CardTitle>20 / 30 Tasks</CardTitle>
        </View>
        {/* <Chart done={60.5} total={100} /> */}
        <Image
          source={require("~/assets/resources/DiamondProfessional.svg")}
          style={{
            width: 45,
            height: 40,
          }}
        ></Image>
      </CardHeader>
      <Separator className="mb-2" />
      <CardContent>
        <CardDescription>
          Current level: <Text className="text-blue-500">Professional</Text>
        </CardDescription>
        <View className="flex-row items-center justify-center">
          <Text>1</Text>
          <Progress value={30} className="flex-1 mx-2" />
          <Text>2</Text>
        </View>
        <View className="flex-row justify-between">
          <Text>Start</Text>
          <Text>End</Text>
        </View>
      </CardContent>
    </Card>
  );
}
