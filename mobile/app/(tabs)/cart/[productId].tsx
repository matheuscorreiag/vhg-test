import { Button } from "@/src/components/common/button";
import { Label } from "@/src/components/common/label";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { ProductColorPicker } from "@/src/components/common/product-color-picker";
import { ProductCounter } from "@/src/components/common/product-counter";
import { ReviewStars } from "@/src/components/common/review-stars";
import { useUpdateCart } from "@/src/hooks/cart/useUpdateCart";
import { useProduct } from "@/src/hooks/products/useProduct";
import { useCartStore } from "@/src/store/cart";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function ProductScreen() {
  const { updateCart } = useUpdateCart();
  const { productId } = useLocalSearchParams();
  const { product } = useProduct({ productId: productId as string });
  const { products } = useCartStore();
  const [counter, setCounter] = useState(
    products.find((item) => item.productId === productId)?.quantity || 0
  );

  function onAdd() {
    setCounter(counter + 1);
  }

  function onMinus() {
    if (counter === 0) return;
    setCounter(counter - 1);
  }

  function onPressUpdateCart() {
    if (!product || counter === 0) return;
    updateCart({
      productId: product.id,
      quantity: counter,
      color: product.colors[0], //Foi setado a primeira cor, já que no design não foi especificado
    });
  }

  if (!product) return null;

  return (
    <PageContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <PageHeader title={product.name} className="flex-col">
          <ReviewStars rating={product?.rating} />
        </PageHeader>

        <View className="w-full rounded-lg overflow-hidden mt-4">
          <Image
            placeholderContentFit="cover"
            contentFit="cover"
            placeholder={require("../../../assets/images/default-product-image.png")}
            source={{ uri: product.imageUrl }}
            style={{
              width: 358,
              height: 358,
              borderRadius: 8,
            }}
          />
        </View>

        <View className="mt-5">
          <ProductColorPicker colors={product.colors} />
        </View>

        <View className="mt-6">
          <Label className="text-3xl font-semibold">R${product.price}</Label>
        </View>

        <View className="mt-8 flex-row justify-between items-center gap-x-16">
          <ProductCounter counter={counter} onAdd={onAdd} onMinus={onMinus} />
          <Button
            title="Adicionar ao carrinho"
            className="flex-1"
            onPress={onPressUpdateCart}
          />
        </View>
      </ScrollView>
    </PageContainer>
  );
}
