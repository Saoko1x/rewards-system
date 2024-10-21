import { View } from "react-native";
import React from "react";
import { Text } from "~/components/ui";
import Ionicon from "@expo/vector-icons/Ionicons";
import Container from "~/components/Container";

export default function Index() {
  return (
    <Container>
      <View className="mt-8 flex-row items-center justify-between">
        <View className="flex-row">
          <View
            className="justify-center items-center"
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#27272A",
              borderRadius: 25,
              borderColor: "#18181B",
              borderWidth: 5,
              padding: 5,
            }}
          >
            <Ionicon name="notifications-outline" size={15} color="white" />
          </View>
          <View className=" flex-col ml-2 text-white">
            <Text className="font-semibold">Vrakka discount</Text>
            <Text className="text-xs">
              Last day to get 50% off on all products.
            </Text>
          </View>
        </View>
        <View className="items-end">
          <View className="bg-transparent w-3 h-3 rounded-full border border-blue-300" />
          <Text className="mr-1 text-zinc-400">5:22 pm</Text>
        </View>
      </View>
      <View className="mt-8 flex-row items-center justify-between">
        <View className="flex-row">
          <View
            className="justify-center items-center"
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#27272A",
              borderRadius: 25,
              borderColor: "#18181B",
              borderWidth: 5,
              padding: 5,
            }}
          >
            <Ionicon name="notifications" size={15} color="white" />
          </View>
          <View className=" flex-col ml-2 text-white">
            <Text className="font-semibold">Next event near you</Text>
            <Text className="text-xs">Get your tickets now!</Text>
          </View>
        </View>
        <View className="items-end">
          <View className="bg-blue-500 w-3 h-3 rounded-full border border-blue-400" />
          <Text className="mr-1 text-zinc-400">1:40 pm</Text>
        </View>
      </View>
    </Container>
  );
}
