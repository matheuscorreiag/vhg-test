import { gradientColor } from "@/src/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, PressableProps, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

interface GradientButtonProps extends PressableProps {
  title: string;
}

const variants = {
  small: "max-w-sm",
} as const;

export function GradientButton({
  title,
  className,
  ...props
}: GradientButtonProps) {
  return (
    <Pressable
      className={twMerge("rounded-4xl overflow-hidden w-full", className)}
      {...props}
    >
      <LinearGradient
        colors={[gradientColor.start, gradientColor.end]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View className="px-8 py-4">
          <Text className="font-sans font-semibold text-center">
            Go Shopping
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
