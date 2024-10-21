import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import Moment from "moment";
import { supabase } from "~/server/db";
import { useProfile } from "~/hooks/useProfile";

export default function SystemSteps({
  data,
}: {
  data: {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
  };
}) {
  const { colorScheme } = useColorScheme();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useProfile();

  useEffect(() => {
    if (session?.user) {
      fetchTasks();
    }
  }, [data.id, session]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      if (!session?.user.id) throw new Error("User not authenticated");

      // Obtener el perfil del usuario
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("userid", session.user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile) throw new Error("Profile not found");

      const { data: taskData, error } = await supabase
        .from("Task")
        .select(
          `
          id,
          status,
          completedAt,
          completedById,
          textTask:TextTask(name),
          videoTask:VideoTask(name),
          tipsTask:TipsTask(name)
        `
        )
        .eq("weekId", data.id);

      if (error) throw error;

      const taskIds = taskData.map((task) => task.id);

      const [textTasks, videoTasks, tipsTasks] = await Promise.all([
        supabase.from("TextTask").select("*").in("taskId", taskIds),
        supabase.from("VideoTask").select("*").in("taskId", taskIds),
        supabase.from("TipsTask").select("*").in("taskId", taskIds),
      ]);

      const combinedTasks = taskData.map((task) => {
        const textTask = textTasks.data?.find((t) => t.taskId === task.id);
        const videoTask = videoTasks.data?.find((t) => t.taskId === task.id);
        const tipsTask = tipsTasks.data?.find((t) => t.taskId === task.id);

        return {
          ...task,
          details: textTask || videoTask || tipsTask,
          type: textTask ? "text" : videoTask ? "video" : "tips",
          isCompleted: task.completedById === profile.id,
        };
      });

      setTasks(combinedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const stringDate =
    Moment(data.startDate).format("MMM DD, YYYY") +
    " - " +
    Moment(data.endDate).format("MMM DD, YYYY");

  if (loading) {
    return (
      <View className="mt-8 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="mt-8">
      <Text className="text-lg mb-2 text-zinc-400">{stringDate}</Text>
      <Text
        className="text-lg text-blue-500"
        style={{
          marginLeft: 5,
        }}
      >
        {data.name}
      </Text>
      <View className="px-2 mt-1">
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            onPress={() => {
              router.navigate(`/system/${task.id}`);
            }}
          >
            <View
              className="flex-row items-center justify-center mb-4 rounded-3xl p-6"
              style={{
                width: "100%",
                backgroundColor: colorScheme === "dark" ? "#232323" : "#f9f9f9",
              }}
            >
              <View
                className="w-14 h-14 rounded-full mr-4 items-center justify-center"
                style={{
                  backgroundColor: task.isCompleted ? "#4CAF50" : "#FFC107",
                }}
              >
                <Ionicons
                  name={
                    task.type === "text"
                      ? "document-text-outline"
                      : task.type === "video"
                      ? "videocam-outline"
                      : "bulb-outline"
                  }
                  size={24}
                  color="white"
                />
              </View>
              <View className="flex-1 mr-2">
                <Text
                  className="font-bold"
                  style={{
                    color: colorScheme === "dark" ? "#fff" : "#000",
                  }}
                >
                  {task.details.name}
                </Text>
                <Text
                  className="font-light"
                  style={{
                    color: colorScheme === "dark" ? "#fff" : "#000",
                  }}
                >
                  {task.type === "video" ? "Watch Video" : "See more details"}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: task.isCompleted ? "#4CAF50" : "#FFC107",
                  width: 100,
                }}
                className="ml-auto px-2 py-2 rounded-lg items-center justify-center"
              >
                <Text
                  style={{
                    color: colorScheme === "dark" ? "#fff" : "#000",
                  }}
                >
                  {task.isCompleted ? "Completed" : "Pending"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
