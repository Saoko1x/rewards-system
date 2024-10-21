import { ScrollView } from "react-native";
import React from "react";
import Container from "~/components/Container";
import ReferralCode from "~/components/dashboard/referralCode/ReferallCode";

export default function referralCode() {
  return (
    <ScrollView>
      <Container>
        <ReferralCode />
      </Container>
    </ScrollView>
  );
}
