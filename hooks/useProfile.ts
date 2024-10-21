import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { supabase } from "~/server/db";
import { Session } from "@supabase/supabase-js";

export const useProfile = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [companyid, setcompanyid] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<number | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      setError(null);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select("companyid, id")
        .eq("userid", session.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setcompanyid(data.companyid);
        setProfileId(data.id);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }

  return { session, companyid, loading, error, profileId };
};
