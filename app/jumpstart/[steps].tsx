import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Container from "~/components/Container";
import { Image } from "expo-image";
import { Text } from "~/components/ui";
import { useColorScheme } from "~/lib/useColorScheme";
import { router } from "expo-router";
import {
  Bitcoin,
  Blocks,
  DollarSign,
  Landmark,
  PiggyBank,
} from "lucide-react-native";
import { fetchBoostTasks } from "~/server/query/boost";
import { useProfile } from "~/hooks/useProfile";

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
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { companyid } = useProfile();

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const fetchedTasks = await fetchBoostTasks(companyid!);
        setTasks(fetchedTasks);
        console.log(fetchedTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
    console.log(tasks);
  }, [companyid]);

  if (loading) {
    return (
      <View className="mt-8 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView>
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
            pathname: "/jumpstart/jumpstartBusiness",
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
            pathname: "/jumpstart/jumpstartBusiness",
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
