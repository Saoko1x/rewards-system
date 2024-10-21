import React from "react";

import { View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";

import { ThemeToggle } from "./ThemeToggle";

import { Text } from "~/components/ui";
import { useColorScheme } from "~/lib/useColorScheme";
import { Link, router } from "expo-router";
import AvatarLink from "./AvatarLink";

export const DefaultHeader = ({ name = "Default" }: { name: string }) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className=''>
      <View className='flex flex-row  items-center mx-8 mt-16'>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name='chevron-back-sharp'
            size={24}
            color={colorScheme === "dark" ? "white" : "#141414"}
          />
        </TouchableOpacity>
        <Text
          className='text-lg font-bold ml-6'
          style={{
            color: colorScheme === "dark" ? "white" : "#141414",
          }}
        >
          {name}
        </Text>
      </View>
    </View>
  );
};

export const AvatarHeader = ({
  redirectFunc,
  name = "No name sent (DefaultHeader)",
}: {
  redirectFunc: (href: string) => void;
  name: string;
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className='flex flex-row justify-between items-center mx-8 mt-16 mb-4'>
      <Link href={"/(notifications)/"}>
        <Ionicons
          name='notifications-outline'
          size={24}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      </Link>
      <Text
        className='text-lg font-bold '
        style={{
          color: colorScheme === "dark" ? "white" : "#141414",
        }}
      >
        {name}
      </Text>
      <AvatarLink />
    </View>
  );
};
