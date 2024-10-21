import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Container from "~/components/Container";
import JumpstartVideo from "~/components/dashboard/jumpstart/templates/JumpstartVideo";
import JumpstartText from "~/components/dashboard/jumpstart/templates/JumpstartText";
import JumpstartTips from "~/components/dashboard/jumpstart/templates/JumpstartTips";

export default function Learn() {
  const { taskDetails, taskType } = useLocalSearchParams();
  const [jumpstartData, setJumpstartData] = useState<any>(null);
  console.log(taskDetails);

  useEffect(() => {
    if (taskDetails && taskType) {
      const parsedDetails = JSON.parse(taskDetails as string);
      setJumpstartData({
        ...parsedDetails,
        type: taskType,
      });
    }
  }, [taskDetails, taskType]);

  const renderTrainingComponent = () => {
    if (!jumpstartData) return null;

    switch (jumpstartData.type) {
      case "video":
        return (
          <JumpstartVideo
            title={jumpstartData.name}
            description={jumpstartData.description || ""}
            videoUrl={jumpstartData.videoUrl}
            taskId={jumpstartData.taskId}
          />
        );
      case "text":
        return (
          <JumpstartText
            content={{
              text1: jumpstartData.text1,
              text2: jumpstartData.text2,
              text3: jumpstartData.text3,
              title1: jumpstartData.title1,
              title2: jumpstartData.title2,
              title3: jumpstartData.title3,
              imageUrl1: jumpstartData.imageUrl1,
              imageUrl2: jumpstartData.imageUrl2,
            }}
            title={jumpstartData.name}
            description={jumpstartData.description || ""}
            taskId={jumpstartData.taskId}
          />
        );
      case "tips":
        return (
          <JumpstartTips
            title={jumpstartData.name}
            description={jumpstartData.description || ""}
            content={{
              text1: jumpstartData.text1,
              text2: jumpstartData.text2,
              text3: jumpstartData.text3,
              title1: jumpstartData.title1,
              title2: jumpstartData.title2,
              title3: jumpstartData.title3,
              imageUrl1: jumpstartData.imageUrl1,
              imageUrl2: jumpstartData.imageUrl2,
            }}
            taskId={jumpstartData.taskId}
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
