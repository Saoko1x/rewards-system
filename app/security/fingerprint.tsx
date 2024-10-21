import React, { useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FingerprintScreen = () => {
  const [scanning, setScanning] = useState(true);
  const rotation = new Animated.Value(0);

  const startScanningAnimation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const onComplete = () => {
    setScanning(false);
  };

  React.useEffect(() => {
    startScanningAnimation();
    setTimeout(onComplete, 3000);
  }, []);

  const rotationInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>
        Por favor, coloque el dedo en el sensor de huellas dactilares
      </Text>
      <View style={styles.fingerprintContainer}>
        {scanning ? (
          <Animated.View>
            <Ionicons name="finger-print" size={80} color="#ADD8E6" />
          </Animated.View>
        ) : (
          <Ionicons name="checkmark-circle-outline" size={80} color="#ADD8E6" />
        )}
      </View>
      {scanning && <Text style={styles.scanningText}>Escaneando...</Text>}
      <View style={styles.progressBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "#FFFFFF",
    fontSize: 24,
    marginBottom: 20,
  },
  subHeader: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 40,
    marginHorizontal: 10,
    textAlign: "center",
  },
  fingerprintContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  scanningText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 20,
  },
  progressBar: {
    width: "100%",
    height: 2,
    backgroundColor: "#D3D3D3",
    position: "absolute",
    bottom: 0,
  },
});

export default FingerprintScreen;
