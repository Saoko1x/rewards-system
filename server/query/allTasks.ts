import { supabase } from "~/server/db";

export async function fetchAllTasks(companyId: number) {
  try {
    // Fetch regular tasks
    const { data: weekData, error: weekError } = await supabase
      .from("Week")
      .select("id")
      .eq("companyId", companyId);

    if (weekError) throw weekError;

    const weekIds = weekData.map((week) => week.id);

    const { data: regularTasks, error: regularTasksError } = await supabase
      .from("Task")
      .select("*")
      .in("weekId", weekIds);

    if (regularTasksError) throw regularTasksError;

    // Fetch boost tasks
    const { data: boostTasks, error: boostTasksError } = await supabase
      .from("BoostTask")
      .select("*")
      .eq("companyId", companyId);

    if (boostTasksError) throw boostTasksError;

    // Fetch training tasks
    const { data: trainingData, error: trainingError } = await supabase
      .from("Training")
      .select("id")
      .eq("companyId", companyId);

    if (trainingError) throw trainingError;

    const trainingIds = trainingData.map((training) => training.id);

    const { data: trainingTasks, error: trainingTasksError } = await supabase
      .from("TrainingTask")
      .select("*")
      .in("trainingId", trainingIds);

    if (trainingTasksError) throw trainingTasksError;

    // Combine all tasks
    const allTasks = [...regularTasks, ...boostTasks, ...trainingTasks];

    // Calculate totals
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(
      (task) => task.status === "completed"
    ).length;
    const incompleteTasks = totalTasks - completedTasks;

    return {
      total: totalTasks,
      completed: completedTasks,
      incomplete: incompleteTasks,
    };
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    throw error;
  }
}
