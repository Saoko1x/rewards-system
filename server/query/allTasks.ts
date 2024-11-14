import { supabase } from "~/server/db";

export async function fetchAllTasks(companyId: number) {
  try {
    // Fetch regular tasks with their names
    const { data: weekData, error: weekError } = await supabase
      .from("Week")
      .select("id")
      .eq("companyId", companyId);

    if (weekError) throw weekError;

    const weekIds = weekData.map((week) => week.id);

    const { data: regularTasks, error: regularTasksError } = await supabase
      .from("Task")
      .select(
        `
        *,
        textTask:TextTask(name),
        videoTask:VideoTask(name),
        tipsTask:TipsTask(name)
      `
      )
      .in("weekId", weekIds);

    if (regularTasksError) throw regularTasksError;

    // Fetch boost tasks with their names
    const { data: boostTasks, error: boostTasksError } = await supabase
      .from("BoostTask")
      .select(
        `
        *,
        textTask:BoostTextTask(name),
        videoTask:BoostVideoTask(name),
        tipsTask:BoostTipsTask(name)
      `
      )
      .eq("companyId", companyId);

    if (boostTasksError) throw boostTasksError;

    // Fetch training tasks with their names
    const { data: trainingData, error: trainingError } = await supabase
      .from("Training")
      .select("id")
      .eq("companyId", companyId);

    if (trainingError) throw trainingError;

    const trainingIds = trainingData.map((training) => training.id);

    const { data: trainingTasks, error: trainingTasksError } = await supabase
      .from("TrainingTask")
      .select(
        `
        *,
        textTask:TrainingTextTask(name),
        videoTask:TrainingVideoTask(name),
        tipsTask:TrainingTipsTask(name)
      `
      )
      .in("trainingId", trainingIds);

    if (trainingTasksError) throw trainingTasksError;

    // Helper function to get task name
    const getTaskName = (task: any) => {
      if (task.textTask?.[0]?.name) return task.textTask[0].name;
      if (task.videoTask?.[0]?.name) return task.videoTask[0].name;
      if (task.tipsTask?.[0]?.name) return task.tipsTask[0].name;
      return `Task ${task.id}`; // Fallback name if no specific task type is found
    };

    // Combine all tasks
    const allTasks = [
      ...regularTasks.map((task) => ({ ...task, type: "system" })),
      ...boostTasks.map((task) => ({ ...task, type: "boost" })),
      ...trainingTasks.map((task) => ({ ...task, type: "training" })),
    ];

    // Calculate totals and get incomplete task names
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(
      (task) => task.status === "completed"
    ).length;
    const incompleteTasks = allTasks.filter(
      (task) => task.status !== "completed"
    );

    return {
      total: totalTasks,
      completed: completedTasks,
      incomplete: {
        count: incompleteTasks.length,
        tasks: incompleteTasks.map((task) => ({
          id: task.id,
          name: getTaskName(task),
          type: task.type,
        })),
      },
    };
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    throw error;
  }
}
