import { SafeAreaView, ScrollView, View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

interface PageContainerProps extends ViewProps {
  children: React.ReactNode;
  safeArea?: boolean;
}
export function PageContainer({
  children,
  className,
  safeArea = true,
  ...props
}: PageContainerProps) {
  if (!safeArea)
    return (
      <View className={twMerge("flex-1 h-full w-full", className)} {...props}>
        {children}
      </View>
    );
  return (
    <SafeAreaView className="flex-1 h-full w-full">
      <ScrollView
        className={twMerge("px-4 mt-7 flex-1 h-full w-full", className)}
        {...props}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
