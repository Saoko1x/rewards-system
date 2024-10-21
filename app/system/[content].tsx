import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Container from "~/components/Container";
import SystemVideo from "~/components/dashboard/system/SystemVideo";
import SystemText from "~/components/dashboard/system/SystemText";
import SystemTips from "~/components/dashboard/system/SystemTips";
import { supabase } from "~/server/db";
import { useProfile } from "~/hooks/useProfile";

export default function Content() {
  const { content: taskId } = useLocalSearchParams();
  const { companyid } = useProfile();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (companyid !== null && taskId) {
      fetchTaskData();
    }
  }, [companyid, taskId]);

  const fetchTaskData = async () => {
    setLoading(true);
    try {
      // Fetch the basic task data
      const { data: taskData, error: taskError } = await supabase
        .from("Task")
        .select("*")
        .eq("id", taskId)
        .single();

      if (taskError) throw taskError;

      if (!taskData) {
        throw new Error("Task not found");
      }

      // Fetch the specific task type data
      const [textTask, videoTask, tipsTask] = await Promise.all([
        supabase
          .from("TextTask")
          .select("*")
          .eq("taskId", taskId)
          .maybeSingle(),
        supabase
          .from("VideoTask")
          .select("*")
          .eq("taskId", taskId)
          .maybeSingle(),
        supabase
          .from("TipsTask")
          .select("*")
          .eq("taskId", taskId)
          .maybeSingle(),
      ]);

      const taskDetails = textTask.data || videoTask.data || tipsTask.data;

      if (!taskDetails) {
        throw new Error("Task details not found");
      }

      const taskType = textTask.data
        ? "text"
        : videoTask.data
        ? "video"
        : "tips";

      setTask({
        ...taskData,
        ...taskDetails,
        type: taskType,
      });

      setError(null);
    } catch (err) {
      console.error("Error fetching task data:", err);
      setError("Error fetching task data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <View className="h-screen items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Container>
    );
  }

  if (error || !task) {
    return (
      <Container>
        <View className="h-screen items-center justify-center">
          <Text>{error || "Task not found"}</Text>
        </View>
      </Container>
    );
  }

  return (
    <ScrollView>
      <Container>
        <View className="h-screen">
          {task.type === "video" && (
            <SystemVideo
              title={task.name}
              description={task.title1}
              videoUrl={task.videoUrl}
            />
          )}
          {task.type === "text" && (
            <SystemText
              title={task.name}
              description={task.title1}
              content={task}
            />
          )}
          {task.type === "tips" && (
            <SystemTips
              title={task.name}
              description={task.title1}
              content={task}
            />
          )}
        </View>
      </Container>
    </ScrollView>
  );
}
