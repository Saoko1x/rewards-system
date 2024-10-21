import { ActivityIndicator, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Badge, Text } from "~/components/ui";
import { Image } from "expo-image";

import { useColorScheme } from "~/lib/useColorScheme";
import { supabase } from "~/server/db";
import { useProfile } from "~/hooks/useProfile";

export default function Tasks() {
  const { colorScheme } = useColorScheme();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { session, companyid, loading: profileLoading } = useProfile();

  useEffect(() => {
    if (session?.user && companyid !== null && !profileLoading) {
      fetchUserTasks();
    }
  }, [session, companyid, profileLoading]);

  const fetchUserTasks = async () => {
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

      // Obtener las tareas del usuario con estado "pending"
      const { data, error } = await supabase
        .from("Task")
        .select(
          `
          id,
          status,
          completedAt,
          week:Week(name),
          textTask:TextTask(name),
          videoTask:VideoTask(name),
          tipsTask:TipsTask(name)
        `
        )
        .eq("completedById", profile.id)
        .eq("status", "pending");

      if (error) throw error;

      if (data) {
        setTasks(data);
        setFetchError(null);
      }
      setLoading(false);
    } catch (error) {
      setFetchError("Error fetching tasks");
      setTasks([]);
      console.error("Error fetching tasks", error);
      setLoading(false);
    }
  };

  if (loading || profileLoading) {
    return (
      <View className="mt-8 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      {tasks.map((task) => {
        const taskName =
          task.textTask?.name || task.videoTask?.name || task.tipsTask?.name;

        return (
          <View
            key={task.id}
            className="mt-8 flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: "https://example.com/task-icon.png" }}
                style={{ width: 40, height: 40 }}
              />
              <View className="ml-4">
                <Text className="font-semibold text-white">
                  {taskName || `Task ${task.id}`}
                </Text>
                <Text className="text-gray-500">
                  {task.week?.name || "Weekly Task"}
                </Text>
              </View>
            </View>
            <Badge variant="default">
              <Text>Pending</Text>
            </Badge>
          </View>
        );
      })}
    </>
  );
}
