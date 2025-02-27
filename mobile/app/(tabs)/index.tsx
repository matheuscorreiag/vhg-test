import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { ProductCard } from "@/src/components/common/product-card";
import { FilterIcon } from "@/src/components/icons/filter";
import { useProducts } from "@/src/hooks/products/useProducts";
import { useUser } from "@/src/hooks/user/useUser";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { products } = useProducts();
  const { token } = useUser();

  console.log(token);
  useEffect(() => {
    if (token) router.push("/(tabs)");
  }, [router, token]);

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
