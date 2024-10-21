import { ScrollView, View } from "react-native";
import Container from "~/components/Container";

import Steps from "~/app/jumpstart/[steps]";

export default function Jumpstart() {
  return (
    <ScrollView>
      <Container>
        <View className="mt-4">
          <Steps />
        </View>
      </Container>
    </ScrollView>
  );
}
