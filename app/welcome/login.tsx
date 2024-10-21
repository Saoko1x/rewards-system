import { Alert, View, TouchableWithoutFeedback } from "react-native";
import React, { useEffect } from "react";
import { Button, Checkbox, Input, Text } from "~/components/ui";
import Container from "~/components/Container";

import { useState } from "react";
import { supabase } from "~/server/db";
import { Link, router } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";
import { Session } from "@supabase/supabase-js";

export default function Login() {
  const { colorScheme } = useColorScheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [checked, setChecked] = useState(false);

  const redirectFunc = (href: string) => {
    router.navigate(href);
  };

  async function signInWithEmail() {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);

    if (data.session?.user) {
      redirectFunc("/welcome/selectCompany");
    }
    setLoading(false);
  }

  // AUTH SESSION STARTS HERE
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  useEffect(() => {
    if (session) {
      router.push("/dashboard/home");
    }
  }, [session]);
  // AUTH SESSION ENDS HERE

  return (
    <Container>
      {/* Header */}
      <Text
        className="text-3xl font- mt-8 "
        style={{ fontFamily: "MontserratSemiBold" }}
      >
        Login
      </Text>
      <Text
        className={`tracking-wide mt-2 ${
          colorScheme === "dark" ? "text-zinc-500" : "text-zinc-600"
        }`}
        style={{ fontFamily: "MontserratRegular" }}
      >
        Fill in all the fields and submit the form to log in to the application.
      </Text>

      {/* Form */}
      <View className="flex-col flex gap-6 mt-8">
        <Input
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoComplete="email"
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          autoComplete="password"
        />
        <View className="flex-row justify-between mt-4">
          <Link href={"/welcome/passwordReset"}>
            <Text style={{ fontFamily: "MontserratRegular" }}>
              Forgot your password?
            </Text>
          </Link>
        </View>

        <Button onPress={signInWithEmail} disabled={loading} className="mt-4">
          <Text style={{ fontFamily: "MontserratSemiBold" }}>Login</Text>
        </Button>
      </View>

      {/* Link */}
      <View className=" flex-row gap-2 mt-8 justify-center">
        <Text
          className="text-zinc-500"
          style={{ fontFamily: "MontserratRegular" }}
        >
          Don't have an account?
        </Text>

        <Link href={"/welcome/signup"}>
          <Text style={{ fontFamily: "MontserratSemiBold" }}>Sign up</Text>
        </Link>
      </View>
    </Container>
  );
}
