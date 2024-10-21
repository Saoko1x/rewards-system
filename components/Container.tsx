import { View, Text } from "react-native";
import React from "react";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <View className={`px-4 ${className}`}>{children}</View>;
}
