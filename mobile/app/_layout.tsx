import * as SplashScreen from "expo-splash-screen";
import { Header } from "@/src/components/common/header";
import { Stack } from "expo-router";
import { useEffect } from "react";
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_600SemiBold,
  NotoSans_700Bold,
} from "@expo-google-fonts/noto-sans";
import "../global.css";
import "react-native-reanimated";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    NotoSans_400Regular,
    NotoSans_600SemiBold,
    NotoSans_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const headerNoShowRoutes = ["menu-modal"];

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        header: ({ route }) =>
          !headerNoShowRoutes.includes(route.name) && <Header hasBackButton />,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="product/index" />
      <Stack.Screen
        name="menu-modal"
        options={{
          presentation: "containedTransparentModal",
          gestureDirection: "horizontal",
          animation: "simple_push",
          animationMatchesGesture: true,
          animationDuration: 300,
        }}
      />
    </Stack>
  );
}
