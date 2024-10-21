import { supabase } from "~/server/db";

export async function fetchTrainingTasks(trainingId: number) {
  try {
    const { data: taskData, error } = await supabase
      .from("TrainingTask")
      .select("*")
      .eq("trainingId", trainingId);

    if (error) throw error;

    const taskIds = taskData.map((task) => task.id);

    const [textTasks, videoTasks, tipsTasks] = await Promise.all([
      supabase.from("TrainingTextTask").select("*").in("taskId", taskIds),
      supabase.from("TrainingVideoTask").select("*").in("taskId", taskIds),
      supabase.from("TrainingTipsTask").select("*").in("taskId", taskIds),
    ]);

    const combinedTasks = taskData.map((task) => {
      const textTask = textTasks.data?.find((t) => t.taskId === task.id);
      const videoTask = videoTasks.data?.find((t) => t.taskId === task.id);
      const tipsTask = tipsTasks.data?.find((t) => t.taskId === task.id);

      const details = textTask || videoTask || tipsTask;

      return {
        ...task,
        details,
        type: textTask ? "text" : videoTask ? "video" : "tips",
        name: details?.name || "Unnamed Task",
        description: details?.title1 || "See more details",
      };
    });

    return combinedTasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}
