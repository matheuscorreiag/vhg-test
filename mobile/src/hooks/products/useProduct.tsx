import { Product } from "@/src/data/product";
import { fetcher } from "@/src/utils/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

interface UseProductProps {
  productId: string;
}

function getProduct({ productId }: UseProductProps): Promise<Product> {
  return fetcher<Product>(`/products/${productId}`);
}

export function useProduct({ productId }: UseProductProps) {
  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct({ productId }),
  });

  useEffect(() => {
    if (isProductError) {
      Toast.show({ type: "error", text1: "Erro ao carregar produto" });
    }
  }, [isProductError]);

  return { product, isProductLoading, isProductError };
}
