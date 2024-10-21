import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text as TextUi,
} from "~/components/ui";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";
import { fetchTrainingTasks } from "~/server/query/training";
import { Image } from "expo-image";

export default function MaterialCard({
  data,
}: {
  data: {
    id: number;
    name: string;
  };
}) {
  const { colorScheme } = useColorScheme();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const fetchedTasks = await fetchTrainingTasks(data.id);
        // Verificar si las tareas ya están cargadas
        if (JSON.stringify(fetchedTasks) !== JSON.stringify(tasks)) {
          setTasks(fetchedTasks);
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [data.id]); // Asegúrate de que solo se ejecute cuando data.id cambie

  if (loading) {
    return (
      <View className="mt-8 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <>
      <TextUi className="flex text-2xl my-4 font-semibold">Courses</TextUi>

      <View className="flex items-center">
        {tasks.map((task) => (
          <Card
            className={`w-full rounded-2xl mb-4 bg-blue-500`}
            key={`${task.id}`}
          >
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
              <CardDescription className="text-white">
                Learn more
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-start" style={{ zIndex: 10 }}>
              <TouchableOpacity>
                <Button
                  className="w-40 bg-white"
                  onPress={() => {
                    router.navigate(`/training/${data.id}?name=${data.name}`);
                    console.log(data.id);
                  }}
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
        ))}
      </View>
    </>
  );
}
