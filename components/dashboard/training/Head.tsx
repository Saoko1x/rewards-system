import { TouchableOpacity, View } from "react-native";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from "~/components/ui";

import { Image } from "expo-image";

export default function Head() {
  return (
    <View className="mb-4 mt-4">
      <View className="flex-row justify-between mb-4">
        <Text className="text-2xl font-semibold">Progress</Text>
      </View>

      <View className="flex-row gap-4">
        <Card className="flex-1 items-center rounded-3xl">
          <TouchableOpacity>
            <CardHeader>
              <CardTitle className="text-base font-light">Tasks</CardTitle>
            </CardHeader>
            <CardContent className="flex-row">
              <Image
                source={require("~/assets/resources/star.svg")}
                style={{
                  width: 19,
                  height: 19,
                }}
              ></Image>
              <CardDescription className="text-lg font-bold">5</CardDescription>
            </CardContent>
          </TouchableOpacity>
        </Card>
        <Card className="flex-1 items-center rounded-3xl">
          <TouchableOpacity>
            <CardHeader>
              <CardTitle className="text-base font-light">Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg font-bold">
                <Image
                  source={require("~/assets/resources/Sapphire.png")}
                  style={{
                    width: 29,
                    height: 29,
                  }}
                ></Image>
              </CardDescription>
            </CardContent>
          </TouchableOpacity>
        </Card>
        <Card className="flex-1 items-center rounded-3xl">
          <TouchableOpacity>
            <CardHeader>
              <CardTitle className="text-base font-light">Courses</CardTitle>
            </CardHeader>
            <CardContent className="flex-row">
              <Image
                source={require("~/assets/resources/lightning.svg")}
                style={{
                  width: 19,
                  height: 19,
                }}
              ></Image>
              <CardDescription className="text-lg font-bold">6</CardDescription>
            </CardContent>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
}
