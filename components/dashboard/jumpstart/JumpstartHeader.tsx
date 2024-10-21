import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Button, Text } from "~/components/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function JumpstartHeader({ onShare }: { onShare: () => void }) {
  return (
    <View className="w-full h-20 border-b-[.3px] flex-row mt-16 justify-between items-center px-4">
      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-medium">Boost your business</Text>
      </View>
      <Button
        className="h-10"
        onPress={() => {
          onShare();
        }}
      >
        <Text>Post</Text>
      </Button>
    </View>
  );
}
