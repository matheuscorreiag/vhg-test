import { Label } from "@/src/components/common/label";
import { ProductColorPicker } from "@/src/components/common/product-color-picker";
import { ProductCounter } from "@/src/components/common/product-counter";
import { ReviewStars } from "@/src/components/common/review-stars";
import { OrderProduct } from "@/src/data/order";
import { useDeleteFromCart } from "@/src/hooks/cart/useDeleteFromCart";
import { useUpdateCart } from "@/src/hooks/cart/useUpdateCart";
import { useCartStore } from "@/src/store/cart";
import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";

interface CartListProductProps extends OrderProduct {
  hideControls?: boolean;
}
export function CartListProduct({
  productId,
  name,
  color,
  price,
  hideControls,
  imageUrl,
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
          source={{ uri: imageUrl }}
          style={{
            width: 160,
            height: 240,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
        <View className="ml-4">
          <Label className="font-semibold">{name}</Label>

          <View className="mt-2">
            <ReviewStars rating={4} />
          </View>

          <Label className="text-sm mt-5">
            <ProductColorPicker colors={[color]} />
          </Label>

          <Label className="mt-3 font-bold text-xl">R$ {price}</Label>

          {!hideControls && (
            <View className="flex-row gap-x-6 mt-6">
              <ProductCounter
                counter={productCount || 0}
                onAdd={() => onPressIcons("add")}
                onMinus={() => onPressIcons("minus")}
              />
              <TouchableOpacity onPress={handleRemove}>
                <Label className="text-red-600  ">Remover</Label>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
