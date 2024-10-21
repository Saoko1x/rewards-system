import { View } from "react-native";
import React from "react";
import { Text } from "~/components/ui";
import Ionicon from "@expo/vector-icons/Ionicons";
import Container from "~/components/Container";

export default function System() {
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
            <Ionicon name="notifications" size={15} color="white" />
          </View>
          <View className=" flex-col ml-2 text-white">
            <Text className="font-semibold">Global call coming soon</Text>
            <Text className="text-xs">Schedule it now</Text>
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
