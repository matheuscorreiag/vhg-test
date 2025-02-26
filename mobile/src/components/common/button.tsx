import { AppLinearGradient } from "@/src/components/common/app-linear-gradient";
import { gradientColor } from "@/src/constants/colors";
import { Pressable, PressableProps, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends PressableProps {
  title: string;
  color?: keyof typeof variants.color;
  textAlign?: keyof typeof variants.text.alignment;
  textSize?: keyof typeof variants.text.size;
  textWeight?: keyof typeof variants.text.weight;
  padding?: keyof typeof variants.padding;
  className?: string;
}

const variants = {
  color: {
    gradient: "bg-blue-500",
    menu: "bg-white",
  },
  padding: {
    topOnly: "py-3",
    default: "px-8 py-4",
  },
  text: {
    alignment: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    size: {
      small: "text-sm",
      medium: "text-base",
      large: "text-xl",
    },
    weight: {
      bold: "font-bold",
      normal: "font-normal",
    },
  },
} as const;

export function Button({
  title,
  color = "gradient",
  textAlign = "center",
  textSize = "medium",
  textWeight = "bold",
  padding = "default",
  className,
  disabled,
  ...props
}: ButtonProps) {
  const colorClass = variants.color[color];

  const buttonContent = (
    <View className={twMerge(variants.padding[padding])}>
      <Text
        className={twMerge(
          "font-base font-sans font-semibold text-center text-black",
          variants.text.alignment[textAlign],
          variants.text.size[textSize],
          variants.text.weight[textWeight]
        )}
      >
        {title}
      </Text>
    </View>
  );

  if (color === "gradient") {
    return (
      <Pressable
        className={twMerge(
          "rounded-4xl overflow-hidden",
          disabled && "opacity-50",
          className
        )}
        {...props}
      >
        <AppLinearGradient colors={[gradientColor.start, gradientColor.end]}>
          {buttonContent}
        </AppLinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      className={twMerge(
        "rounded-4xl overflow-hidden",
        disabled && "opacity-50",
        colorClass,
        className
      )}
      {...props}
    >
      {buttonContent}
    </Pressable>
  );
}
