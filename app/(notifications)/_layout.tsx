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

  return (
    <MaterialTopTabs>
      <MaterialTopTabs.Screen
        name="index"
        options={{
          tabBarIndicatorStyle: styles.tabBarIndicator,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarContentContainerStyle: styles.tabBarContentContainer,
          tabBarBadge() {
            return (
              <View className="bg-blue-500 rounded-full w-6 h-6 flex justify-center items-center">
                <Text className="text-white">1</Text>
              </View>
            );
          },
          tabBarLabel: "User Notifications",
        }}
      />
      <MaterialTopTabs.Screen
        name="system"
        options={{
          tabBarIndicatorStyle: styles.tabBarIndicator,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarContentContainerStyle: styles.tabBarContentContainer,
          tabBarBadge() {
            return (
              <View className="bg-blue-500 rounded-full w-6 h-6 flex justify-center items-center">
                <Text className="text-white">1</Text>
              </View>
            );
          },
          tabBarLabel: "System Notifications",
        }}
      />
    </MaterialTopTabs>
  );
}
