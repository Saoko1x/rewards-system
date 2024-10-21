import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "~/components/Container";
import { useColorScheme } from "~/lib/useColorScheme";
import { Text as TextUi } from "~/components/ui";
import EventsCard from "~/components/info/EventsCard";
import { supabase } from "~/server/db";
import { useProfile } from "~/hooks/useProfile"; // Asegúrate de ajustar la ruta de importación según tu estructura de archivos

export default function Events() {
  const {
    companyid,
    loading: profileLoading,
    error: profileError,
  } = useProfile();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);

  const { colorScheme } = useColorScheme();

  useEffect(() => {
    if (companyid !== null) {
      fetchEvents();
    }
  }, [companyid]);

  async function fetchEvents() {
    try {
      const { data, error } = await supabase
        .from("Event")
        .select("*")
        .eq("companyId", companyid);

      if (error) {
        throw error;
      }

      if (data) {
        setEvents(data);
        setFetchError(null);
      }
    } catch (error) {
      setFetchError("Error fetching events");
      setEvents([]);
      console.error("Error fetching events", error);
    }
  }

  if (profileLoading) {
    return <TextUi>Loading profile...</TextUi>;
  }

  if (profileError) {
    return <TextUi>Error loading profile: {profileError}</TextUi>;
  }

  return (
    <ScrollView>
      <Container>
        <View>
          {fetchError && <TextUi>{fetchError}</TextUi>}
          {events.length > 0 && (
            <View>
              {events.map((event: any) => (
                <EventsCard key={event.id} event={event} />
              ))}
            </View>
          )}
        </View>
      </Container>
    </ScrollView>
  );
}
