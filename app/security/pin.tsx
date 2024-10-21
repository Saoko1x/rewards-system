import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useColorScheme } from "~/lib/useColorScheme";

const Pin = () => {
  const { colorScheme } = useColorScheme();
  const [pin, setPin] = useState(["", "", "", ""]);

  const handleChangeText = (text: string) => {
    const pinArray = text.split("");
    setPin([...pinArray, ...Array(4 - pinArray.length).fill("")].slice(0, 4));
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000000" : "#FFFFFF" },
      ]}
    >
      <View style={styles.header}></View>
      <View style={styles.pinContainer}>
        <Icon
          name="lock"
          size={50}
          color={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
        />
        <Text
          style={[
            styles.pinInstruction,
            { color: colorScheme === "dark" ? "#FFFFFF" : "#000000" },
          ]}
        >
          Set your PIN code
        </Text>
        <Text
          style={[
            styles.pinSubtext,
            { color: colorScheme === "dark" ? "#FFFFFF" : "#000000" },
          ]}
        >
          Enter your PIN to protect your records
        </Text>
        <View style={styles.pinInputContainer}>
          {pin.map((digit, index) => (
            <View
              key={index}
              style={[
                styles.pinDigit,
                {
                  backgroundColor: digit
                    ? colorScheme === "dark"
                      ? "#FFFFFF"
                      : "#000000"
                    : "transparent",
                  borderColor: colorScheme === "dark" ? "#FFFFFF" : "#000000A",
                },
              ]}
            />
          ))}
        </View>
      </View>
      <View style={styles.keyboard}>
        <TextInput
          style={styles.hiddenTextInput}
          keyboardType="numeric"
          maxLength={4}
          autoFocus={true}
          onChangeText={handleChangeText}
          value={pin.join("")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pinInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
    marginTop: 30,
  },
  pinDigit: {
    width: 21,
    height: 21,
    borderRadius: 20,
    borderWidth: 1,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
  },
  headerText: {
    fontFamily: "sans-serif",
    fontWeight: "normal",
    fontSize: 24,
  },
  pinContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pinInstruction: {
    fontFamily: "sans-serif-medium",
    fontSize: 24,
    marginTop: 20,
  },
  pinSubtext: {
    fontFamily: "sans-serif",
    fontSize: 16,
    marginTop: 10,
  },

  keyboard: {
    alignItems: "center",
  },
  hiddenTextInput: {
    width: 0,
    height: 0,
  },
});

export default Pin;
