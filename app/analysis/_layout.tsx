import React from "react";
import { Stack } from "expo-router";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name='home'
        options={{
          title: "Home Analysis",
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Stack>
  );
}
