import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { TabNavigationState, ParamListBase } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";
import { Text } from "~/components/ui";
import { useEffect } from "react";

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
    console.log("analysis");
  }, []);

  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarContentContainerStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        },
        tabBarIndicatorContainerStyle: {
          backgroundColor: colorScheme === "dark" ? "#0D0D0D" : "#fff",
        },

        tabBarLabel: ({ focused, color, children }) => {
          return (
            <Text
              style={{
                width: "100%",
                marginRight: 12,
                fontWeight: "bold",
                color: colorScheme === "dark" ? "white" : "#141414",
              }}
            >
              {children}
            </Text>
          );
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="analysis-weekly"
        options={{ swipeEnabled: false, title: "WEEKLY" }}
      />
      <MaterialTopTabs.Screen
        name="analysis-monthly"
        options={{ swipeEnabled: false, title: "MONTHLY" }}
      />
      <MaterialTopTabs.Screen
        name="analysis-yearly"
        options={{ swipeEnabled: false, title: "YEARLY" }}
      />
    </MaterialTopTabs>
  );
}
