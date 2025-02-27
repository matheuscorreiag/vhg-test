import { Order } from "@/src/data/order";
import { fetcher } from "@/src/utils/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

function getOrder(): Promise<Order> {
  return fetcher<Order>("/orders/current");
}

export function useOrder() {
  const { data: order, isError: isOrderError } = useQuery<Order>({
    queryKey: ["order"],
    queryFn: () => getOrder(),
  });

  useEffect(() => {
    if (isOrderError) {
      Toast.show({ type: "error", text1: "Erro ao carregar carrinho" });
    }
  }, [isOrderError]);

  return { order };
}
