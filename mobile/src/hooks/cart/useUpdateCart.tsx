import { useCartStore } from "@/src/store/cart";
import { fetcher } from "@/src/utils/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

interface AddCartProps {
  productId: string;
  quantity: number;
  color: string;
}

function updateCartFn(payload: AddCartProps) {
  return fetcher("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function useUpdateCart() {
  const cartStore = useCartStore();
  const queryClient = useQueryClient();
  const { mutateAsync: updateCart } = useMutation({
    mutationKey: ["update-cart"],
    mutationFn: (body: AddCartProps) => updateCartFn(body),
    onSuccess: async (_, { productId, quantity }) => {
      if (!cartStore.products.some((item) => item.productId === productId)) {
        return cartStore.addToCart({
          productId,
          quantity,
        });
      }
      cartStore.updateQuantity(productId, quantity);
      await queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
    onError: () => {
      Toast.show({ type: "error", text1: "Erro ao atualizar item" });
    },
  });

  return { updateCart };
}
