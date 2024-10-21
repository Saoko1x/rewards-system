import { View, Text } from "react-native";
import React from "react";
import { useColorScheme } from "~/lib/useColorScheme";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function VerifiedButton() {
  const { colorScheme } = useColorScheme();

  return (
    <View
      className="flex-row items-center justify-center px-4 py-2 rounded-full gap-2 mt-2"
      style={{
        backgroundColor: colorScheme === "dark" ? "#EAFAEE" : "#EAFAEE",
      }}
    >
      <View className="bg-green-400 w-6 h-6 rounded-full justify-center items-center">
        <Ionicons name="checkmark" size={12} color="#fff" />
      </View>
      <Text className="text-green-400">Verified</Text>
    </View>
  );
}
