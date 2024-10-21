import React from "react";
import { Stack } from "expo-router";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="changePassword"
        options={{
          title: "Change Password",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          title: "Security",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="securityBlock"
        options={{
          title: "Secure locking",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="pin"
        options={{
          title: "Pin",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="fingerprint"
        options={{
          title: "Fingerprint",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
