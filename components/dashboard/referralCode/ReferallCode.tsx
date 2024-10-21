import { View, TouchableOpacity, Share } from "react-native";
import React from "react";
import { Text } from "~/components/ui";
import { Image } from "expo-image";
import { useColorScheme } from "~/lib/useColorScheme";
import StepIndicator from "react-native-step-indicator";

export default function ReferallCode() {
  const { colorScheme } = useColorScheme();

  const labels = ["Invite your friends", "Get rewards if they join in"];

  const [currentPosition, setCurrentPosition] = React.useState(2);
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#fff",
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: "#000",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#3AA7E2",
    separatorUnFinishedColor: "#3AA7E2",
    stepIndicatorFinishedColor: "#fff",
    stepIndicatorUnFinishedColor: colorScheme === "dark" ? "#000" : "#fff",
    stepIndicatorCurrentColor: "#fff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: colorScheme === "dark" ? "#000" : "#000",
    stepIndicatorLabelFinishedColor: colorScheme === "dark" ? "#000" : "#000",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: colorScheme === "dark" ? "#fff" : "#000",
  };

  const data = [
    {
      label: "Invite your friends",
      description: "Share the code with your friends on any social network",
    },
    {
      label: "Get rewards if you integrate",
      description: "When your friend registers in the app, you get a reward!",
    },
  ];

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Hello, I invite you to join the world's largest business app!",
        title: "Join the world's largest business app!",
        // url: "https://reactnative.dev/",
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
    <View>
      <View
        style={{
          backgroundColor: colorScheme === "dark" ? "#fff" : "#60A5FA",
        }}
        className="flex-row items-center justify-between p-4 rounded-2xl my-5"
      >
        <View>
          <Text
            className={`${
              colorScheme === "dark" ? "text-blue-400" : "text-white"
            } font-semibold text-2xl`}
          >
            Invite a friend and grow
          </Text>
          <Text
            style={{
              color: colorScheme === "dark" ? "#000" : "#fff",
            }}
          >
            Invite a friend to grow with you!
          </Text>
        </View>
        <Image
          source={require("~/assets/dashboard/win.svg")}
          style={{ width: 80, height: 80, opacity: 0.9 }}
        />
      </View>

      <View>
        <View className="items-center justify-center">
          <Text className="text-xl font-semibold">How does it work?</Text>
        </View>

        <View>
          <StepIndicator
            direction="vertical"
            stepCount={labels.length}
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            renderLabel={({ position, stepStatus, label, currentPosition }) => (
              <View className="p-4">
                <Text className="font-semibold">{labels[position]}</Text>
                <Text className="font-light">{data[position].description}</Text>
              </View>
            )}
          />
        </View>
      </View>

      <View>
        <View className="items-center justify-center">
          <Text className="text-blue-400 text-xl font-semibold">
            Referral link
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colorScheme === "dark" ? "#fff" : "#60A5FA",
          }}
          className="flex-row items-center justify-between p-4 py-8 rounded-2xl my-5"
        >
          <Text
            className={`${
              colorScheme === "dark" ? "text-blue-400" : "text-white"
            } text-xl`}
          >
            JohnDoe
          </Text>
          <TouchableOpacity onPress={onShare}>
            <Text
              className={`${
                colorScheme === "dark" ? "text-blue-400" : "text-white"
              } font-extrabold text-xl`}
            >
              Copy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
