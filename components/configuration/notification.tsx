import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NotificationProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  visible,
  onClose,
}) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }).start(() => {
          onClose();
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.notificationContainer, { opacity }]}>
      <View style={styles.notification}>
        <Ionicons name="checkmark-circle" size={24} color="green" />
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Animated.timing(opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              onClose();
            });
          }}
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  notification: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6FAE6",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  messageContainer: {
    flex: 1,
    marginLeft: 10,
  },
  message: {
    color: "black",
  },
});

export default Notification;
