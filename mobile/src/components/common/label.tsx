import { Text, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

interface LabelProps extends TextProps {
  children: React.ReactNode;
}

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <Text className={twMerge("font-sans text-base", className)} {...props}>
      {children}
    </Text>
  );
}
