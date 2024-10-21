import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";

const SecuritySettings = () => {
  const [isPinEnabled, setIsPinEnabled] = useState(false);
  const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(true);

  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const togglePin = () => setIsPinEnabled((previousState) => !previousState);
  const toggleFingerprint = () =>
    setIsFingerprintEnabled((previousState) => !previousState);

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <TouchableOpacity
        style={styles.optionWrapper}
        onPress={() => router.navigate("./pin")}
      >
        <View style={styles.optionContainer}>
          <View style={styles.iconTextContainer}>
            <Text
              style={[
                styles.optionText,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}
            >
              Alt Text
            </Text>
          </View>
          <Switch
            onValueChange={togglePin}
            value={isPinEnabled}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isPinEnabled ? "#F1F1F1" : "#F1F1F1"}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
        <Text
          style={[
            styles.optionDescription,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          See better the content with the full text.
        </Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        style={styles.optionWrapper}
        onPress={() => router.navigate("./fingerprint")}
      >
        <View style={styles.optionContainer}>
          <View style={styles.iconTextContainer}>
            <Text
              style={[
                styles.optionText,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}
            >
              Voice notification
            </Text>
          </View>
          <Switch
            onValueChange={toggleFingerprint}
            value={isFingerprintEnabled}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isFingerprintEnabled ? "#F1F1F1" : "#F1F1F1"}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
        <Text
          style={[
            styles.optionDescription,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          Activate voice notifications
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#000",
  },
  lightContainer: {
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
  separator: {
    height: 1,
    backgroundColor: "#444",
    marginVertical: 3,
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
    marginVertical: 1,
    marginLeft: 34,
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

export default SecuritySettings;
