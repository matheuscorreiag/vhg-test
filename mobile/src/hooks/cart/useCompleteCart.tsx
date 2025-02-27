import { CompleteOrder } from "@/src/data/order";
import { useCartStore } from "@/src/store/cart";
import { fetcher } from "@/src/utils/fetcher";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

function completeCartFn(body: CompleteOrder) {
  return fetcher("/orders", {
    method: "PUT",
    body: JSON.stringify(body),
  });
}
export function useCompleteCart() {
  const router = useRouter();
  const cartStore = useCartStore();
  const { mutateAsync: completeCart } = useMutation({
    mutationKey: ["complete-cart"],
    mutationFn: (body: CompleteOrder) => completeCartFn(body),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Pedido concluído com sucesso" });
      router.push("/cart/complete");
      cartStore.clearCart();
    },
    onError: (error) => {
      console.log(error);
      Toast.show({ type: "error", text1: "Erro ao concluir pedido" });
    },
  });

  return { completeCart };
}
