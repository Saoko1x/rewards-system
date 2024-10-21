import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "~/components/Container";
import { useColorScheme } from "~/lib/useColorScheme";
import { Text as TextUi } from "~/components/ui";
import PromotionCard from "~/components/info/PromotionCard";
import { usePromotions } from "~/server/query/promotions";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/server/db";
import { useProfile } from "~/hooks/useProfile";

export default function Promotion() {
  const { colorScheme } = useColorScheme();

  const {
    companyid,
    loading: profileLoading,
    error: profileError,
  } = useProfile();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [promotions, setPromotions] = useState<any[]>([]);

  useEffect(() => {
    if (companyid !== null) {
      fetchPromotions();
    }
  }, [companyid]);

  async function fetchPromotions() {
    try {
      const { data, error } = await supabase
        .from("Event")
        .select("*")
        .eq("companyId", companyid);

      if (error) {
        throw error;
      }

      if (data) {
        setPromotions(data);
        setFetchError(null);
      }
    } catch (error) {
      setFetchError("Error fetching promotions");
      setPromotions([]);
      console.error("Error fetching promotions", error);
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
        <TextUi className="text-2xl font-semibold my-4">Promotions</TextUi>
        {promotions?.map((promotion) => (
          <PromotionCard key={promotion.id} promotion={promotion} />
        ))}
      </Container>
    </ScrollView>
  );
}
