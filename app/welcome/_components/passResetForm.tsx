import { View } from "react-native";
import { Button, Checkbox, Input, Label, Text } from "~/components/ui";

export default function PassResetForm({
  setEmail,
  handleReset,
}: {
  setEmail: (text: string) => void;
  handleReset: () => void;
}) {
  return (
    <>
      {/* Header */}
      <Text
        style={{ fontFamily: "MontserratSemiBold" }}
        className="text-3xl font- mt-8"
      >
        Password recovery
      </Text>
      <Text
        style={{ fontFamily: "MontserratRegular" }}
        className="tracking-wide mt-2"
      >
        Fill in all the fields and submit the form to recover your password.
      </Text>

      {/* Form */}
      <View className="flex-col flex gap-6 mt-8">
        <Input
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoComplete="email"
        />

        <Button onPress={handleReset} className="mt-4">
          <Text style={{ fontFamily: "MontserratSemiBold" }}>Send</Text>
        </Button>
      </View>
    </>
  );
}
