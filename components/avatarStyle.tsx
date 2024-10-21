// src/screens/AnotherScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AvatarLink from "~/components/AvatarLink";

const avatarStyle: React.FC = () => {
  return (
    <View style={styles.container}>
      <AvatarLink style={styles.avatar} imageStyle={styles.avatarImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 75, 
  },
});

export default avatarStyle;
