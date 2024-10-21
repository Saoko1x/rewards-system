import { View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import LottieView from "lottie-react-native";

interface SplashProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function Splash({ setIsLoading }: SplashProps) {
  return (
    <View className='flex-1 m-0 items-center bg-[#141414]'>
      <LottieView
        source={require("../assets/splash.json")}
        autoPlay={true}
        loop={false}
        style={{
          flex: 1,
          pointerEvents: "none",
          width: "100%",
          height: "100%",
        }}
        resizeMode='cover'
        onAnimationFinish={() => setIsLoading(false)}
      />
    </View>
  );
}
