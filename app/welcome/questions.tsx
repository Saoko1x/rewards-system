import React, { useState, useEffect } from "react";
import Container from "~/components/Container";
import { Button, Label, Text, Toggle } from "~/components/ui";
import { Alert, View } from "react-native";
import { router } from "expo-router";

import { useColorScheme } from "~/lib/useColorScheme";
import { useProfile } from "~/hooks/useProfile";
import {
  fetchOnboardingData,
  saveOnboardingAnswers,
} from "~/server/query/onboarding";

export default function Questions() {
  const { colorScheme } = useColorScheme();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const { companyid, profileId } = useProfile();
  const [currentAnswer, setCurrentAnswer] = useState(0);
  const [onboardingData, setOnboardingData] = useState<any>();

  useEffect(() => {
    if (companyid !== null) {
      fetchOnboardingQuestions();
    }
  }, [companyid]);

  const fetchOnboardingQuestions = async () => {
    const data = await fetchOnboardingData(companyid!);
    if (data) {
      setOnboardingData(data);
    }
  };

  const handleNextStep = async () => {
    const updatedAnswers = { ...answers, [step]: currentAnswer };
    setAnswers(updatedAnswers);

    if (step === onboardingData.questions.length - 1) {
      // Save answers to the database
      const answersToSave = Object.entries(updatedAnswers).map(
        ([questionIndex, answerId]) => ({
          questionId: onboardingData.questions[parseInt(questionIndex)].id,
          answerId,
        })
      );

      const result = await saveOnboardingAnswers(
        profileId!,
        answersToSave as { questionId: number; answerId: number }[]
      );
      if (result.success) {
        router.navigate("/dashboard/home");
      } else {
        console.error("Failed to save onboarding answers:", result.error);
        // Handle the error, e.g., show an error message to the user
        Alert.alert("Error", "Failed to save your answers. Please try again.", [
          { text: "OK" },
        ]);
      }
      return;
    }

    setCurrentAnswer(0);
    setStep(step + 1);
  };

  if (!onboardingData) {
    return <Text>Loading...</Text>;
  }

  const currentQuestion = onboardingData.questions[step];

  return (
    <Container>
      <Label style={{ fontFamily: "MontserratSemiBold" }} nativeID="step-label">
        Step {step + 1}/{onboardingData.questions.length}
      </Label>
      <Text
        style={{ fontFamily: "MontserratSemiBold" }}
        className="text-3xl font-bold mt-8 "
      >
        {currentQuestion.question}
      </Text>

      <View className="flex-col gap-4 mt-8">
        {currentQuestion.answers.map((answer: any, key: any) => (
          <Toggle
            className="border border-zinc-300 "
            style={{
              borderRadius: 8,
              height: 65,
            }}
            key={answer.id}
            onPressedChange={() => {
              setCurrentAnswer(answer.id);
            }}
            pressed={currentAnswer === answer.id}
          >
            <Text
              className={` ${
                colorScheme === "dark"
                  ? "text-zinc-200 text-center border-0"
                  : "text-zinc-700 text-center border-0"
              }`}
              style={{ fontFamily: "MontserratRegular" }}
            >
              {answer.answerText}
            </Text>
          </Toggle>
        ))}
        <Button
          className="mt-4"
          onPress={handleNextStep}
          disabled={currentAnswer === 0}
        >
          <Text style={{ fontFamily: "MontserratSemiBold" }}>Continue</Text>
        </Button>
      </View>
    </Container>
  );
}
