import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";

export default function Home() {
  const { colorScheme } = useColorScheme();
  return (
    <View style={styles.section}>
      <Text
        style={[
          styles.sectionLabel,
          {
            color: useColorScheme().colorScheme === "dark" ? "white" : "black",
          },
        ]}
      >
        Security
      </Text>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => {
          router.navigate("./changePassword");
        }}
      >
        <Ionicons
          name="lock-closed-outline"
          size={28}
          color={useColorScheme().colorScheme === "dark" ? "white" : "black"}
        />
        <Text
          style={[
            styles.settingLabel,
            {
              color:
                useColorScheme().colorScheme === "dark" ? "white" : "black",
            },
          ]}
        >
          Change Password
        </Text>
        <Ionicons
          name="chevron-forward-outline"
          size={28}
          color={useColorScheme().colorScheme === "dark" ? "white" : "black"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => {
          router.navigate("./securityBlock");
        }}
      >
        <Ionicons
          name="lock-closed-outline"
          size={28}
          color={useColorScheme().colorScheme === "dark" ? "white" : "black"}
        />
        <Text
          style={[
            styles.settingLabel,
            {
              color:
                useColorScheme().colorScheme === "dark" ? "white" : "black",
            },
          ]}
        >
          Secure Lock
        </Text>
        <Ionicons
          name="chevron-forward-outline"
          size={28}
          color={useColorScheme().colorScheme === "dark" ? "white" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  section: {
    marginBottom: 8,
    padding: 16,
    borderRadius: 8,
  },
  separator: {
    height: 1,
    marginVertical: 8,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  settingLabel: {
    flex: 1,
    marginLeft: 8,
  },
  sectionCard: {
    flex: 1,
    marginLeft: 8,
  },
});
