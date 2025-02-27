import { ProductColorPicker } from "@/src/components/common/product-color-picker";
import { ProductCounter } from "@/src/components/common/product-counter";
import { ReviewStars } from "@/src/components/common/review-stars";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

interface CartListProductProps {
  id: string;
  color: string;
  productId: string;
  quantity: number;
}

export function CartListProduct({
  id,
  productId,
  color,
  quantity,
}: CartListProductProps) {
  function onAdd() {}

  function onMinus() {}

  return (
    <View className="flex-row gap-x-4 items-center">
      <View className="flex-row gap-x-4">
        <Image
          placeholder={require("../../../assets/images/default-product-image.png")}
          placeholderContentFit="cover"
          style={{ width: 160, height: 240, objectFit: "cover" }}
        />
        <View className="ml-4">
          <Text className="text-base font-semibold font-sans">
            Swag Labs Backpack
          </Text>

          <View className="mt-2">
            <ReviewStars rating={4} />
          </View>

          <Text className="text-sm font-sans mt-5">
            <ProductColorPicker colors={[color]} />
          </Text>

          <Text className="font-sans mt-3 font-bold text-xl">R$29.99</Text>

          <View className="flex-row gap-x-6 mt-6">
            <ProductCounter
              counter={quantity}
              onAdd={onAdd}
              onMinus={onMinus}
            />
            <TouchableOpacity>
              <Text className="text-red-600 font-sans">Remover</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
