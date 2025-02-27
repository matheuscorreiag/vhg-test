import { Label } from "@/src/components/common/label";
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
        <Label className="text-lg font-semibold">{title}</Label>
        {description && <Label className="mb-4">{description}</Label>}
      </View>
      {children}
    </View>
  );
}
