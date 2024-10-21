import { ScrollView } from "react-native";
import React from "react";
import Container from "~/components/Container";
import Levels from "~/components/dashboard/training/Levels";
import Head from "~/components/dashboard/training/Head";
import ResourcesCard from "~/components/dashboard/training/ResourcesCard";

export default function Resources() {
  return (
    <ScrollView>
      <Container>
        <Head />
        <ResourcesCard />
        <Levels />
      </Container>
    </ScrollView>
  );
}
