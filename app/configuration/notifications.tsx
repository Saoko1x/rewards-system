import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "~/lib/useColorScheme";

const Notifications = () => {
  const [isImportsEnabled, setIsImportsEnabled] = useState(false);
  const [isAnotherOptionEnabled, setIsAnotherOptionEnabled] = useState(true);
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const toggleImports = () => setIsImportsEnabled((prev) => !prev);
  const toggleAnotherOption = () => setIsAnotherOptionEnabled((prev) => !prev);

  return (
    <View
      style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}
    >
      <View style={styles.optionWrapper}>
        <View style={styles.optionContainer}>
          <View style={styles.iconTextContainer}>
            <Ionicons
              name="cloud-upload-outline"
              size={24}
              color={isDarkMode ? "white" : "black"}
            />
            <Text
              style={[
                styles.optionText,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}
            >
              Imports
            </Text>
          </View>
          <Switch
            onValueChange={toggleImports}
            value={isImportsEnabled}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor="#F1F1F1"
            ios_backgroundColor="#3e3e3e"
          />
        </View>
        <Text
          style={[
            styles.optionDescription,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          When you receive the file
        </Text>
      </View>

      <View style={styles.optionWrapper}>
        <View style={styles.optionContainer}>
          <View style={styles.iconTextContainer}>
            <Ionicons
              name="calendar-outline"
              size={24}
              color={isDarkMode ? "white" : "black"}
            />
            <Text
              style={[
                styles.optionText,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}
            >
              Another Option
            </Text>
          </View>
          <Switch
            onValueChange={toggleAnotherOption}
            value={isAnotherOptionEnabled}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor="#F1F1F1"
            ios_backgroundColor="#3e3e3e"
          />
        </View>
        <Text
          style={[
            styles.optionDescription,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          Description for another option
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkBg: {
    backgroundColor: "#000",
  },
  lightBg: {
    backgroundColor: "#fff",
  },
  optionWrapper: {
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: "MontserratSemiBold",
  },
  optionDescription: {
    fontSize: 14,
    marginLeft: 10,
    marginRight: 60,
    fontFamily: "MontserratRegular",
  },
  darkText: {
    color: "#fff",
  },
  lightText: {
    color: "#000",
  },
});

export default Notifications;
