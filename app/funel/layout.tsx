import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack initialRouteName='/funel/home'>
      <Stack.Screen
        name='home'
        options={{
          title: "Lista de contactos",
        }}
      />
    </Stack>
  );
}
