import React from "react";
import { View } from "react-native";
import { Button, Text } from "~/components/ui";
import { Video, ResizeMode } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "~/server/db";

export default function SystemVideo({
  title,
  description,
  videoUrl,
}: {
  title: string;
  description: string;
  videoUrl: string;
}) {
  const videoSource = videoUrl;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
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
      <Text className="text-2xl my-4 text-blue-500">{title}</Text>

      <Text>{description}</Text>
      <View className="my-8 h-80">
        <Video
          source={{
            uri: videoSource,
          }}
          ref={video}
          style={{
            width: "100%",
            height: "100%",
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
      <Button onPress={handleComplete}>
        <Text>Continue</Text>
      </Button>
    </>
  );
}
