import React from "react";
import { usePathname, useRouter } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AvatarHeader } from "~/components/headers";
import { Text } from "~/components/ui";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "~/server/db";
import { Session } from "@supabase/supabase-js";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const redirectFunc = (href: string) => {
    router.navigate(href);
  };

  console.log("🚀 ~ AppLayout ~ pathname:", pathname);

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/welcome/login" />;
  }

  return (
    <Tabs initialRouteName="/dashboard/home">
      <Tabs.Screen
        name="home"
        options={{
          header: () => <></>,
          title: "Home",
          tabBarButton: () => (
            <Container
              redirectFunc={redirectFunc}
              href="/dashboard/home"
              children={
                <View className="items-center justify-center">
                  <Ionicons
                    name={
                      pathname === "/dashboard/home" ? "home" : "home-outline"
                    }
                    size={24}
                    color="#2f5bb6"
                  />
                  <Text
                    style={{
                      color: "#2f5bb6",
                      fontSize: 8,
                      lineHeight: 12,
                    }}
                  >
                    Home
                  </Text>
                </View>
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(system)"
        options={{
          header: () => (
            <AvatarHeader name="System" redirectFunc={redirectFunc} />
          ),
          title: "System",
          tabBarButton: () => (
            <Container
              redirectFunc={redirectFunc}
              href="/dashboard/system"
              children={
                <View className="items-center justify-center">
                  <Ionicons
                    name={
                      pathname === "/dashboard/system" ||
                      pathname === "/dashboard/system-progress"
                        ? "speedometer"
                        : "speedometer-outline"
                    }
                    size={24}
                    color="#2f5bb6"
                  />
                  <Text
                    style={{
                      color: "#2f5bb6",
                      fontSize: 8,
                      lineHeight: 12,
                    }}
                  >
                    System
                  </Text>
                </View>
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(jumpstart)"
        options={{
          header: () => (
            <AvatarHeader
              name="Boost your business"
              redirectFunc={redirectFunc}
            />
          ),
          title: "Jumpstart your business",
          tabBarButton: () => (
            <Container
              redirectFunc={redirectFunc}
              href="/dashboard/jumpstart"
              children={
                <View className="items-center justify-center">
                  <Ionicons
                    name={
                      pathname === "/dashboard/jumpstart" ||
                      pathname === "/dashboard/jumpstart-progress"
                        ? "rocket"
                        : "rocket-outline"
                    }
                    size={24}
                    color="#2f5bb6"
                  />
                  <Text
                    style={{
                      color: "#2f5bb6",
                      fontSize: 8,
                      lineHeight: 12,
                    }}
                  >
                    Boost
                  </Text>
                </View>
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(training)"
        options={{
          header: () => (
            <AvatarHeader name="Training" redirectFunc={redirectFunc} />
          ),
          title: "Training",
          tabBarButton: () => (
            <Container
              redirectFunc={redirectFunc}
              href="/dashboard/training"
              children={
                <View className="items-center justify-center">
                  <Ionicons
                    name={
                      pathname === "/dashboard/training" ||
                      pathname === "/dashboard/training-progress"
                        ? "book"
                        : "book-outline"
                    }
                    size={24}
                    color="#2f5bb6"
                  />
                  <Text
                    style={{
                      color: "#2f5bb6",
                      fontSize: 8,
                      lineHeight: 12,
                    }}
                  >
                    Training
                  </Text>
                </View>
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(analysis)"
        options={{
          header: () => (
            <AvatarHeader name="Analytics" redirectFunc={redirectFunc} />
          ),
          title: "Training",
          tabBarButton: () => (
            <Container
              redirectFunc={redirectFunc}
              href="/dashboard/(analysis)"
              children={
                <View className="items-center justify-center">
                  <Ionicons
                    name={
                      pathname === "/dashboard/analysis-yearly" ||
                      pathname === "/dashboard/analysis-monthly" ||
                      pathname === "/dashboard/analysis-weekly"
                        ? "bar-chart"
                        : "bar-chart-outline"
                    }
                    size={24}
                    color="#2f5bb6"
                  />
                  <Text
                    style={{
                      color: "#2f5bb6",
                      fontSize: 8,
                      lineHeight: 12,
                    }}
                  >
                    Analytics
                  </Text>
                </View>
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          header: () => (
            <AvatarHeader name="AI Chat" redirectFunc={redirectFunc} />
          ),
          title: "Chat",
          tabBarButton: () => (
            <Container
              redirectFunc={redirectFunc}
              href="/dashboard/chat"
              children={
                <View className="items-center justify-center">
                  <Ionicons
                    name={
                      pathname === "/dashboard/chat"
                        ? "sparkles"
                        : "sparkles-outline"
                    }
                    size={24}
                    color="#2f5bb6"
                  />
                  <Text
                    className="text-xs"
                    style={{
                      color: "#2f5bb6",
                      fontSize: 8,
                      lineHeight: 12,
                    }}
                  >
                    Chat
                  </Text>
                </View>
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}

const Container = ({
  children,
  redirectFunc,
  href,
}: {
  children: React.ReactNode;
  redirectFunc: (href: string) => void;
  href: string;
}) => {
  return (
    <TouchableOpacity
      className={`flex flex-1 justify-center items-center `}
      onPress={() => redirectFunc(href)}
    >
      {children}
    </TouchableOpacity>
  );
};
