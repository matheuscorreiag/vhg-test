import { Text, View } from "react-native";

interface StepTitleProps {
  title: string;
  description?: string;
}

export function StepTitle({ title, description }: StepTitleProps) {
  return (
    <View className="flex-col gap-y-4 mb-4">
      <Text className="text-lg font-semibold">{title}</Text>
      {description && <Text className="text-base mb-4">{description}</Text>}
    </View>
  );
}
