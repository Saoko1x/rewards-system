import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import AvatarLink from "~/components/AvatarLink";

export default function Head() {
  return (
    <View className="flex z-50 flex-row justify-between mx-4">
      <Link href={"/(notifications)/"}>
        <Ionicons name="notifications-outline" size={24} color={"white"} />
      </Link>
      <View className="flex-row gap-6">
        <Link href={"/(info)/"}>
          <Ionicons name="newspaper-outline" size={24} color={"white"} />
        </Link>
        <AvatarLink />
      </View>
    </View>
  );
}
