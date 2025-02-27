import { Button } from "@/src/components/common/button";
import { CartIcon } from "@/src/components/icons/cart";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export function EmptyCart() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center">
      <View className="mb-12">
        <CartIcon />
      </View>
      <Text className="font-sans text-2xl font-bold mb-4">Nenhum item</Text>

      <Text className="text-base font-sans text-center mb-4">
        Oh não! Seu carrinho está vazio. Preencha-o com brindes para concluir
        sua compra.
      </Text>

      <Button
        title="Go Shopping"
        color="gradient"
        onPress={() => router.push("/")}
      />
    </View>
  );
}
