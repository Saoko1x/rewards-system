import { View, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "~/components/ui";
import { Link } from "expo-router";
import InputWithIcons from "~/components/InputWithIcon";
import Notification from "~/components/configuration/notification";

export default function ChangePassword() {
  // Estados visibilidad
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [notificationVisible, setNotificationVisible] = useState(false);

  const handleSaveChanges = () => {
    // guardar cambios
    setNotificationVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={{ flexDirection: "column", gap: 20, marginTop: 25 }}>
          <InputWithIcons
            placeholder="Current password"
            secureTextEntry={!currentPasswordVisible}
            leftIcon="lock-closed-outline"
            rightIcon={
              currentPasswordVisible ? "eye-off-outline" : "eye-outline"
            }
            onRightIconPress={() =>
              setCurrentPasswordVisible(!currentPasswordVisible)
            }
          />

          <View style={{ flexDirection: "row", gap: 2 }}>
            <Link href={"/welcome/passwordReset"}>
              <Text style={{ fontFamily: "MontserratRegular" }}>
                Forgot your password?
              </Text>
            </Link>
          </View>

          <InputWithIcons
            placeholder="New password"
            secureTextEntry={!newPasswordVisible}
            className="my-3"
            leftIcon="lock-closed-outline"
            rightIcon={newPasswordVisible ? "eye-off-outline" : "eye-outline"}
            onRightIconPress={() => setNewPasswordVisible(!newPasswordVisible)}
          />

          <InputWithIcons
            placeholder="Confirm new password"
            secureTextEntry={!confirmPasswordVisible}
            leftIcon="lock-closed-outline"
            rightIcon={
              confirmPasswordVisible ? "eye-off-outline" : "eye-outline"
            }
            onRightIconPress={() =>
              setConfirmPasswordVisible(!confirmPasswordVisible)
            }
          />
        </View>
        <View className="mt-8">
          <Button onPress={handleSaveChanges}>
            <Text style={{ fontFamily: "MontserratSemiBold" }}>
              Save changes
            </Text>
          </Button>
        </View>
      </ScrollView>
      <Notification
        message="Password successfully changed"
        visible={notificationVisible}
        onClose={() => setNotificationVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    padding: 10,
    paddingBottom: 29,
  },
});
