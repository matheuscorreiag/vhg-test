import { View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

interface PageContainerProps extends ViewProps {
  children: React.ReactNode;
}
export function PageContainer({
  children,
  className,
  ...props
}: PageContainerProps) {
  return (
    <View className={twMerge("px-4 mt-7", className)} {...props}>
      {children}
    </View>
  );
}
