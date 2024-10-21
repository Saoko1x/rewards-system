import {
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "~/components/ui";
import Container from "~/components/Container";
import { useColorScheme } from "~/lib/useColorScheme";
import Ionicons from "react-native-vector-icons/Ionicons";
import InputWithIcons from "~/components/InputWithIcon";
import VerifiedButton from "~/components/VerifiedButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Session } from "@supabase/supabase-js";
import { supabase } from "~/server/db";
import { router } from "expo-router";

export default function Profile() {
  const [session, setSession] = useState<Session | null>(null);

  const { colorScheme } = useColorScheme();
  const [genre, setGenre] = useState("Male");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    console.log(session);
  }, []);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(
          `id, userid, first_name, last_name, username, phone, birthdate, genre`
        )
        .eq("userid", session?.user.id)
        .single();

      if (error && status !== 406) {
        console.log({ error });
        throw error;
      }

      if (data) {
        console.log(data);
        setEmail(data.username);
        setName(data.first_name);
        setLastName(data.last_name);
        setPhone(data.phone);
        setDateOfBirth(data.birthdate);
        setGenre(data.genre);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      console.log(session?.user.id);

      const { data, error: selectError } = await supabase
        .from("profiles")
        .select("*")
        .eq("userid", session?.user.id)
        .single();

      if (selectError) throw selectError;

      if (!data) throw new Error("No profile found for this user");

      const updates = {
        id: data.id,
        userid: session?.user.id,
        first_name: name || data.first_name,
        last_name: lastName || data.last_name,
        genre: genre || data.genre,
        phone: phone || data.phone,
        birthdate: dateOfBirth || data.birthdate,
        updated_at: new Date().toISOString(),
      };

      console.log("Updates to be applied:", updates);

      const { error: upsertError } = await supabase
        .from("profiles")
        .upsert(updates);

      if (upsertError) {
        throw upsertError;
      }
      console.log("Profile updated successfully!");
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating profile:", error.message);
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: { type: any }, selectedDate: any) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatepicker();
    }
  };

  const confirmIOSDate = () => {
    toggleDatepicker();
    setDateOfBirth(date.toDateString());
  };

  return (
    <KeyboardAwareScrollView>
      <Container>
        {/* Avatar */}
        <View className="items-center justify-center my-10">
          <View className="items-end justify-end">
            <Avatar alt="Avatar" className="h-20 w-20">
              <AvatarImage
                source={{
                  uri: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
                }}
              />
              <AvatarFallback>
                <Text>Avatar</Text>
              </AvatarFallback>
            </Avatar>
            <View className="bg-white w-8 h-8 rounded-full absolute items-center justify-center">
              <Ionicons
                name="camera-outline"
                size={24}
                color={colorScheme === "dark" ? "#9B9B9B" : "#9B9B9B"}
              />
            </View>
          </View>
          <VerifiedButton />
        </View>
        {/* Forms */}
        <View className="flex-row mb-4">
          <View
            style={{
              width: "49%",
            }}
          >
            <InputWithIcons
              placeholder="Name"
              leftIcon="person-outline"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View
            style={{
              width: "2%",
            }}
          />
          <View
            style={{
              width: "49%",
            }}
          >
            <InputWithIcons
              placeholder="Last name"
              leftIcon="person-outline"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>
        <View className="mb-4">
          <InputWithIcons
            placeholder="Email"
            leftIcon="mail-outline"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className="mb-4">
          <InputWithIcons
            placeholder="Phone number"
            leftIcon="call-outline"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
          />
        </View>
        {/* Fecha de nacimiento */}
        <View className="mb-4">
          <View
            style={{
              width: "100%",
              backgroundColor: colorScheme === "dark" ? "#141414" : "#f1f1f1",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colorScheme === "dark" ? "#2a2a2a" : "#ccc",
              padding: 10,
            }}
          >
            <View className="flex-row gap-2">
              <Ionicons name="calendar-outline" size={24} color="gray" />
              <View>
                {showPicker && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChange}
                    themeVariant={colorScheme}
                    style={{
                      height: 120,
                      marginTop: 10,
                    }}
                  />
                )}

                {/* ios */}
                {showPicker && Platform.OS === "ios" && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      className="p-2"
                      onPress={toggleDatepicker}
                    >
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2" onPress={confirmIOSDate}>
                      <Text>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {!showPicker && (
                <TouchableOpacity onPress={toggleDatepicker}>
                  <TextInput
                    style={{
                      color: colorScheme === "dark" ? "white" : "black",
                      opacity: 0.7,
                      flex: 1,
                      fontFamily: "MontserratRegular",
                      borderWidth: 0,
                      width: "100%",
                    }}
                    placeholder="Birth date         "
                    placeholderTextColor={
                      colorScheme === "dark" ? "white" : "black"
                    }
                    value={dateOfBirth}
                    onChangeText={setDateOfBirth}
                    onPressIn={toggleDatepicker}
                    editable={false}
                    onTouchEnd={toggleDatepicker}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <View className="mb-4">
          <View
            className="p-4"
            style={{
              width: "100%",
              backgroundColor: colorScheme === "dark" ? "#141414" : "#f1f1f1",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colorScheme === "dark" ? "#2a2a2a" : "#ccc",
            }}
          >
            <View className="flex-row gap-2">
              <Ionicons name="person-outline" size={24} color="gray" />
              <TouchableOpacity className="flex-1">
                <RNPickerSelect
                  onValueChange={(value) => setGenre(value)}
                  items={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Other", value: "Other" },
                  ]}
                  placeholder={{}}
                >
                  <TextInput
                    style={{
                      color: colorScheme === "dark" ? "white" : "black",
                      opacity: 0.7,
                      fontFamily: "MontserratRegular",
                      borderWidth: 0,
                      width: "100%",
                    }}
                    placeholder="Gender"
                    placeholderTextColor={
                      colorScheme === "dark" ? "white" : "black"
                    }
                    value={genre}
                    editable={false}
                  />
                </RNPickerSelect>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Save button */}
        <View className="mb-4">
          <Button
            variant="outline"
            style={{
              backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
            }}
            onPress={updateProfile}
          >
            <Text>Save</Text>
          </Button>
        </View>
        {/* Save button */}

        {session && session.user ? (
          <Button
            className="rounded-full border border-red-600 "
            style={{
              backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
            }}
            onPress={() => {
              supabase.auth.signOut();
              router.navigate("/");
            }}
          >
            <Text className="text-red-600">Logout</Text>
          </Button>
        ) : null}
      </Container>
    </KeyboardAwareScrollView>
  );
}
