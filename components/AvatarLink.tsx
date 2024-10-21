// src/components/AvatarLink.tsx
import React from "react";
import { Text, Avatar, AvatarFallback, AvatarImage } from "~/components/ui";
import { Link } from "expo-router";
import { StyleProp, ViewStyle } from "react-native";

interface AvatarLinkProps {
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ViewStyle>;
}

const AvatarLink: React.FC<AvatarLinkProps> = ({ style, imageStyle }) => {
  return (
    <Link href={"/configuration/config"}>
      <Avatar alt="Avatar" style={style}>
        <AvatarImage
          source={{
            uri: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
          }}
        />
        <AvatarFallback>
          <Text>Avatar</Text>
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default AvatarLink;
