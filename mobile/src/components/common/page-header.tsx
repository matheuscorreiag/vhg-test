import { Label } from "@/src/components/common/label";
import { ReactNode } from "react";
import { View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

interface PageHeaderProps extends ViewProps {
  title: string;
  children?: ReactNode;
}
export function PageHeader({
  title,
  className,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <View className={twMerge(className)} {...props}>
      <Label className="text-2xl font-bold mb-6">{title}</Label>
      {children}
    </View>
  );
}
