import { Button } from "@/src/components/common/button";
import { Label } from "@/src/components/common/label";
import { CompleteIcon } from "@/src/components/icons/complete";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function CompleteScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center p-4">
      <CompleteIcon />
      <Label className="font-bold text-2xl   mt-12">Checkout completado</Label>

      <Label className="text-center     mt-4">
        Obrigado pelo seu pedido. Seu pedido foi despachado e chegará tão rápido
        quanto o pônei galopa!
      </Label>

      <Button
        title="Continue comprando"
        className="mt-8"
        onPress={() => router.push("/(tabs)")}
      />
    </View>
  );
}
