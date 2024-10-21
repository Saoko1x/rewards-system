import { ScrollView, View, Share, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "~/components/ui";
import { Image } from "expo-image";
import { screenWidth } from "react-native-gifted-charts/src/utils";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "~/lib/useColorScheme";
import JumpstartModal from "./JumpstartModal";

export default function Post({
  selectedImage,
  setSelectedImage,
  images,
}: {
  selectedImage: number;
  setSelectedImage: (selectedImage: number) => void;
  images: { id: number; src: any }[];
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { colorScheme } = useColorScheme();

  return (
    <View className="p-6">
      <Text className="text-xl font-semibold text-blue-500 mb-2">
        Make a publication
      </Text>
      <Text className="text-2xl font-semibold mb-2">
        1. Select the publication of your choice
      </Text>
      <Text className="mb-2">
        Share quality content to generate attraction of potential customers
        interested in your business.
      </Text>
      <View className="items-center justify-center">
        <ScrollView
          indicatorStyle="white"
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          centerContent
          stickyHeaderHiddenOnScroll
          persistentScrollbar // Android only
          style={{ width: screenWidth - 100 }}
        >
          {images.map((image) => (
            <View key={image.id}>
              <TouchableOpacity onPress={() => setSelectedImage(image.id)}>
                <Image
                  source={image.src}
                  contentFit="contain"
                  style={{
                    width: screenWidth - 100,
                    height: 400,
                    borderColor:
                      selectedImage === image.id ? "gray" : "transparent",

                    borderWidth: 2,
                    borderRadius: 15,
                  }}
                />
                <Button
                  className="my-2"
                  onPress={() => setSelectedImage(image.id)}
                >
                  <Text>Select</Text>
                </Button>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="flex-row">
          {images.map((image) => (
            <View
              key={image.id}
              style={{
                backgroundColor:
                  colorScheme === "dark"
                    ? selectedImage === image.id
                      ? "white"
                      : "gray"
                    : selectedImage === image.id
                    ? "black"
                    : "gray",
                width: 10,
                height: 10,
                borderRadius: 5,
                margin: 5,
              }}
            />
          ))}
        </View>
        <Text>Select an image ⬆️</Text>
        <Text>Follow the steps below:</Text>
      </View>

      <Text className="text-xl font-semibold text-blue-500 mb-4">Steps:</Text>
      <Text className="font-semibold mb-2">
        Post your story/status on the social network where you have the most
        reach.
      </Text>
      <View className="flex-row gap-2 mb-2">
        <Ionicons
          name="laptop-outline"
          size={24}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text className="font-semibold">Use all available tools.</Text>
      </View>
      <View className="pl-4 flex-row gap-2 mb-2">
        <Ionicons
          name="warning-outline"
          size={24}
          color={colorScheme === "dark" ? "yellow" : "red"}
        />
        <Text className="font-semibold">
          Make sure it is published and tag your business.
        </Text>
      </View>

      <View className="flex-row gap-2 mb-2">
        <Ionicons
          name="link-outline"
          size={24}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text className="font-semibold">
          Tag <Text className="text-blue-500">@SmartBusinessCorp</Text>
        </Text>
      </View>
      <View className="pl-6 mb-2">
        <Text className="font-semibold">
          Example: <Text className="text-blue-500">@SmartBusinessCorp</Text>
        </Text>
      </View>

      <View className="flex-row gap-2 mb-2">
        <Ionicons
          name="magnet-outline"
          size={24}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text className="font-semibold">Be an investor magnet</Text>
      </View>
      <View>
        <Text className="font-semibold mb-2">
          When people like it or ask what it's about, invite them to your
          business. 😃{" "}
        </Text>
      </View>
      <View>
        <JumpstartModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </View>
  );
}
