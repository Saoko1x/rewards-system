import * as React from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import Dots from "./welcome/_components/Dots";
import { Badge, Button } from "~/components/ui";
import { useColorScheme } from "~/lib/useColorScheme";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "~/server/db";
import { Image } from "expo-image";
import { Text } from "~/components/ui/text";

export default function Screen() {
  const [loading, setLoading] = React.useState(false);
  // AUTH SESSION STARTS HERE
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  useEffect(() => {
    if (session) {
      router.push("/dashboard/home");
    }
  }, [session]);
  // AUTH SESSION ENDS HERE

  const [step, setStep] = React.useState(0);

  const texts = [
    "Teaching and learning are essential tools for growth",
    "Thanks to a collective effort, we can all achieve our individual objectives.",
    "We all have the capacity to positively change our environment.",
  ];

  const images = [
    require("~/assets/welcome/system-welcome.png"),
    require("~/assets/welcome/tasks-welcome.png"),
    require("~/assets/welcome/training-welcome.png"),
  ];

  const maxSteps = texts.length;

  const handleNext = () => {
    if (step < maxSteps - 1) {
      setStep(step + 1);
    } else {
      router.navigate("/welcome/signup");
    }
  };

  const { colorScheme } = useColorScheme();
  return (
    <View>
      {/* Animation Here */}

      <View style={{ backgroundColor: "#121212", height: "60%" }}>
        <Image
          source={images[step]}
          style={{
            width: "100%",
            height: "100%",

            zIndex: 2,
          }}
          contentFit='contain'
        />
        <Image
          source={require("~/assets/welcome/blurry-gradient.png")}
          style={{
            width: "100%",
            height: "100%",
            zIndex: 1,
            position: "absolute",
          }}
        />
      </View>

      {/* 3 section kind of slider here */}
      <View
        className='flex justify-between items-center pb-16'
        style={{ height: "40%" }}
      >
        <Dots steps={3} step={step} />

        <Badge variant='outline' style={{ width: 100 }}>
          <Text style={{ color: "gray", fontFamily: "MontserratSemiBold" }}>
            Step {step + 1}
          </Text>
        </Badge>

        <Text
          style={{
            color: colorScheme === "dark" ? "white" : "black",
            textAlign: "center",
            paddingHorizontal: 20,
            fontWeight: "400",
            fontSize: 20,
            padding: 18,
            fontFamily: "MontserratSemiBold",
          }}
        >
          {texts[step] ?? ""}
        </Text>

        <TouchableOpacity
          onPress={handleNext}
          className=' rounded-full   w-56 flex flex-row justify-center items-center h-12'
          style={{
            backgroundColor: "#2A74EC",
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "MontserratSemiBold",
              fontSize: 12,
            }}
          >
            {step < maxSteps - 1 ? "Next" : "Get Started"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
