import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="referralCode"
        options={{
          title: "Referral Link",
        }}
      />
    </Stack>
  );
}
