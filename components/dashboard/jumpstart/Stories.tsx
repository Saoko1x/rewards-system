import { ScrollView, View, Share, TouchableOpacity } from "react-native";
import React from "react";
import { Button, Text } from "~/components/ui";
import { Image } from "expo-image";
import { screenWidth } from "react-native-gifted-charts/src/utils";
import { Ionicons } from "@expo/vector-icons";
import files from "~/assets/jumpstart/filesBase64";
import { useColorScheme } from "~/lib/useColorScheme";

const images = [
  {
    id: 0,
    src: require("~/assets/jumpstart/pieza.jpeg"),
    file: files.image,
  },
  {
    id: 1,
    src: require("~/assets/jumpstart/tipsInvertir.jpeg"),
    file: files.image1,
  },
  {
    id: 2,
    src: require("~/assets/jumpstart/tipsPatrimonio.jpeg"),
    file: files.image2,
  },
  {
    id: 3,
    src: require("~/assets/jumpstart/ahorro.jpeg"),
    file: files.image3,
  },
  {
    id: 4,
    src: require("~/assets/jumpstart/mentalidad.jpeg"),
    file: files.image4,
  },
  {
    id: 5,
    src: require("~/assets/jumpstart/aprende.jpeg"),
    file: files.image5,
  },
];

export default function Stories() {
  const { colorScheme } = useColorScheme();
  const [selectedImage, setSelectedImage] = React.useState(0);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Discover the secrets of sales. In this course you will learn the secrets of sales and how to apply them in your daily life. Don't miss it and become a sales expert!",
        title: "Discover the secrets of sales",
        url: images[selectedImage].file,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <View className="p-6">
      <Text className="text-xl font-semibold text-blue-500 mb-2">
        Publish a story/status
      </Text>
      <Text className="text-2xl font-semibold mb-2">
        1. Select the photograph of your choice
      </Text>
      <Text className="mb-2">
        Share quality content to generate attraction of potential customers
        interested in your business.
      </Text>
      <View className="items-center justify-center">
        <ScrollView
          horizontal
          indicatorStyle="white"
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          centerContent
          stickyHeaderHiddenOnScroll
          pagingEnabled
          persistentScrollbar // Android only
          className="my-4"
          style={{ width: screenWidth - 100 }}
        >
          {images.map((image) => (
            <TouchableOpacity
              key={image.id}
              onPress={() => {
                setSelectedImage(image.id);
                console.log(selectedImage);
              }}
            >
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
            </TouchableOpacity>
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
          Tag<Text className="text-blue-500">@SmartBusinessCorp</Text>
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

      <Button
        className="mt-4 mb-16"
        onPress={() => {
          onShare();
        }}
      >
        <Text>Post</Text>
      </Button>
    </View>
  );
}
