import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "~/components/Container";
import SystemHead from "~/components/dashboard/system/SystemHead";
import SystemSteps from "~/components/dashboard/system/SystemSteps";
import { supabase } from "~/server/db";
import { useProfile } from "~/hooks/useProfile";

export default function System() {
  const {
    companyid,
    loading: profileLoading,
    error: profileError,
  } = useProfile();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [weeks, setWeeks] = useState<any[]>([]);

  useEffect(() => {
    if (companyid !== null) {
      fetchSystemTasks();
    }
  }, [companyid]);

  async function fetchSystemTasks() {
    try {
      const { data, error } = await supabase
        .from("Week")
        .select("*")
        .eq("companyId", companyid);

      if (error) {
        throw error;
      }

      if (data) {
        setWeeks(data);
        setFetchError(null);
      }
    } catch (error) {
      setFetchError("Error fetching weeks");
      setWeeks([]);
      console.error("Error fetching weeks", error);
    }
  }

  return (
    <ScrollView>
      <Container>
        <View className="mt-4">
          <SystemHead />
          {weeks.map((week) => (
            <View key={week.id}>
              <SystemSteps data={week} />
            </View>
          ))}
        </View>
      </Container>
    </ScrollView>
  );
}
