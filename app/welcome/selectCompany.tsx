import { useEffect, useState } from "react";
import Container from "~/components/Container";
import { Button, SelectItem, Text } from "~/components/ui";
import { Alert, View } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";
import { supabase } from "~/server/db";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "~/components/ui";
import { Session } from "@supabase/supabase-js";

export default function Questions() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const [companies, setCompanies] = useState<any>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [companyid, setcompanyid] = useState<any>();

  const { colorScheme } = useColorScheme();

  const handleNext = () => {
    updateProfile({
      companyid: companyid,
    });
    router.navigate("/welcome/questions");
    return;
  };

  useEffect(() => {
    const fetchCompanys = async () => {
      const { data, error } = await supabase.from("Company").select("*");
      if (error) {
        setFetchError("Error fetching companys");
        setCompanies(null);
        console.error("Error fetching companys", error);
      }
      if (data) {
        setCompanies(data);
        setFetchError(null);
      }
    };

    fetchCompanys();
  }, []);

  async function updateProfile({ companyid }: { companyid: number }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const userId = session.user.id;
      console.log("User ID:", userId);
      console.log("Company ID:", companyid);

      const { error } = await supabase
        .from("profiles")
        .update({ companyid: companyid })
        .eq("userid", userId);

      if (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
      console.log("Company updated successfully!");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <View className="flex-col gap-4 mt-8">
        <Text
          className={` ${
            colorScheme === "dark"
              ? "text-zinc-200 text-center border-0"
              : "text-zinc-700 text-center border-0"
          }`}
          style={{ fontFamily: "MontserratRegular" }}
        >
          Watch out! This question will only be shown once so be careful with
          your answer.
        </Text>
        <Text
          className="text-3xl font-bold mt-8 text-center"
          style={{ fontFamily: "MontserratSemiBold" }}
        >
          Which company are you applying for?
        </Text>

        <Select defaultValue={{ value: "gomastery", label: "GoMastery" }}>
          <SelectTrigger className="w-[250px]">
            <SelectValue
              className="text-foreground text-sm native:text-lg"
              placeholder="Select a company"
            />
          </SelectTrigger>
          <SelectContent>
            {fetchError && <Text>{fetchError}</Text>}
            {companies && (
              <SelectGroup>
                {companies.map((company: any) => (
                  <SelectItem
                    key={company.id}
                    value={company}
                    label={company.name}
                    onPress={() => {
                      setcompanyid(company.id);
                    }}
                  />
                ))}
              </SelectGroup>
            )}
          </SelectContent>
        </Select>

        <Button
          className="mt-4"
          onPress={() => {
            handleNext();
          }}
        >
          <Text style={{ fontFamily: "MontserratSemiBold" }}>Continue</Text>
        </Button>
      </View>
    </Container>
  );
}
