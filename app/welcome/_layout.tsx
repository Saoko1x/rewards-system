import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { DefaultHeader } from "~/components/headers";
import { PermissionsAndroid } from "react-native";

export default function RootLayout() {
  const router = useRouter();

  const redirectFunc = (href: string) => {
    router.navigate(href);
  };

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          header: () => <DefaultHeader name="" />,
          title: "Login",
        }}
      />

      <Stack.Screen
        name="signup"
        options={{
          header: () => <DefaultHeader name="" />,
          title: "Sign Up",
        }}
      />
      <Stack.Screen
        name="questions"
        options={{
          header: () => <DefaultHeader name="" />,
          title: "Questions",
        }}
      />
      <Stack.Screen
        name="selectCompany"
        options={{
          header: () => <DefaultHeader name="" />,
          title: "Select Company",
        }}
      />

      <Stack.Screen
        name="passwordReset"
        options={{
          header: () => <DefaultHeader name="" />,
          title: "Password Reset",
        }}
      />
    </Stack>
  );
}
