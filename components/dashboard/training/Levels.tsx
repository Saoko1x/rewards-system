import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Card, CardHeader, CardTitle } from "~/components/ui";
import { Image } from "expo-image";

export default function Levels() {
  const levels = [
    {
      id: 1,
      title: "Professional",
      tasks: 30,
      rank: "icon",
      courses: 3,
      image: require("~/assets/resources/DiamondProfessional.svg"),
      status: "active",
    },
    {
      id: 2,
      title: "Master",
      tasks: 30,
      rank: "icon",
      courses: 6,
      image: require("~/assets/resources/DiamondMaster.svg"),
      status: "inactive",
    },
    {
      id: 3,
      title: "Expert",
      tasks: 30,
      rank: "icon",
      courses: 12,
      image: require("~/assets/resources/DiamondExpert.svg"),
      status: "inactive",
    },
    {
      id: 4,
      title: "Legend",
      tasks: 30,
      rank: "icon",
      courses: 24,
      image: require("~/assets/resources/DiamondLegend.svg"),
      status: "inactive",
    },
    {
      id: 5,
      title: "Trainer",
      tasks: 30,
      rank: "icon",
      courses: 48,
      image: require("~/assets/resources/DiamondTrainer.svg"),
      status: "inactive",
    },
    {
      id: 6,
      title: "Pro Trainer",
      tasks: 30,
      rank: "icon",
      courses: 60,
      image: require("~/assets/resources/DiamondTrainer.svg"),
      status: "inactive",
    },
  ];
  return (
    <View>
      {levels.map((level) => (
        <Card key={level.id} className="mb-4 rounded-3xl ">
          <TouchableOpacity className="flex-row items-center px-4">
            <Image
              source={level.image}
              style={{
                width: 45,
                height: 40,
              }}
            ></Image>
            <CardHeader>
              <CardTitle className="text-lg">{level.title}</CardTitle>
              <CardTitle className="text-base font-light">
                Complete {level.courses} courses
              </CardTitle>
            </CardHeader>
          </TouchableOpacity>
        </Card>
      ))}
    </View>
  );
}
