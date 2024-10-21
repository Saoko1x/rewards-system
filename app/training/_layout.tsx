import React from "react";
import { Stack } from "expo-router";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="[steps]"
        options={{
          title: "Training",
        }}
      />
      <Stack.Screen
        name="learn"
        options={{
          title: "Learn",
        }}
      />
    </Stack>
  );
}
