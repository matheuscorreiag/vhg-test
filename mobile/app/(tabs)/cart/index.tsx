import { CartListProduct } from "@/src/components/common/cart-list-product";
import { EmptyCart } from "@/src/components/common/empty-cart";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { useCart } from "@/src/hooks/cart/useCart";
import { ScrollView, View } from "react-native";

export default function CartScreen() {
  const { cart } = useCart();

  console.log(cart?.products);
  return (
    <PageContainer className="flex-1">
      {cart?.products?.length === 0 && <EmptyCart />}
      {cart && cart?.products?.length > 0 && (
        <>
          <PageHeader title="My Cart" />
          <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            <View className="flex-1 gap-y-4 mt-6">
              {cart?.products.map((item) => (
                <CartListProduct key={item.id} {...item} />
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </PageContainer>
  );
}
