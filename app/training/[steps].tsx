import React, { useEffect, useState } from "react";
import { View, ScrollView, Platform, TouchableOpacity } from "react-native";
import Ionicon from "@expo/vector-icons/Ionicons";
import Container from "~/components/Container";
import { Image } from "expo-image";
import { Text } from "~/components/ui";
import { useColorScheme } from "~/lib/useColorScheme";
import { router, useLocalSearchParams } from "expo-router";
import {
  Bitcoin,
  Blocks,
  DollarSign,
  Landmark,
  PiggyBank,
} from "lucide-react-native";
import { fetchTrainingTasks } from "~/server/query/training";

const icons = [
  {
    getIcon: (colorScheme: any) => (
      <Bitcoin stroke={colorScheme === "dark" ? "#fff" : "#000"} size={40} />
    ),
  },
  {
    getIcon: (colorScheme: any) => (
      <Landmark stroke={colorScheme === "dark" ? "#fff" : "#000"} size={40} />
    ),
  },
  {
    getIcon: (colorScheme: any) => (
      <PiggyBank stroke={colorScheme === "dark" ? "#fff" : "#000"} size={40} />
    ),
  },
  {
    getIcon: (colorScheme: any) => (
      <DollarSign stroke={colorScheme === "dark" ? "#fff" : "#000"} size={40} />
    ),
  },
  {
    getIcon: (colorScheme: any) => (
      <Blocks stroke={colorScheme === "dark" ? "#fff" : "#000"} size={40} />
    ),
  },
];

export default function Steps() {
  const { colorScheme } = useColorScheme();
  const id = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<any[]>([]);

  const dataId = parseInt(id["steps"] as string);
  const name = id["name"] as string;

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const fetchedTasks = await fetchTrainingTasks(dataId);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [dataId]);

  return (
    <ScrollView>
      <Title title={name} />
      <Container>
        <View className="mt-16 h-screen">
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            tasks.map((task, index) => {
              if (index % 2 === 0) {
                return <FirstStep task={task} key={task.id} />;
              } else {
                return <SecondStep task={task} key={task.id} />;
              }
            })
          )}
        </View>
      </Container>
    </ScrollView>
  );
}

const RandomIcon = () => {
  const { colorScheme } = useColorScheme();
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex].getIcon(colorScheme);
};

const FirstStep = ({ task }: { task: any }) => {
  const { colorScheme } = useColorScheme();
  console.log("task", task);

  return (
    <View className="flex-col items-center">
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/training/learn",
            params: {
              taskDetails: JSON.stringify(task.details),
              taskType: task.type,
            },
          });
        }}
      >
        <View className="flex-row justify-center items-center gap-2 pr-20">
          <RandomIcon />
        </View>
      </TouchableOpacity>
      {colorScheme === "dark" ? (
        <Image
          source={require("~/assets/training/second-line.svg")}
          style={{ width: 60, height: 60, marginVertical: 40 }}
        />
      ) : (
        <Image
          source={require("~/assets/training/second-line.svg")}
          style={{ width: 60, height: 60, marginVertical: 40 }}
        />
      )}
    </View>
  );
};

const SecondStep = ({ task }: { task: any }) => {
  const { colorScheme } = useColorScheme();
  console.log("task", task);
  return (
    <View className="flex-col items-center">
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/training/learn",
            params: {
              taskDetails: JSON.stringify(task.details),
              taskType: task.type,
            },
          });
        }}
      >
        <View className="flex-row justify-center items-center gap-2 pl-20">
          <RandomIcon />
        </View>
      </TouchableOpacity>
      {colorScheme === "dark" ? (
        <Image
          source={require("~/assets/training/first-line.svg")}
          style={{ width: 50, height: 60, marginVertical: 40 }}
        />
      ) : (
        <Image
          source={require("~/assets/training/first-line.svg")}
          style={{ width: 50, height: 60, marginVertical: 40 }}
        />
      )}
    </View>
  );
};

const Title = ({ title }: { title: string }) => {
  const { colorScheme } = useColorScheme();

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <View
        style={{
          width: "25%",
          height: 4,
          backgroundColor: "#F3F3F3",
        }}
      ></View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: colorScheme === "dark" ? "#fff" : "#333333",
          marginHorizontal: 10,
          textAlign: "center",
          width: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Blocks stroke={"#008cff"} size={20} className="mr-5" />
        {title}
      </Text>
      <View
        style={{
          width: "25%",
          height: 4,
          backgroundColor: "#F3F3F3",
        }}
      ></View>
    </View>
  );
};
