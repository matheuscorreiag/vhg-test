import { SafeAreaView, View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

interface PageContainerProps extends ViewProps {
  children: React.ReactNode;
  skipSafeArea?: boolean;
}
export function PageContainer({
  children,
  className,
  skipSafeArea,
  ...props
}: PageContainerProps) {
  if (skipSafeArea) {
    return (
      <View className={twMerge("px-4 mt-7", className)} {...props}>
        {children}
      </View>
    );
  }
  return (
    <SafeAreaView>
      <View className={twMerge("px-4 mt-7", className)} {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
}
