import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useColorScheme } from "~/lib/useColorScheme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";

export default function JumpstartSteps() {
  const { colorScheme } = useColorScheme();

  const data = [
    {
      title: "Paso 1",
      dateTime: "Semana 1: Sept 14 - Sept 21 2024",
      steps: [
        {
          title: "Etiqueta a tu empresa",
          description: "¡Etiqueta a tu empresa en un reel de Instagram!",
          status: "completed",
          content: "video",
        },
        {
          title: "Invita a tus amigos",
          description: "¡Invita a tus amigos a unirse a Smart!",
          status: "pending",
          content: "material",
        },
        {
          title: "Comparte tus avances",
          description: "¡Comparte tus avances en tu historia de Instagram!",
          status: "soon",
          content: "lecture",
        },
      ],
    },
    {
      title: "Paso 2",
      dateTime: "Semana 2: Sept 22 - Sept 29 2024",
      steps: [
        {
          title: "Etiqueta a tu empresa",
          description: "¡Etiqueta a tu empresa en un reel de Instagram!",
          status: "completed",
          content: "video",
        },
        {
          title: "Invita a tus amigos",
          description: "¡Invita a tus amigos a unirse a Smart!",
          status: "pending",
          content: "material",
        },
        {
          title: "Comparte tus avances",
          description: "¡Comparte tus avances en tu historia de Instagram!",
          status: "soon",
          content: "lecture",
        },
      ],
    },
  ];
  return (
    <View className='mt-8'>
      {data.map((item, index) => (
        <View key={index} className='justify-between items-start my-4'>
          <Text className='text-lg mb-2 text-zinc-400'>{item.dateTime}</Text>
          <Text
            className='text-lg text-blue-500'
            style={{
              marginLeft: 5,
            }}
          >
            {item.title}
          </Text>
          <View className='px-2 mt-1'>
            {item.steps.map((step, index) => (
              <TouchableOpacity
                onPress={() => {
                  if (step.content === "video") {
                    router.navigate("/system/video");
                  } else if (step.content === "material") {
                    router.navigate("/system/material");
                  } else if (step.content === "lecture") {
                    router.navigate("/system/lecture");
                  }
                }}
                key={index}
              >
                <View
                  className='flex-row items-center justify-center mb-4 rounded-3xl p-6'
                  style={{
                    width: "100%",
                    backgroundColor:
                      colorScheme === "dark" ? "#232323" : "#f9f9f9",
                  }}
                >
                  <View
                    className='w-14 h-14 rounded-full mr-4 items-center justify-center'
                    style={{
                      backgroundColor:
                        step.status === "completed"
                          ? "#50DC98"
                          : step.status === "pending"
                            ? "#FFC107"
                            : "#aaa",
                    }}
                  >
                    <Ionicons
                      name={
                        step.status === "completed"
                          ? "checkmark"
                          : step.status === "pending"
                            ? "hourglass-outline"
                            : "ellipsis-horizontal-circle-outline"
                      }
                      size={24}
                      color='white'
                    />
                  </View>
                  <View className='flex-1'>
                    <Text
                      className='font-bold'
                      style={{
                        color: colorScheme === "dark" ? "#fff" : "#000",
                      }}
                    >
                      {step.title}
                    </Text>
                    <Text
                      className='font-light'
                      style={{
                        color: colorScheme === "dark" ? "#fff" : "#000",
                      }}
                    >
                      {step.description}
                    </Text>
                  </View>
                  {/* Status bar */}
                  <View
                    style={{
                      backgroundColor:
                        step.status === "completed"
                          ? "#50DC98"
                          : step.status === "pending"
                            ? "#FFC107"
                            : "#aaa",
                      width: 100,
                    }}
                    className='ml-auto px-2 py-2 rounded-lg items-center justify-center'
                  >
                    <Text
                      style={{
                        color: colorScheme === "dark" ? "#fff" : "#000",
                      }}
                    >
                      {step.status === "completed"
                        ? "Completado"
                        : step.status === "pending"
                          ? "Pendiente"
                          : "Pronto"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
