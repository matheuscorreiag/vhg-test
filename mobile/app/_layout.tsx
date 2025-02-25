import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Header } from "@/src/components/header";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import "../src/globals/global.css";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
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

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ header: () => <Header /> }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
