import { View, TouchableOpacity } from "react-native";
import { Text } from "~/components/ui";
import { Image } from "expo-image";

import { useColorScheme } from "~/lib/useColorScheme";
export default function ExpensesAndRevenues({
  ingresos,
  gastos,
}: {
  ingresos: number;
  gastos: number;
}) {
  const { colorScheme } = useColorScheme();
  return (
    <View>
      <View className="flex-row justify-between mt-8 gap-4">
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
              Revenues
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
            ${ingresos}
          </Text>
        </TouchableOpacity>
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
              Expenses
            </Text>
            <Image
              source={require("~/assets/dashboard/uncompleted.svg")}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <Text
            style={{ fontFamily: "MontserratRegular" }}
            className="text-2xl mt-4"
          >
            ${gastos}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}