import "~/global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, AppState } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "~/components/primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import Splash from "~/components/Splash";
import { supabase } from "~/server/db";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratLight: require("../assets/fonts/Montserrat-Light.ttf"),
    MontserratThin: require("../assets/fonts/Montserrat-Thin.ttf"),
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (Platform.OS !== "ios") {
        setIsLoading(false);
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      (async () => {
        await SplashScreen.hideAsync();
      })();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <>
      {isLoading || !fontsLoaded ? (
        <Splash setIsLoading={setIsLoading} />
      ) : (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
            <Stack initialRouteName="index">
              <Stack.Screen
                name="index"
                options={{
                  title: "Begin your plan now",
                }}
              />
              <Stack.Screen
                name="welcome"
                options={{
                  title: "Authentication",
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="(info)"
                options={{
                  title: "Info & News",
                }}
              />
              <Stack.Screen
                name="(notifications)"
                options={{
                  title: "Notifications",
                }}
              />

              <Stack.Screen
                name="dashboard"
                options={{
                  title: "Home",
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="configuration"
                options={{
                  title: "Configuration",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="security"
                options={{
                  title: "Security",
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="funel/home"
                options={{
                  title: "Contact list",
                }}
              />
              <Stack.Screen
                name="analysis"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="training"
                options={{
                  title: "Training",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="referral"
                options={{
                  title: "Referral link",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="jumpstart"
                options={{
                  title: "Boost your business",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="system"
                options={{
                  title: "System",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="inversiones"
                options={{
                  title: "Actions",
                }}
              />
            </Stack>
            <PortalHost />
          </ThemeProvider>
        </QueryClientProvider>
      )}
    </>
  );
}
