import { View, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "~/components/Container";
import MaterialCard from "~/components/dashboard/training/MaterialCard";
import { useProfile } from "~/hooks/useProfile";
import { supabase } from "~/server/db";
import { Text } from "~/components/ui";

export default function Material() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchTraining().then(() => {
      setRefreshing(false);
    });
  }, []);

  const {
    companyid,
    loading: profileLoading,
    error: profileError,
  } = useProfile();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [trainings, setTrainings] = useState<any[]>([]);

  useEffect(() => {
    if (companyid !== null) {
      fetchTraining();
    }
  }, [companyid]);

  async function fetchTraining() {
    try {
      const { data, error } = await supabase
        .from("Training")
        .select("*")
        .eq("companyId", companyid);

      if (error) {
        throw error;
      }

      if (data) {
        setTrainings(data);
        console.log("log de trainings", data);
        setFetchError(null);
      }
    } catch (error) {
      setFetchError("Error fetching trainings");
      setTrainings([]);
      console.error("Error fetching trainings", error);
    } finally {
      return;
    }
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Container>
        <View>
          <Text className="flex text-2xl my-4 font-semibold">Courses</Text>
          {trainings.map((course) => (
            <View key={course.id}>
              <MaterialCard data={course} />
            </View>
          ))}
        </View>
      </Container>
    </ScrollView>
  );
}
