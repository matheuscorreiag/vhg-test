import { Header } from "@/src/components/common/header";
import { Stack } from "expo-router";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function CartLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ route }) => (
          <Header hasBackButton={route.name !== "index"} />
        ),
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[productId]" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="card" />
      <Stack.Screen name="address" />
      <Stack.Screen
        name="complete"
        options={{
          header: () => <Header hasBackButton={false} />,
        }}
      />
    </Stack>
  );
}
