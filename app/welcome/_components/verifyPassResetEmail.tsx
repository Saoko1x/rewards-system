import { View } from "react-native";
import React from "react";
import { Button, Label, Text } from "~/components/ui";
import { Image } from "expo-image";

export default function VerifyPassResetEmail({
  email,
  setStep,
}: {
  email: string;
  setStep: (step: number) => void;
}) {
  return (
    <View className="items-center flex-col gap-8">
      <Text
        className="text-3xl font- mt-8 text-center"
        style={{ fontFamily: "MontserratRegular" }}
      >
        Verify Email
      </Text>
      <Image
        source={require("~/assets/welcome/verifyPassResetEmailImage.svg")}
        style={{ width: 200, height: 200 }}
      />
      <Text className="text-center" style={{ fontFamily: "MontserratRegular" }}>
        We have sent an e-mail to
        <Text
          style={{ fontFamily: "MontserratRegular" }}
          className="font-bold "
        >
          {" "}
          {email}{" "}
        </Text>
        with instructions on how to reset your password. If you do not see the
        email, check your spam folder.
      </Text>
      <Button onPress={() => setStep(2)} className="mt-4 w-full">
        <Text style={{ fontFamily: "MontserratRegular" }}>Continue</Text>
      </Button>
    </View>
  );
}
