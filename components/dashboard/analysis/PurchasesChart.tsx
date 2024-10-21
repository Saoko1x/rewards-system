import { TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { Text } from "~/components/ui";
import { useColorScheme } from "~/lib/useColorScheme";
import { Image } from "expo-image";
import { screenWidth } from "react-native-gifted-charts/src/utils";

export default function BarsChart() {
  const data = [
    { value: 600, date: "1 Apr 2024" },
    { value: 1200, date: "2 Apr 2024" },
    { value: 2000, date: "3 Apr 2024" },
    { value: 800, date: "4 Apr 2024" },
    { value: 4000, date: "5 Apr 2024" },
  ];

  const { colorScheme } = useColorScheme();
  return (
    <View>
      <Text className="text-2xl my-4">Purchases</Text>
      <View
        className="justify-center flex-col"
        style={{
          backgroundColor: colorScheme === "dark" ? "transparent" : "#fff",
          width: "100%",
          height: 300,
        }}
      >
        <LineChart
          yAxisTextStyle={{
            color: colorScheme === "dark" ? "white" : "black",
            fontFamily: "MontserratRegular",
            fontSize: 10,
          }}
          height={250}
          width={screenWidth - 20}
          data={data}
          hideRules
          color={colorScheme === "dark" ? "white" : "black"}
          textColor={colorScheme === "dark" ? "white" : "black"}
          indicatorColor={colorScheme === "dark" ? "white" : "black"}
          xAxisColor={colorScheme === "dark" ? "white" : "black"}
          yAxisColor={colorScheme === "dark" ? "white" : "black"}
          endFillColor={colorScheme === "dark" ? "white" : "black"}
          dataPointsColor={colorScheme === "dark" ? "white" : "black"}
          xAxisIndicesColor={colorScheme === "dark" ? "white" : "black"}
          yAxisIndicesColor={colorScheme === "dark" ? "white" : "black"}
          startFillColor={colorScheme === "dark" ? "white" : "black"}
          verticalLinesColor={colorScheme === "dark" ? "white" : "black"}
          focusedDataPointHeight={30}
          focusedDataPointWidth={30}
          showTextOnFocus
          focusedDataPointColor={colorScheme === "dark" ? "white" : "black"}
          showDataPointOnFocus
          stripColor={colorScheme === "dark" ? "white" : "black"}
          delayBeforeUnFocus={5000}
          textFontSize={20}
          isAnimated
          maxValue={10000}
          yAxisLabelPrefix="$"
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: "lightgray",
            pointerStripWidth: 2,
            pointerColor: "lightgray",
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            autoAdjustPointerLabelPosition: false,
            pointerVanishDelay: 5000,
            pointerLabelComponent: (item: any) => {
              return (
                <View
                  style={{
                    height: 90,
                    width: 100,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colorScheme === "dark" ? "white" : "black",
                      fontSize: 14,
                      marginBottom: 6,
                      textAlign: "center",
                    }}
                  >
                    {item[0].date}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 6,
                      borderRadius: 16,
                      backgroundColor:
                        colorScheme === "dark" ? "white" : "black",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        color: colorScheme === "dark" ? "black" : "white",
                      }}
                    >
                      {"$" + item[0].value + ".0"}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />
      </View>
      <TouchableOpacity
        className="border border-zinc-500 px-4 py-4 rounded-2xl flex flex-1 justify-start"
        style={{
          backgroundColor: colorScheme === "dark" ? "black" : "#f0f0f0",
        }}
      >
        <View className="flex-row justify-between">
          <Text
            style={{ fontFamily: "MontserratSemiBold" }}
            className={`tracking-wide mt-2 ${
              colorScheme === "dark" ? "text-zinc-100" : "text-zinc-900"
            }`}
          >
            High purchases
          </Text>
          <Image
            source={require("~/assets/dashboard/completed.svg")}
            style={{ width: 24, height: 24 }}
          />
        </View>
        <Text
          style={{ fontFamily: "MontserratRegular" }}
          className="text-2xl mt-4"
        >
          $1200
        </Text>
      </TouchableOpacity>
    </View>
  );
}
