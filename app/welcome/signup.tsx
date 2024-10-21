import { Alert, View } from "react-native";
import { Button, Input, Text } from "~/components/ui";
import Container from "~/components/Container";
import { supabase } from "~/server/db";
import { Link, router } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

export default function SignUp() {
  const { colorScheme } = useColorScheme();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      phone: phone,
    });

    if (error) Alert.alert(error.message);
    else if (!session)
      Alert.alert("Please check your inbox for email verification!");

    setLoading(false);

    if (!session?.user) {
      router.navigate("/welcome/login");
    }
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
      <Text
        className="text-3xl font- mt-8"
        style={{ fontFamily: "MontserratSemiBold" }}
      >
        Let's start
      </Text>
      <Text
        className={`tracking-wide mt-2 ${
          colorScheme === "dark" ? "text-zinc-500" : "text-zinc-600"
        }`}
      >
        Fill in all required fields* and submit the form to register in the
        application.
      </Text>
      <View className="flex-col flex gap-6 mt-8">
        <Input
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoComplete="email"
        />
        <Input
          placeholder="Phone number"
          onChangeText={(text) => setPhone(text)}
          keyboardType="phone-pad"
          autoComplete="tel-device"
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          autoComplete="password-new"
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Confirm password"
          secureTextEntry={true}
          autoComplete="off"
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <Button onPress={signUpWithEmail} disabled={loading} className="mt-4">
          <Text style={{ fontFamily: "MontserratSemiBold" }}>Sign up</Text>
        </Button>
      </View>
      <View className=" flex-row gap-2 mt-8 justify-center">
        <Text
          className="text-zinc-500"
          style={{ fontFamily: "MontserratRegular" }}
        >
          Already have an account?
        </Text>
        <Link href={"/welcome/login"}>
          <Text style={{ fontFamily: "MontserratSemiBold" }}>Login</Text>
        </Link>
      </View>
    </Container>
  );
}
