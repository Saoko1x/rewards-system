import { View } from "react-native";
import React from "react";
import { Button, Text } from "~/components/ui";
import { Image } from "expo-image";
import { router } from "expo-router";

export default function ConfirmPassReset({ email }: { email: string }) {
  return (
    <View className="items-center flex-col gap-8">
      <Text
        style={{ fontFamily: "MontserratSemiBold" }}
        className="text-3xl font- mt-8 text-center"
      >
        Successful restart
      </Text>
      <Image
        source={require("~/assets/welcome/confirmPassResetEmailImage.svg")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={{ fontFamily: "MontserratRegular" }} className="text-center">
        If you have followed the steps, you can now go to the login page and log
        in with your new password.
      </Text>
      <Button
        onPress={() => {
          router.navigate("/welcome/login");
        }}
        className="mt-4 w-full"
      >
        <Text style={{ fontFamily: "MontserratSemiBold" }}>Continue</Text>
      </Button>
    </View>
  );
}
