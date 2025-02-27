import { CompleteOrder } from "@/src/data/order";
import { fetcher } from "@/src/utils/fetcher";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

function completeCartFn(body: CompleteOrder) {
  return fetcher("/orders", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
export function useCompleteCart() {
  const router = useRouter();
  const { mutateAsync: completeCart } = useMutation({
    mutationKey: ["complete-cart"],
    mutationFn: (body: CompleteOrder) => completeCartFn(body),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Pedido concluído com sucesso" });
      router.push("/(tabs)");
    },
    onError: () => {
      Toast.show({ type: "error", text1: "Erro ao concluir pedido" });
    },
  });

  return { completeCart };
}
