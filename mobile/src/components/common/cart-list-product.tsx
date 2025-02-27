import { ProductColorPicker } from "@/src/components/common/product-color-picker";
import { ProductCounter } from "@/src/components/common/product-counter";
import { ReviewStars } from "@/src/components/common/review-stars";
import { OrderProduct } from "@/src/data/order";
import { useDeleteFromCart } from "@/src/hooks/cart/useDeleteFromCart";
import { useUpdateCart } from "@/src/hooks/cart/useUpdateCart";
import { useCartStore } from "@/src/store/cart";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

interface CartListProductProps extends OrderProduct {
  hideControls?: boolean;
}
export function CartListProduct({
  productId,
  name,
  color,
  price,
  hideControls,
}: CartListProductProps) {
  const { products } = useCartStore();
  const { updateCart } = useUpdateCart();
  const { deleteFromCart } = useDeleteFromCart();

  const productCount =
    products.find((item) => item.productId === productId)?.quantity || 0;

  async function onPressIcons(operation: "add" | "minus") {
    if (!productId || (productCount === 0 && operation === "minus")) return;

    if (productCount === 1 && operation === "minus") {
      return await handleRemove();
    }

    await updateCart({
      productId,
      quantity: operation === "add" ? productCount + 1 : productCount - 1,
      color,
    });
  }
  async function handleRemove() {
    if (!productId) return;
    return await deleteFromCart({ productId });
  }

  return (
    <View className="flex-row gap-x-4 items-center">
      <View className="flex-row gap-x-4">
        <Image
          placeholder={require("../../../assets/images/default-product-image.png")}
          placeholderContentFit="cover"
          style={{
            width: 160,
            height: 240,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
        <View className="ml-4">
          <Text className="text-base font-semibold font-sans">{name}</Text>

          <View className="mt-2">
            <ReviewStars rating={4} />
          </View>

          <Text className="text-sm font-sans mt-5">
            <ProductColorPicker colors={[color]} />
          </Text>

          <Text className="font-sans mt-3 font-bold text-xl">R$ {price}</Text>

          {!hideControls && (
            <View className="flex-row gap-x-6 mt-6">
              <ProductCounter
                counter={productCount || 0}
                onAdd={() => onPressIcons("add")}
                onMinus={() => onPressIcons("minus")}
              />
              <TouchableOpacity onPress={handleRemove}>
                <Text className="text-red-600 font-sans">Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
