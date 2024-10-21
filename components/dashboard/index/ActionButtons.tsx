import { View } from "react-native";
import { Button, Text } from "~/components/ui";
import { Image } from "expo-image";

import { useColorScheme } from "~/lib/useColorScheme";
import { router } from "expo-router";

export default function ActionButtons() {
  const { colorScheme } = useColorScheme();
  return (
    <View className="mb-16">
      <Text
        className="text-xl mt-8 mb-6 font-light"
        style={{ fontFamily: "MontserratSemiBold" }}
      >
        Overview
      </Text>

      <FirstCard />
      <SecondCard />
      <ThirdCard />
    </View>
  );
}

const FirstCard = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View
      className="w-full p-4 rounded-2xl flex-col my-5 "
      style={{
        backgroundColor: colorScheme === "dark" ? "#232323" : "#EEEEEE",
      }}
    >
      <View className="flex-row">
        <View className="w-3/5">
          <Text
            className="text-xl "
            style={{ fontFamily: "MontserratSemiBold" }}
          >
            Boost your business{" "}
          </Text>
          <View className="mt-4">
            <Text
              style={{
                fontFamily: "MontserratRegular",
              }}
            >
              Discover how we guide you step by step to develop your business
              organically.
            </Text>
          </View>
        </View>

        <View className="w-2/5 items-center mt-4">
          <Image
            source={require("~/assets/dashboard/puzzle.svg")}
            style={{ width: 110, height: 110, opacity: 0.9 }}
          />
        </View>
      </View>

      <View className="flex-row mt-2">
        <View className="flex-1">
          <Button
            onPress={() => {
              router.navigate("/dashboard/jumpstart");
            }}
          >
            <Text style={{ fontFamily: "MontserratSemiBold" }}>
              Take action
            </Text>
          </Button>
        </View>

        <View className="flex-1" />
      </View>
    </View>
  );
};

const SecondCard = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View
      className="w-full p-4 rounded-2xl flex-col"
      style={{
        backgroundColor: colorScheme === "dark" ? "#232323" : "#EEEEEE",
      }}
    >
      <View className="flex-row">
        <View className="w-3/5">
          <Text
            className="text-xl "
            style={{ fontFamily: "MontserratSemiBold" }}
          >
            Invite your friends
          </Text>
          <View className="mt-4">
            <Text className="pt-3" style={{ fontFamily: "MontserratRegular" }}>
              Use your invitation link with your friends to grow your rewards.
            </Text>
          </View>
        </View>

        <View className="w-2/5 items-center mt-4">
          <Image
            source={require("~/assets/dashboard/naipe.svg")}
            style={{ width: 110, height: 110, opacity: 0.9 }}
          />
        </View>
      </View>

      <View className="flex-row mt-2">
        <View className="flex-1">
          <Button
            onPress={() => {
              router.navigate("/referral");
            }}
          >
            <Text style={{ fontFamily: "MontserratSemiBold" }}>Invite</Text>
          </Button>
        </View>

        <View className="flex-1 items-end ">
          <Text
            className="pt-5"
            style={{ fontFamily: "MontserratRegular" }}
          ></Text>
        </View>
      </View>
    </View>
  );
};

const ThirdCard = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View
      className="w-full p-4 rounded-2xl flex-col mt-4"
      style={{
        backgroundColor: "#2872eb",
      }}
    >
      <View className="flex-row">
        <View className="w-3/5">
          <Text
            className="text-xl text-white"
            style={{ fontFamily: "MontserratSemiBold" }}
          >
            Connect with others
          </Text>
          <View className="mt-4">
            <Text
              className="pt-3 text-white"
              style={{ fontFamily: "MontserratRegular" }}
            >
              Share and invite others to join the challenge to follow your
              progress.
            </Text>
          </View>
        </View>

        <View className="w-2/5 items-center mt-4">
          <Image
            source={require("~/assets/dashboard/square.svg")}
            style={{ width: 110, height: 110, opacity: 0.9 }}
          />
        </View>
      </View>

      <View className="flex-row mt-2">
        <View className="flex-1">
          <Button
            onPress={() => {
              router.navigate("/funel/home");
            }}
          >
            <Text style={{ fontFamily: "MontserratSemiBold" }}>Connect</Text>
          </Button>
        </View>

        <View className="flex-1 items-end ">
          <Text
            className="pt-5"
            style={{ fontFamily: "MontserratRegular" }}
          ></Text>
        </View>
      </View>
    </View>
  );
};
