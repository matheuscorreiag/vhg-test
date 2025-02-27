import { ScrollView, Text, View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

interface StepperProps extends ViewProps {
  title: string;
  description?: string;
  submitLabel: string;
  children: React.ReactNode;
}
export function Step({
  title,
  description,
  submitLabel,
  children,
  className,
  ...props
}: StepperProps) {
  return (
    <View className={twMerge(className)} {...props}>
      <View className="flex-col gap-y-4 mb-4">
        <Text className="text-lg font-semibold">{title}</Text>
        {description && <Text className="text-base mb-4">{description}</Text>}
      </View>
      {children}
    </View>
  );
}
