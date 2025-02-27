import { Cart } from "@/src/data/cart";
import { fetcher } from "@/src/utils/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

function getCart(): Promise<Cart> {
  return fetcher<Cart>("/orders/current");
}

export function useCart() {
  const { data: cart, isError: isCartError } = useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  useEffect(() => {
    if (isCartError) {
      Toast.show({ type: "error", text1: "Erro ao carregar carrinho" });
    }
  }, [isCartError]);

  return { cart };
}
