import React, { useEffect, useState } from "react";
import { Image } from "expo-image";

import Container from "~/components/Container";
import { ScrollView } from "react-native";

import { useColorScheme } from "~/lib/useColorScheme";

import Head from "~/components/dashboard/index/Head";
import ProgressCallToAction from "~/components/dashboard/index/ProgressCallToAction";
import Chart from "~/components/dashboard/index/Chart";
import CompletedAndUncompleted from "~/components/dashboard/index/CompletedAndUncompleted";
import Tasks from "~/components/dashboard/index/Tasks";
import ActionButtons from "~/components/dashboard/index/ActionButtons";
import { fetchAllTasks } from "~/server/query/allTasks";
import { useProfile } from "~/hooks/useProfile";

export default function Index() {
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    incomplete: { count: 0, tasks: {} },
  });
  const { colorScheme } = useColorScheme();
  const {
    companyid,
    loading: profileLoading,
    error: profileError,
  } = useProfile();

  useEffect(() => {
    const loadTaskStats = async () => {
      try {
        // Asume que tienes acceso al companyId, si no, necesitarás obtenerlo de alguna manera
        const stats = await fetchAllTasks(companyid!);
        setTaskStats(stats);
      } catch (error) {
        console.error("Error loading task stats:", error);
      }
    };

    loadTaskStats();
  }, [companyid]);

  return (
    <ScrollView
      className="z-50 overflow-y-hidden"
      style={{ backgroundColor: colorScheme === "dark" ? "black" : "#fafafa" }}
    >
      <Image
        source={require("~/assets/dashboard/bg.png")}
        style={{ height: 300, objectFit: "contain", marginBottom: -350 }}
      />
      <Container className="mt-28">
        <Head />
        <ProgressCallToAction />
        <Chart done={taskStats.completed} total={taskStats.total} />
        <CompletedAndUncompleted
          done={taskStats.completed}
          total={taskStats.total}
        />
        <Tasks />
        <ActionButtons />
      </Container>
    </ScrollView>
  );
}
