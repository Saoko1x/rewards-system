import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "~/components/Container";
import { useColorScheme } from "~/lib/useColorScheme";
import { Text as TextUi } from "~/components/ui";
import NewsCard from "~/components/info/NewsCard";
import { supabase } from "~/server/db";
import { useProfile } from "~/hooks/useProfile";

export default function News() {
  const {
    companyid,
    loading: profileLoading,
    error: profileError,
  } = useProfile();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [news, setNews] = useState<any[]>([]);

  const { colorScheme } = useColorScheme();

  useEffect(() => {
    if (companyid !== null) {
      fetchNews();
    }
  }, [companyid]);

  async function fetchNews() {
    try {
      const { data, error } = await supabase
        .from("Event")
        .select("*")
        .eq("companyId", companyid);

      if (error) {
        throw error;
      }

      if (data) {
        setNews(data);
        setFetchError(null);
      }
    } catch (error) {
      setFetchError("Error fetching news");
      setNews([]);
      console.error("Error fetching news", error);
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
        <TextUi className="text-2xl font-semibold my-4">News</TextUi>
        <View>
          {fetchError && <TextUi>{fetchError}</TextUi>}
          {news.length > 0 && (
            <View>
              {news.map((newsItem: any) => (
                <NewsCard key={newsItem.id} news={newsItem} />
              ))}
            </View>
          )}
        </View>
      </Container>
    </ScrollView>
  );
}
