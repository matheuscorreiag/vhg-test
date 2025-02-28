import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { ProductCard } from "@/src/components/common/product-card";
import { FilterIcon } from "@/src/components/icons/filter";
import { useOrder } from "@/src/hooks/cart/useOrder";
import { useProducts } from "@/src/hooks/products/useProducts";
import { useCartStore } from "@/src/store/cart";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const cartStore = useCartStore();

  const { products } = useProducts();
  const { order } = useOrder();

  useEffect(() => {
    if (order?.products && order?.products?.length > 0) {
      order.products.forEach((product) => cartStore.addToCart(product));
    }
  }, [order]);

  return (
    <PageContainer>
      <PageHeader title="Produtos" className="flex-row justify-between">
        <FilterIcon />
      </PageHeader>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="flex-row flex-wrap justify-between ">
          {products &&
            products?.map((item) => (
              <View key={item.id} className="w-[48%] mb-4">
                <ProductCard
                  onPress={() => router.push(`/cart/${item.id}`)}
                  {...item}
                />
              </View>
            ))}
        </View>
      </ScrollView>
    </PageContainer>
  );
}
