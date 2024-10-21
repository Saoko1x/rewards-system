import React, { useState } from "react";
import { Switch, StyleSheet } from "react-native";

interface ToggleButtonProps {
  initialValue?: boolean;
  onValueChange?: (value: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  initialValue = false,
  onValueChange,
}) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    onValueChange?.(!isEnabled);
  };

  return (
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor="#F1F1F1"
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
      style={styles.switch}
    />
  );
};

const styles = StyleSheet.create({
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});

export default ToggleButton;
