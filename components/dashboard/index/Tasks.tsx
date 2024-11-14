import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { Badge, Text } from "~/components/ui";
import { Image } from "expo-image";
import { useColorScheme } from "~/lib/useColorScheme";
import { useProfile } from "~/hooks/useProfile";
import { fetchAllTasks } from "~/server/query/allTasks";
import { router } from "expo-router";

// Definición del tipo para taskStats
interface TaskStats {
  total: number;
  completed: number;
  incomplete: {
    count: number;
    tasks: Array<{ id: number; name: string; type: string }>; // Asegúrate de que tasks sea un arreglo
  };
}

export default function Tasks() {
  const [taskStats, setTaskStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    incomplete: { count: 0, tasks: [] }, // Asegúrate de que tasks sea un arreglo
  });
  const { colorScheme } = useColorScheme();
  const {
    companyid,
    loading: profileLoading,
    error: profileError,
  } = useProfile();

  useEffect(() => {
    const loadTaskStats = async () => {
      try {
        // Asume que tienes acceso al companyId, si no, necesitarás obtenerlo de alguna manera
        const stats = await fetchAllTasks(companyid!);
        setTaskStats(stats);
        console.log(stats.incomplete.tasks);
      } catch (error) {
        console.error("Error loading task stats:", error);
      }
    };

    loadTaskStats();
  }, [companyid]);

  return (
    <>
      {profileLoading ? (
        <View className="flex items-center justify-center h-96">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <View className="flex flex-col">
            {taskStats.incomplete.tasks.slice(0, 5).map((task) => (
              // <View key={task.id} className="flex flex-row justify-between">
              //   <Text className="text-lg">{task.name}</Text>
              //   {/* <Badge className="bg-red-500">{task.type}</Badge> */}
              // </View>
              <TouchableOpacity
                key={task.id}
                className="mt-6 flex flex-row items-center justify-between"
                onPress={() =>
                  // si task.type es regular, entonces navega a /system/${task.id}, si es boost navega a /boost/${task.id}, si es training navega a /training/${task.id}
                  router.navigate(`/${task.type}/${task.id}`)
                }
              >
                <View
                  className="w-10 h-10 rounded-full mr-4 items-center justify-center"
                  style={{
                    backgroundColor:
                      colorScheme === "dark" ? "#232323" : "#232323",
                  }}
                >
                  <Ionicons
                    name={
                      task.type === "system"
                        ? "construct-outline"
                        : task.type === "boost"
                        ? "flash-outline"
                        : "school-outline"
                    }
                    size={16}
                    color={colorScheme === "dark" ? "white" : "white"}
                  />
                </View>

                <Text className="font-semibold flex-1 ml-2">
                  {task.name.length > 20
                    ? `${task.name.slice(0, 40)}...`
                    : task.name}
                </Text>
                <Badge variant="outline">
                  <Text>Pending</Text>
                </Badge>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </>
  );
}
