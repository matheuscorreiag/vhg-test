import { Product } from "@/src/data/product";
import { fetcher } from "@/src/utils/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

function getProducts(): Promise<Product[]> {
  return fetcher<Product[]>("/products");
}
export function useProducts() {
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  useEffect(() => {
    if (isProductsError) {
      Toast.show({ type: "error", text1: "Erro ao carregar produtos" });
    }
  }, [isProductsError]);

  return { products, isProductsLoading, isProductsError };
}
