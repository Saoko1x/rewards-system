import { supabase } from "~/server/db";

export async function fetchOnboardingData(companyid: number) {
  const { data, error } = await supabase
    .from("Onboarding")
    .select(
      `
        id,
        questions:OnboardingQuestion (
          id,
          question,
          answers:OnboardingAnswer (
            id,
            answerText
          )
        )
      `
    )
    .eq("companyId", companyid); // Filtrar por companyid

  // Remove the .single() method
  if (error) {
    console.error("Error fetching onboarding data:", error);
    return null;
  }

  // If there's no data or empty array, return an empty object
  if (!data || data.length === 0) {
    return {
      id: "",
      questions: [],
    };
  }

  // Return the first item in the array
  return data[0];
}

export async function saveOnboardingAnswers(
  profileId: number,
  answers: { questionId: number; answerId: number }[]
) {
  try {
    const { data, error } = await supabase
      .from("UserOnboardingResponse")
      .upsert(
        answers.map((answer) => ({
          profileId: profileId,
          questionId: answer.questionId,
          answerId: answer.answerId,
        })),
        { onConflict: "profileId,questionId", returning: "minimal" }
      );

    if (error) {
      console.error("Error saving onboarding answers:", error);
      return { success: false, error: error.message };
    }

    // Since we're using `returning: "minimal"`, we won't get the data back
    // Instead, we'll check if there's no error
    return { success: true };
  } catch (error) {
    console.error("Error saving onboarding answers:", error);
    return { success: false, error: (error as Error).message };
  }
}
