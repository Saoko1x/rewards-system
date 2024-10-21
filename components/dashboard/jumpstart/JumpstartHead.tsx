import { View } from "react-native";
import { Text } from "~/components/ui";
import React from "react";
import StepIndicator from "react-native-step-indicator";
import { useColorScheme } from "~/lib/useColorScheme";

export default function JumpstartHead() {
  const { colorScheme } = useColorScheme();
  const labels = ["Paso 1", "Paso 2", "Paso 3", "Paso 4"];

  const [currentPosition, setCurrentPosition] = React.useState(1);
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#50DC98",
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: "#50DC98",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#50DC98",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#50DC98",
    stepIndicatorUnFinishedColor: colorScheme === "dark" ? "#000" : "#fff",
    stepIndicatorCurrentColor: "#50DC98",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: colorScheme === "dark" ? "#000" : "#000",
    stepIndicatorLabelFinishedColor: colorScheme === "dark" ? "#000" : "#000",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: colorScheme === "dark" ? "#fff" : "#000",
  };
  return (
    <View>
      <Text className='text-2xl my-4'>Progreso</Text>
      <View
        className='rounded-3xl border p-6'
        style={{
          borderColor: colorScheme === "dark" ? "#aaa" : "#aaa",
        }}
      >
        <StepIndicator
          stepCount={labels.length}
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
        />
      </View>
    </View>
  );
}
