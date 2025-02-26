import { ReviewStars } from "@/src/components/common/review-stars";
import { Pressable, PressableProps, Text, View } from "react-native";
import { Image } from "expo-image";
import { twMerge } from "tailwind-merge";
import { useRouter } from "expo-router";
import { Product } from "@/src/data/product";

interface ProductCardProps extends PressableProps, Product {
  id: string;
}

export function ProductCard({
  name,
  description,
  id,
  price,
  rating,
  imageUrl,
  className,
  ...props
}: ProductCardProps) {
  return (
    <Pressable
      className={twMerge(
        "rounded-lg border-2 border-cardBorder self-baseline",
        className
      )}
      {...props}
    >
      <Image
        contentFit="contain"
        style={{ width: 170, height: 170 }}
        // source={require("../../assets/images/default-product-image.png")}
        placeholder={require("../../../assets/images/default-product-image.png")}
        placeholderContentFit="cover"
      />
      <View className="p-4 gap-y-2.5">
        <Text
          className="text-base font-semibold font-sans h-12"
          numberOfLines={2}
        >
          {name}
        </Text>
        <Text className="font-bold font-sans text-xl">R${price}</Text>

        <ReviewStars rating={rating} />
      </View>
    </Pressable>
  );
}
