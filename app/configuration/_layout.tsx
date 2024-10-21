import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="config"
        options={{
          title: "Configuration",
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />

      <Stack.Screen
        name="country"
        options={{
          title: "Country",
        }}
      />

      <Stack.Screen
        name="notifications"
        options={{
          title: "Notifications",
        }}
      />
      <Stack.Screen
        name="accesibility"
        options={{
          title: "Accesibility",
        }}
      />
      <Stack.Screen
        name="lenguages"
        options={{
          title: "Languages",
        }}
      />
    </Stack>
  );
}
