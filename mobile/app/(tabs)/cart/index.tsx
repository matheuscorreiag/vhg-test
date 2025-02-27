import { Button } from "@/src/components/common/button";
import { CartListProduct } from "@/src/components/common/cart-list-product";
import { EmptyCart } from "@/src/components/common/empty-cart";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { Total } from "@/src/components/common/total";
import { useOrder } from "@/src/hooks/cart/useOrder";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function CartScreen() {
  const router = useRouter();
  const { order } = useOrder();

  if (!order) return null;

  return (
    <PageContainer className="flex-1">
      {order?.products?.length === 0 && <EmptyCart />}
      {order && order?.products?.length > 0 && (
        <>
          <PageHeader title="My Cart" />
          <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            <View className="flex-1 gap-y-4 mt-6">
              {order?.products.map((item) => (
                <CartListProduct key={item.id} {...item} />
              ))}
            </View>

            <View className="mb-8 mt-20">
              <Total quantity={order?.productCount} total={order?.total} />
            </View>

            <Button
              className="mt-4"
              title="Ir para Checkout"
              onPress={() => router.push("/cart/checkout")}
            />
          </ScrollView>
        </>
      )}
    </PageContainer>
  );
}
