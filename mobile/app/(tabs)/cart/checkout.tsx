import { Button } from "@/src/components/common/button";
import { CartListProduct } from "@/src/components/common/cart-list-product";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { Total } from "@/src/components/common/total";
import { useOrder } from "@/src/hooks/cart/useOrder";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

// Labels feitas para ser usada somente local
function CheckoutLabel({ label }: { label: string }) {
  return <Text className="text-lg font-bold font-sans mt-6">{label}</Text>;
}

function CheckoutAddressLabel({ label }: { label: string }) {
  return (
    <Text className="font-sans text-base w-[180px] truncate" numberOfLines={1}>
      {label}
    </Text>
  );
}

export default function CheckoutScreen() {
  const router = useRouter();
  const { order } = useOrder();

  if (!order) return null;
  return (
    <PageContainer>
      <PageHeader title="Checkout" />
      <ScrollView>
        <View className="mb-4">
          <CheckoutLabel label="Revise seu pedido" />
        </View>

        {/* Mostrar o primeiro produto do carrinho assim como no design */}
        <CartListProduct
          id={order?.products[0].id}
          productId={order?.products[0].productId}
          name={order?.products[0].name}
          color={order?.products[0].color}
          price={order?.products[0].price}
          quantity={order?.products[0].quantity}
          hideControls
        />

        <CheckoutLabel label="Endereço de entrega" />

        <View className="mt-3 max-h-[96px] overflow-y-scroll">
          <CheckoutAddressLabel label="Rebeca Test" />
          <CheckoutAddressLabel label="Street 2, Address Line 2" />
          <CheckoutAddressLabel label="Truro, Somewhere" />
          <CheckoutAddressLabel label="Botland, 16627" />
        </View>

        <CheckoutLabel label="Método de pagamento" />

        <View className="mt-2.5">
          <Total quantity={order?.productCount} total={order?.total} />
        </View>

        <Button
          title="Fazer pedido"
          className="my-8"
          onPress={() => router.push("/cart/address")}
        />
      </ScrollView>
    </PageContainer>
  );
}
