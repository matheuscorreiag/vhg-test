import { useCartStore } from "@/src/store/cart";
import { fetcher } from "@/src/utils/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

interface DeleteFromCartProps {
  productId: string;
}

function deleteFromCartFn(payload: DeleteFromCartProps) {
  return fetcher(`/orders/${payload.productId}`, {
    method: "DELETE",
  });
}

export function useDeleteFromCart() {
  const cartStore = useCartStore();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteFromCart } = useMutation({
    mutationKey: ["delete-cart"],
    mutationFn: (body: DeleteFromCartProps) => deleteFromCartFn(body),
    onSuccess: async (_, { productId }) => {
      cartStore.updateQuantity(productId, 0);

      await queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
    onError: () => {
      Toast.show({ type: "error", text1: "Erro ao adicionar item" });
    },
  });

  return { deleteFromCart };
}
