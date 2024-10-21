import { View } from "react-native";
import React from "react";
import { Badge, Text } from "~/components/ui";
import { Image } from "expo-image";

import { useColorScheme } from "~/lib/useColorScheme";
export default function Payments() {
  const { colorScheme } = useColorScheme();
  return (
    <>
      <View className="mt-8 flex-row items-center justify-between">
        <View className="flex-row">
          <View
            className="justify-center items-center"
            style={{
              width: 40,
              height: 40,
              backgroundColor: colorScheme === "dark" ? "#adadad" : "#d9d9d9",
              borderRadius: 25,
              borderColor: colorScheme === "dark" ? "#18181B" : "#e8e8e8",
              borderWidth: 5,
              padding: 20,
            }}
          >
            <Text
              style={{
                height: 22,
                width: 22,
                fontSize: 18,
              }}
            >
              📞
            </Text>
          </View>
          <View className=" flex-col ml-2 text-white">
            <Text className="font-semibold">Verizon</Text>
            <Text className=" text-sm text font-thin">
              Online payment of your plan
            </Text>
          </View>
        </View>
        <View className="items-end">
          <Text style={{ fontFamily: "MontserratRegular" }}>$20.00</Text>
          <Text
            style={{ fontFamily: "MontserratThin" }}
            className="mr-1 text-zinc-200"
          >
            5:22 pm
          </Text>
        </View>
      </View>
      <View className="mt-8 flex-row items-center justify-between">
        <View className="flex-row">
          <View
            className="justify-center items-center"
            style={{
              width: 40,
              height: 40,
              backgroundColor: colorScheme === "dark" ? "#adadad" : "#d9d9d9",
              borderRadius: 25,
              borderColor: colorScheme === "dark" ? "#18181B" : "#e8e8e8",
              borderWidth: 5,
              padding: 20,
            }}
          >
            <Text
              style={{
                height: 22,
                width: 22,
                fontSize: 18,
              }}
            >
              🚌
            </Text>
          </View>
          <View className=" flex-col ml-2 text-white">
            <Text className="font-semibold">Bus stop</Text>
            <Text className=" text-sm text font-thin">
              Payment by physical card
            </Text>
          </View>
        </View>
        <View className="items-end">
          <Text style={{ fontFamily: "MontserratRegular" }}>$2.00</Text>
          <Text
            style={{ fontFamily: "MontserratThin" }}
            className="mr-1 text-zinc-200"
          >
            1:40 pm
          </Text>
        </View>
      </View>
      <View className="mt-8 flex-row items-center justify-between">
        <View className="flex-row">
          <View
            className="justify-center items-center"
            style={{
              width: 40,
              height: 40,
              backgroundColor: colorScheme === "dark" ? "#adadad" : "#d9d9d9",
              borderRadius: 25,
              borderColor: colorScheme === "dark" ? "#18181B" : "#e8e8e8",
              borderWidth: 5,
              padding: 20,
            }}
          >
            <Text
              style={{
                height: 22,
                width: 22,
                fontSize: 18,
              }}
            >
              ☕
            </Text>
          </View>
          <View className=" flex-col ml-2 text-white">
            <Text className="font-semibold">Coffee</Text>
            <Text className=" text-sm text font-thin">
              Payment by physical card
            </Text>
          </View>
        </View>
        <View className="items-end">
          <Text style={{ fontFamily: "MontserratRegular" }}>$10.00</Text>
          <Text
            style={{ fontFamily: "MontserratThin" }}
            className="mr-1 text-zinc-200"
          >
            1:40 pm
          </Text>
        </View>
      </View>
    </>
  );
}
