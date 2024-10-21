import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import ToggleButton from "../../components/configuration/togglebutton";
import { useColorScheme } from "~/lib/useColorScheme";
import { Button } from "~/components/ui";
import VerifiedButton from "~/components/VerifiedButton";
import AvatarLink from "~/components/AvatarLink";
import Container from "~/components/Container";

const SettingsScreen = () => {
  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor:
            useColorScheme().colorScheme === "dark" ? "black" : "white",
        },
      ]}
    >
      <Container className="mb-16">
        <View className="items-center justify-center mb-4">
          <AvatarLink
            style={{
              width: 80,
              height: 80,
            }}
            imageStyle={{
              width: 80,
              height: 80,
            }}
          />
          <VerifiedButton />
        </View>
        <Text
          style={[
            styles.sectionTitle,
            {
              color:
                useColorScheme().colorScheme === "dark" ? "white" : "black",
            },
          ]}
        >
          Configuration
        </Text>

        <InviteCard />

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionLabel,
              {
                color:
                  useColorScheme().colorScheme === "dark" ? "white" : "black",
              },
            ]}
          >
            Account and security
          </Text>
          {[
            {
              name: "Profile",
              href: "/configuration/profile",
              icon: "person-outline",
            },
            {
              name: "Security",
              href: "/security/home",
              icon: "lock-closed-outline",
            },
          ].map((item) => (
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => {
                router.navigate(item.href);
              }}
              key={item.name}
            >
              <Ionicons
                // @ts-ignore
                name={item.icon}
                size={28}
                color={
                  useColorScheme().colorScheme === "dark" ? "white" : "black"
                }
              />
              <Text
                style={[
                  styles.settingLabel,
                  {
                    color:
                      useColorScheme().colorScheme === "dark"
                        ? "white"
                        : "black",
                  },
                ]}
              >
                {item.name}
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={28}
                color={
                  useColorScheme().colorScheme === "dark" ? "white" : "black"
                }
              />
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={[
            styles.separator,
            {
              backgroundColor:
                useColorScheme().colorScheme === "dark" ? "gray" : "lightgray",
            },
          ]}
        />
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionLabel,
              {
                color:
                  useColorScheme().colorScheme === "dark" ? "white" : "black",
              },
            ]}
          >
            Preferences
          </Text>
          {[
            {
              name: "Country",
              href: "/configuration/country",
              icon: "globe-outline",
            },
            {
              name: "Notifications",
              href: "/configuration/notifications",
              icon: "notifications-outline",
            },
            {
              name: "Language",
              href: "/configuration/lenguages",
              icon: "language-outline",
            },
            {
              name: "Accessibility",
              href: "/configuration/accesibility",
              icon: "accessibility-outline",
            },
          ].map((item) => (
            <TouchableOpacity
              onPress={() => {
                router.navigate(item.href);
              }}
              style={styles.settingItem}
              key={item.name}
            >
              <Ionicons
                // @ts-ignore
                name={item.icon}
                size={28}
                color={
                  useColorScheme().colorScheme === "dark" ? "white" : "black"
                }
              />
              <Text
                style={[
                  styles.settingLabel,
                  {
                    color:
                      useColorScheme().colorScheme === "dark"
                        ? "white"
                        : "black",
                  },
                ]}
              >
                {item.name}
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={28}
                color={
                  useColorScheme().colorScheme === "dark" ? "white" : "black"
                }
              />
            </TouchableOpacity>
          ))}

          <View style={styles.settingItem}>
            <Ionicons
              name="moon-outline"
              size={28}
              color={
                useColorScheme().colorScheme === "dark" ? "white" : "black"
              }
            />
            <Text
              style={[
                styles.settingLabel,
                {
                  color:
                    useColorScheme().colorScheme === "dark" ? "white" : "black",
                },
              ]}
            >
              Dark mode
            </Text>
            <ToggleButton
              initialValue={useColorScheme().colorScheme === "dark"}
              onValueChange={useColorScheme().toggleColorScheme}
            />
          </View>
        </View>
        <View
          style={[
            styles.separator,
            {
              backgroundColor:
                useColorScheme().colorScheme === "dark" ? "gray" : "lightgray",
            },
          ]}
        />
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionLabel,
              {
                color:
                  useColorScheme().colorScheme === "dark" ? "white" : "black",
              },
            ]}
          >
            Support
          </Text>
          {[
            {
              name: "About",
              href: "/configuration/about",
              icon: "information-circle-outline",
            },
            {
              name: "Help",
              href: "/configuration/help",
              icon: "alert-circle-outline",
            },
            {
              name: "Terms and Conditions",
              href: "/configuration/terms",
              icon: "reader-outline",
            },
          ].map((item) => (
            <TouchableOpacity
              onPress={() => {
                router.navigate(item.href);
              }}
              style={styles.settingItem}
              key={item.name}
            >
              <Ionicons
                // @ts-ignore
                name={item.icon}
                size={28}
                color={
                  useColorScheme().colorScheme === "dark" ? "white" : "black"
                }
              />
              <Text
                style={[
                  styles.settingLabel,
                  {
                    color:
                      useColorScheme().colorScheme === "dark"
                        ? "white"
                        : "black",
                  },
                ]}
              >
                {item.name}
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={28}
                color={
                  useColorScheme().colorScheme === "dark" ? "white" : "black"
                }
              />
            </TouchableOpacity>
          ))}
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  avatarContainer: {
    marginBottom: 5,
    alignItems: "center",
    position: "relative",
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  section: {
    marginBottom: 8,
    padding: 16,
    borderRadius: 8,
  },
  separator: {
    height: 1,
    marginVertical: 8,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  settingLabel: {
    flex: 1,
    marginLeft: 8,
  },
  sectionCard: {
    flex: 1,
    marginLeft: 8,
  },
  settingItemLast: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 26,
  },
});

export default SettingsScreen;

const InviteCard = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View
      className="w-[95%] p-4 rounded-2xl mt-6"
      style={[
        styles.sectionCard,
        {
          backgroundColor: "#79A8F4",
        },
      ]}
    >
      <Image
        source={require("~/assets/images/coronitas.png")}
        style={{
          width: 140,
          height: 140,
          position: "absolute",
          left: 193,
          top: 1,
        }}
      />
      <View style={{ position: "relative" }}>
        <Text
          style={{
            fontSize: 20,
            color: useColorScheme().colorScheme === "dark" ? "black" : "white",
            fontFamily: "MontserratSemiBold",
          }}
        >
          Invite your friends
        </Text>

        <Image
          source={require("~/assets/images/coronita.png")}
          style={{
            width: 23,
            height: 23,
            position: "absolute",
            left: -12,
            top: -6.6,
            tintColor:
              useColorScheme().colorScheme === "dark" ? undefined : "white",
          }}
        />
      </View>
      <View className="flex-row items-center justify-between mt-3">
        <Text
          className="w-full text-white"
          style={{
            fontFamily: "MontserratRegular",
            color: useColorScheme().colorScheme === "dark" ? "black" : "white",
          }}
        >
          Use your invitation link to invite your friends to join the platform.
        </Text>
      </View>
      <View className="flex-row justify-between items-center mt-4">
        <Button
          className="w-1/3 border-solid border-4 "
          style={{
            backgroundColor: colorScheme === "dark" ? "#2E67C2" : "#fafafa",
            borderColor: "#FFFFFF40",
          }}
        >
          <Text
            className="h-5"
            style={{
              fontFamily: "MontserratRegular",
              color: colorScheme === "dark" ? "white" : "#232323",
            }}
          >
            Invite
          </Text>
        </Button>
      </View>
    </View>
  );
};
