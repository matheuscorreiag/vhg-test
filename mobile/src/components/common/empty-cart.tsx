import { Button } from "@/src/components/common/button";
import { Label } from "@/src/components/common/label";
import { CartIcon } from "@/src/components/icons/cart";
import { useRouter } from "expo-router";
import { View } from "react-native";

export function EmptyCart() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center">
      <View className="mb-12">
        <CartIcon size="large" />
      </View>
      <Label className="text-2xl font-bold mb-4">Nenhum item</Label>

      <Label className="text-center mb-4">
        Oh não! Seu carrinho está vazio. Preencha-o com brindes para concluir
        sua compra.
      </Label>

      <Button
        title="Go Shopping"
        color="gradient"
        onPress={() => router.push("/")}
      />
    </View>
  );
}
