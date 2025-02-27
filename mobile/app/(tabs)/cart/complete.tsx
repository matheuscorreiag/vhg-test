import { Button } from "@/src/components/common/button";
import { PageContainer } from "@/src/components/common/page-container";
import { CompleteIcon } from "@/src/components/icons/complete";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function CompleteScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center p-4">
      <CompleteIcon />
      <Text className="font-bold text-2xl font-sans mt-12">
        Checkout completado
      </Text>

      <Text className="text-center font-sans text-base mt-4">
        Obrigado pelo seu pedido. Seu pedido foi despachado e chegará tão rápido
        quanto o pônei galopa!
      </Text>

      <Button
        title="Continue comprando"
        className="mt-8"
        onPress={() => router.push("/(tabs)")}
      />
    </View>
  );
}
