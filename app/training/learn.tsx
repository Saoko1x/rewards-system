import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Container from "~/components/Container";
import TrainingVideo from "~/components/dashboard/training/templates/TrainingVideo";
import TrainingText from "~/components/dashboard/training/templates/TrainingText";
import TrainingTips from "~/components/dashboard/training/templates/TrainingTips";

export default function Learn() {
  const { taskDetails, taskType } = useLocalSearchParams();
  const [trainingData, setTrainingData] = useState<any>(null);
  console.log(taskDetails);

  useEffect(() => {
    if (taskDetails && taskType) {
      const parsedDetails = JSON.parse(taskDetails as string);
      setTrainingData({
        ...parsedDetails,
        type: taskType,
      });
    }
  }, [taskDetails, taskType]);

  const renderTrainingComponent = () => {
    if (!trainingData) return null;

    switch (trainingData.type) {
      case "video":
        return (
          <TrainingVideo
            title={trainingData.name}
            description={trainingData.description || ""}
            videoUrl={trainingData.videoUrl}
            taskId={trainingData.taskId}
          />
        );
      case "text":
        return (
          <TrainingText
            content={{
              text1: trainingData.text1,
              text2: trainingData.text2,
              text3: trainingData.text3,
              title1: trainingData.title1,
              title2: trainingData.title2,
              title3: trainingData.title3,
              imageUrl1: trainingData.imageUrl1,
              imageUrl2: trainingData.imageUrl2,
            }}
            title={trainingData.name}
            description={trainingData.description || ""}
            taskId={trainingData.taskId}
          />
        );
      case "tips":
        return (
          <TrainingTips
            title={trainingData.name}
            description={trainingData.description || ""}
            content={{
              text1: trainingData.text1,
              text2: trainingData.text2,
              text3: trainingData.text3,
              title1: trainingData.title1,
              title2: trainingData.title2,
              title3: trainingData.title3,
              imageUrl1: trainingData.imageUrl1,
              imageUrl2: trainingData.imageUrl2,
            }}
            taskId={trainingData.taskId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <Container className="mb-40">
        <View className="px-2">{renderTrainingComponent()}</View>
      </Container>
    </ScrollView>
  );
}
