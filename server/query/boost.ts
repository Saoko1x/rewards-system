import { supabase } from "~/server/db";

export async function fetchBoostTasks(companyid: number) {
  try {
    const { data: taskData, error } = await supabase
      .from("BoostTask")
      .select("*")
      .eq("companyId", companyid);

    if (error) throw error;

    const taskIds = taskData.map((task) => task.id);

    const [textTasks, videoTasks, tipsTasks] = await Promise.all([
      supabase.from("BoostTextTask").select("*").in("taskId", taskIds),
      supabase.from("BoostVideoTask").select("*").in("taskId", taskIds),
      supabase.from("BoostTipsTask").select("*").in("taskId", taskIds),
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
