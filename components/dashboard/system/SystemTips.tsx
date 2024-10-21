import React from "react";
import { Button, Text } from "~/components/ui";
import { Image } from "expo-image";
import { screenWidth } from "react-native-gifted-charts/src/utils";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { supabase } from "~/server/db";

export default function SystemTips({
  title,
  content,
}: {
  title: string;
  description: string;
  content: {
    title1: string;
    text1: string;
    imageUrl1: string;
    title2: string;
    text2: string;
    imageUrl2: string;
    title3: string;
    text3: string;
  };
}) {
  const router = useRouter();
  const param = useLocalSearchParams() as { content: string };
  console.log(typeof param["content"]);
  const taskId = parseInt(param["content"]);
  console.log(typeof taskId);

  const handleComplete = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("userid", user.id)
      .single();

    if (profileError || !profile) {
      console.error("Error fetching profile:", profileError);
      return;
    }

    const { error } = await supabase
      .from("Task")
      .update({
        completedById: profile.id,
        completedAt: new Date().toISOString(),
        status: "completed",
      })
      .eq("id", taskId);

    if (error) {
      console.error("Error updating task:", error);
    } else {
      console.log("Task marked as completed");
      router.push("/dashboard/system");
    }
  };
  return (
    <>
      <Text className="text-2xl my-4 font-semibold text-blue-500">{title}</Text>
      <Image
        source={content.imageUrl1}
        contentFit="contain"
        style={{
          flex: 1,
          width: "100%",
          height: 200,
          marginVertical: 20,
        }}
      />
      <Text>{content.text1}</Text>
      <Text className="font-semibold text-2xl text-blue-500 my-4">
        {content.title1}
      </Text>
      <Text className="text-justify flex justify-start items-start">
        {content.text1}
      </Text>
      <Text className="font-semibold text-2xl text-blue-500 my-4">
        {content.title2}
      </Text>
      <Text className="text-justify flex justify-start items-start">
        {content.text2}
      </Text>
      <Text className="font-semibold text-2xl text-blue-500 my-4">
        {content.title3}
      </Text>
      <Text className="text-justify flex justify-start items-start">
        {content.text3}
      </Text>

      <Image
        source={content.imageUrl2}
        contentFit="contain"
        style={{
          flex: 1,
          width: screenWidth - 50,
          height: 200,
        }}
      />
      <Button onPress={handleComplete} className="mt-4 mb-12">
        <Text>Continue</Text>
      </Button>
    </>
  );
}
