import { useCartStore } from "@/src/store/cart";
import { fetcher } from "@/src/utils/fetcher";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

interface AddCartProps {
  productId: string;
  quantity: number;
  color: string;
}

function addItemToCart(payload: AddCartProps) {
  return fetcher("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function useAddCart() {
  const router = useRouter();
  const cartStore = useCartStore();
  const { mutateAsync: addToCart } = useMutation({
    mutationKey: ["addToCart"],
    mutationFn: (body: AddCartProps) => addItemToCart(body),
    onSuccess: (_, { productId, quantity }) => {
      cartStore.addToCart({
        id: productId,
        quantity,
      });
      // Redireciona para página principal, para melhor fluxo de navegação
      router.push("/");
      Toast.show({ type: "success", text1: "Item adicionado ao carrinho" });
    },
    onError: (error) => {
      console.log(error);
      Toast.show({ type: "error", text1: "Erro ao adicionar item" });
    },
  });

  return { addToCart };
}
