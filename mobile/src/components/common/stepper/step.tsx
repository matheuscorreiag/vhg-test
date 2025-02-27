import { StepTitle } from "@/src/components/common/stepper/step-title";
import { ScrollView, View, ViewProps } from "react-native";
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
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <StepTitle title={title} description={description} />

        {children}
      </ScrollView>
    </View>
  );
}
