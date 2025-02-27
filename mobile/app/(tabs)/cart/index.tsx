import { Button } from "@/src/components/common/button";
import { CartListProduct } from "@/src/components/common/cart-list-product";
import { EmptyCart } from "@/src/components/common/empty-cart";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { useOrder } from "@/src/hooks/cart/useOrder";
import { ScrollView, Text, View } from "react-native";

export default function CartScreen() {
  const { order } = useOrder();

  const isPlural =
    order && order?.products?.reduce((acc, item) => acc + item.quantity, 0) > 1;

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
          </ScrollView>
        </>
      )}
      <View className="flex-row mb-8">
        <Text className="font-sans font-semibold text-base items-center">
          Total:{" "}
          <Text>
            {order?.products.reduce((acc, item) => acc + item.quantity, 0)}
            {isPlural ? " itens" : " item"}
          </Text>
        </Text>

        <Text>
          R${" "}
          {order?.products.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
          )}
        </Text>
      </View>
      <Button className="mb-4" title="Ir para Checkout" />
    </PageContainer>
  );
}
