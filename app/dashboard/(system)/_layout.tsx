import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { TabNavigationState, ParamListBase } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "~/lib/useColorScheme";

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);
export default function Layout() {
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    console.log("system");
  }, []);
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarContentContainerStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
        tabBarIndicatorContainerStyle: {
          backgroundColor: colorScheme === "dark" ? "#0D0D0D" : "#fff",
        },
      }}
    >
      <MaterialTopTabs.Screen name="system" options={{ title: "System" }} />
      <MaterialTopTabs.Screen
        name="system-progress"
        options={{ title: "Progress" }}
      />
    </MaterialTopTabs>
  );
}