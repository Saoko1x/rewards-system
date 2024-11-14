import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image } from "expo-image";

const MaterialCard = memo(
  ({ data }: { data: { id: number; name: string } }) => {
    return (
      <Card className="w-full rounded-2xl mb-4 bg-blue-500">
        <Image
          source={require("~/assets/training/training-blue.png")}
          contentFit="cover"
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            borderRadius: 16,
            position: "relative",
          }}
        />
        <CardHeader className="flex-1 max-w-xs" style={{ zIndex: 10 }}>
          <CardTitle className="text-white">{data.name}</CardTitle>
          <CardDescription className="text-white">Learn more</CardDescription>
        </CardHeader>
        <CardContent className="flex items-start" style={{ zIndex: 10 }}>
          <TouchableOpacity>
            <Button
              className="w-40 bg-white"
              onPress={() =>
                router.navigate(`/training/${data.id}?name=${data.name}`)
              }
            >
              <Text className="text-base">Watch course</Text>
            </Button>
          </TouchableOpacity>
        </CardContent>
        <LinearGradient
          colors={["#3b82f6", "#3b82f6", "transparent"]}
          start={[0, 1]}
          end={[1, 1]}
          style={{
            height: "100%",
            width: "100%",
            zIndex: 1,
            borderRadius: 16,
            position: "absolute",
            opacity: 0.8,
          }}
        />
      </Card>
    );
  }
);

MaterialCard.displayName = "MaterialCard";

export default MaterialCard;
