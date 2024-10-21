import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { TabNavigationState, ParamListBase } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
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

  const styles = StyleSheet.create({
    tabBarIndicator: {
      backgroundColor: colorScheme === "dark" ? "white" : "#232323",
      height: 3,
    },
    tabBarLabel: {
      color: colorScheme === "dark" ? "white" : "#232323",
      fontWeight: "bold",
      fontSize: 14.5,
    },
    tabBarContentContainer: {
      flexDirection: "row",
      justifyContent: "center", //centrado
    },
  });

  const notifications = [
    {
      id: 1,
      tab: "Events",
    },
    {
      id: 2,
      tab: "News",
    },
    {
      id: 3,
      tab: "Promotions",
    },
  ];

  return (
    <MaterialTopTabs>
      <MaterialTopTabs.Screen
        name="index"
        options={{
          tabBarIndicatorStyle: styles.tabBarIndicator,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarContentContainerStyle: styles.tabBarContentContainer,
          tabBarBadge: () => null,
          tabBarLabel: "Events",
        }}
      />
      <MaterialTopTabs.Screen
        name="news"
        options={{
          tabBarIndicatorStyle: styles.tabBarIndicator,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarContentContainerStyle: styles.tabBarContentContainer,
          tabBarBadge: () => null,
          tabBarLabel: "News",
        }}
      />
      <MaterialTopTabs.Screen
        name="promotion"
        options={{
          tabBarIndicatorStyle: styles.tabBarIndicator,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarContentContainerStyle: styles.tabBarContentContainer,
          tabBarBadge: () => null,
          tabBarLabel: "Promotions",
        }}
      />
    </MaterialTopTabs>
  );
}
