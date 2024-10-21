import {
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { Text } from "~/components/ui";
import { Ionicons } from "@expo/vector-icons";
import Container from "~/components/Container";
import { useColorScheme } from "~/lib/useColorScheme";
import InputWithIcons from "~/components/InputWithIcon";
import axios from "axios";
import { CircleDashed } from "lucide-react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type messageRole = "system" | "user" | "assistant";
type messageGptType = {
  role: messageRole;
  content: string;
}[];

export default function Chat() {
  const { colorScheme } = useColorScheme();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<messageGptType>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (prompt === "") return Alert.alert("Please type a message");

    setPrompt("");

    setLoading(true);

    const newMessages = messages.concat([
      {
        content: prompt,
        role: "user",
      },
    ]);

    setMessages(newMessages);

    try {
      const { data } = await axios.post("https://vrakka.vercel.app/api/ai", {
        messages: newMessages,
      });
      setMessages(newMessages.concat(data.message));
    } catch (error) {
      console.log("There was an error", error);
    }

    setLoading(false);
  };

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withRepeat(
            withSequence(
              withTiming(360 + "deg", {
                duration: 1000,
                easing: Easing.linear,
              }),
              withTiming(0 + "deg", { duration: 1000, easing: Easing.linear })
            ),
            -1,
            false
          ),
        },
      ],
      width: 5,
      height: 5,
    };
  });

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={120} behavior="padding">
      <Container className="">
        <View
          style={{
            height: "90%",
          }}
        >
          <ScrollView
            style={{
              height: "100%",
            }}
          >
            {messages.map((message, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent:
                    message.role === "assistant" ? "flex-start" : "flex-end",
                  marginBottom: 8,
                  marginTop: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor:
                      message.role === "assistant" ? "black" : "white",
                    padding: 8,
                    borderRadius: 8,
                    maxWidth: "80%",
                  }}
                  className="border border-zinc-400"
                >
                  <Text
                    style={{
                      color: message.role === "assistant" ? "white" : "black",
                    }}
                  >
                    {message.content}
                  </Text>
                </View>
              </View>
            ))}

            {loading && (
              <Animated.View
              // style={[style]}
              >
                <CircleDashed
                  style={{
                    width: 5,
                    height: 5,
                  }}
                  stroke={colorScheme === "dark" ? "white" : "black"}
                />
              </Animated.View>
            )}
          </ScrollView>
        </View>
        <View
          style={{
            height: "10%",
          }}
          className="flex-row items-center justify-between"
        >
          <View
            style={{
              width: "90%",
            }}
          >
            <InputWithIcons
              leftIcon="chatbox-ellipses-outline"
              placeholder="Ask a question..."
              onChangeText={setPrompt}
              value={prompt}
              keyboardType="default"
              className="w-1/2"
            />
          </View>
          <View
            style={{
              width: "10%",
            }}
          >
            <TouchableOpacity onPress={sendMessage}>
              <Ionicons
                name="send"
                size={20}
                color={"#2f5bb6"}
                className="pl-4"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}
