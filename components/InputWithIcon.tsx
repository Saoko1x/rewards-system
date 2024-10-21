import React from "react";
import { View, TextInput, TextInputProps, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "~/lib/useColorScheme";
import { cn } from "../lib/utils";

interface InputWithIconsProps extends TextInputProps {
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
}

const InputWithIcons = React.forwardRef<TextInput, InputWithIconsProps>(
  (
    {
      className,
      placeholderClassName,
      leftIcon,
      rightIcon,
      onRightIconPress,
      ...props
    },
    ref
  ) => {
    const { colorScheme } = useColorScheme();
    return (
      <View
        style={[
          styles.container,
          colorScheme === "dark"
            ? styles.darkBackground
            : styles.lightBackground,
          colorScheme === "dark" ? styles.darkBorder : styles.lightBorder,
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={24}
            color="gray"
            style={styles.icon}
          />
        )}
        <TextInput
          style={[
            styles.textInput,
            { paddingLeft: leftIcon ? 0 : 8 },
            colorScheme === "dark"
              ? styles.darkBackground
              : styles.lightBackground,
          ]}
          ref={ref}
          className={cn(
            "web:flex h-10 native:h-12 web:w-full rounded-md bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
            props.editable === false && "opacity-50 web:cursor-not-allowed",
            className
          )}
          placeholderClassName={cn(
            "text-muted-foreground",
            placeholderClassName
          )}
          {...props}
        />
        {rightIcon && (
          <Ionicons
            name={rightIcon}
            size={24}
            color="gray"
            style={styles.icon}
            onPress={onRightIconPress}
          />
        )}
      </View>
    );
  }
);

InputWithIcons.displayName = "InputWithIcons";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 5,
    height: 44,
  },
  icon: {
    marginHorizontal: 8,
  },
  textInput: {
    flex: 1,
    fontFamily: "MontserratRegular",
    height: "100%",
    borderWidth: 0,
  },
  darkBackground: {
    backgroundColor: "#141414",
    color: "white",
  },
  lightBackground: {
    backgroundColor: "#f1f1f1",
    color: "black",
  },
  darkBorder: {
    borderColor: "#2a2a2a",
  },
  lightBorder: {
    borderColor: "#ccc",
  },
});

export default InputWithIcons;
