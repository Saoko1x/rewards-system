import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Pressable, View } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Text } from "~/components/ui";
import { router } from "expo-router";

const JumpstartModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              margin: 20,
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
            }}
          >
            <View className="flex-row items-center">
              <Ionicons name="star-sharp" size={100} color="#FFC75E" />
              <View className="bg-blue-400 w-10 h-6 rounded-xl items-center justify-center -ml-12 mt-10">
                <Text
                  style={{
                    color: colorScheme === "dark" ? "#333" : "#fff",
                  }}
                >
                  1
                </Text>
              </View>
            </View>
            <Text style={styles.modalText}>Congratulations!</Text>
            <Text className="mb-4">You have published your content!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                router.back();
              }}
            >
              <Text style={styles.textStyle}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Button
        className="w-full mb-16"
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text>Next</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
});

export default JumpstartModal;
