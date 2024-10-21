import { View } from "react-native";
import { Text } from "~/components/ui";
import { useColorScheme } from "~/lib/useColorScheme";

const data = [
  {
    id: 1,
    date: "16 - 23 Jun",
    values: [{ ingresos: 1600, gastos: 1000 }],
  },
  {
    id: 2,
    date: "23 - 30 Jun",
    values: [{ ingresos: 6400, gastos: 2000 }],
  },
  {
    id: 3,
    date: "30 - 6 Jul",
    values: [{ ingresos: 8000, gastos: 3000 }],
  },
];

const maxSpend = Math.max(
  ...data.flatMap((item) => [item.values[0].ingresos, item.values[0].gastos])
);

const maxHeight = 200;

const barHeight = (value: number) => (value / maxSpend) * maxHeight;

export default function BarsChart() {
  const { colorScheme } = useColorScheme();
  return (
    <View>
      <Text className="text-2xl my-4 font-semibold">Expenses and Revenues</Text>

      <View
        className="justify-center flex-col"
        style={{
          backgroundColor: colorScheme === "dark" ? "transparent" : "#fff",
          width: "100%",
          height: 300,
        }}
      >
        <View className="flex-row items-center justify-center mb-4">
          <View
            className="h-2 w-2 mr-1 rounded-full"
            style={{ backgroundColor: "#99E5BC" }}
          ></View>
          <Text className="mr-4">Revenues {``}</Text>
          <View
            className="h-2 w-2 mr-1 rounded-full"
            style={{ backgroundColor: "#2A74EC" }}
          ></View>
          <Text>Expenses</Text>
        </View>

        {/* Cantidad lateral */}
        <View className="flex-row">
          <View
            className="mr-10 mb-6 items-end justify-between"
            style={{ height: maxHeight }}
          >
            {
              // Numeros laterales de la grafica que empieza de 0 desde abajo hasta el maximo segun barHeight
              Array.from({ length: 6 }).map((_, index) => (
                <Text key={index}>
                  ${Math.round((maxSpend / 5) * (5 - index))}
                </Text>
              ))
            }
          </View>

          {/* Map de la grafica de barras con ingresos y gastos */}
          <>
            {data.map((item) => (
              // Barras
              <View key={item.id} className="flex-col items-center justify-end">
                {/* Contenedor de las barras */}
                <View className="flex-row items-end gap-1">
                  {item.values.map((value, index) => (
                    // Barra verde
                    <View
                      key={index}
                      style={{
                        width: 16,
                        backgroundColor: "#99E5BC",
                        height: barHeight(value.ingresos),
                        borderTopStartRadius: 10,
                        borderTopEndRadius: 10,
                      }}
                    ></View>
                  ))}
                  {item.values.map((value, index) => (
                    // Barra azul
                    <View
                      key={index}
                      style={{
                        width: 16,
                        backgroundColor: "#2A74EC",
                        height: barHeight(value.gastos),
                        borderTopStartRadius: 10,
                        borderTopEndRadius: 10,
                      }}
                    ></View>
                  ))}
                </View>
                <Text
                  className="mt-2"
                  style={{
                    marginHorizontal: 5,
                  }}
                >
                  {item.date}
                </Text>
              </View>
            ))}
          </>
        </View>
      </View>
    </View>
  );
}
