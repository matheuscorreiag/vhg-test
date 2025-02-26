import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";

interface AppLinearGradientProps extends LinearGradientProps {
  children: React.ReactNode;
}
export function AppLinearGradient({
  children,
  ...props
}: AppLinearGradientProps) {
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} {...props}>
      {children}
    </LinearGradient>
  );
}
