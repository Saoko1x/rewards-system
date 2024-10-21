import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { Text } from "~/components/ui";
import { useColorScheme } from "~/lib/useColorScheme";
import { router } from "expo-router";

export default function ProgressCallToAction() {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex z-50 flex-row justify-between mt-8">
      <Text
        style={{ fontFamily: "MontserratSemiBold" }}
        className="text-2xl mt-4 text-zinc-100"
      >
        Progress
      </Text>
      <TouchableOpacity
        className="h-16 w-16 bg-zinc-900 border border-zinc-800 rounded-full justify-center items-center mr-2"
        onPress={() => {
          router.push("/dashboard/system");
        }}
      >
        <Ionicons
          name="arrow-forward-sharp"
          size={28}
          style={{ transform: [{ rotate: "-45deg" }] }}
          color={colorScheme === "dark" ? "white" : "white"}
        />
      </TouchableOpacity>
    </View>
  );
}
