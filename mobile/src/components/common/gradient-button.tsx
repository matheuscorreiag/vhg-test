import { AppLinearGradient } from "@/src/components/common/app-linear-gradient";
import { gradientColor } from "@/src/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

interface GradientButtonProps extends PressableProps {
  title: string;
  variant?: keyof typeof variants;
}

const variants = {
  fit: "w-auto",
  full: "flex-1",
} as const;

export function GradientButton({
  title,
  className,
  variant = "full",
  ...props
}: GradientButtonProps) {
  return (
    <Pressable
      className={twMerge(
        "rounded-4xl overflow-hidden w-full",
        variants[variant],
        className
      )}
      {...props}
    >
      <AppLinearGradient colors={[gradientColor.start, gradientColor.end]}>
        <View className="px-8 py-4">
          <Text className="font-base font-sans font-semibold text-center">
            {title}
          </Text>
        </View>
      </AppLinearGradient>
    </Pressable>
  );
}
