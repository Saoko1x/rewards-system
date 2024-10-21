import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Image } from "expo-image";

import { useColorScheme } from "~/lib/useColorScheme";

export default function Chart({
  done,
  total,
}: {
  done: number;
  total: number;
}) {
  const data = [
    { value: done, color: "#98e4bc" },
    { value: total - done, color: "#4b89ef" },
  ];
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex items-center z-50">
      <PieChart
        donut
        backgroundColor="transparent"
        textColor="white"
        labelsPosition="inward"
        radius={140}
        centerLabelComponent={() => (
          <View
            className="rounded-full flex justify-center items-center"
            style={{
              backgroundColor: colorScheme === "dark" ? "black" : "white",
              width: 195,
              height: 195,
            }}
          >
            <Image
              source={require("~/assets/resources/DiamondProfessional.svg")}
              style={{
                width: 45,
                height: 40,
              }}
            ></Image>
          </View>
        )}
        data={data}
      />
    </View>
  );
}
