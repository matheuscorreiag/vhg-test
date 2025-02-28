import { ReviewStars } from "@/src/components/common/review-stars";
import { Pressable, PressableProps, View } from "react-native";
import { Image } from "expo-image";
import { twMerge } from "tailwind-merge";
import { Product } from "@/src/data/product";
import { Label } from "@/src/components/common/label";

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
        style={{ width: 170, height: 170, borderRadius: 8 }}
        placeholder={require("@/assets/images/default-product-image.png")}
        source={{
          uri: imageUrl,
        }}
        placeholderContentFit="cover"
        contentFit="cover"
      />
      <View className="p-4 gap-y-2.5">
        <Label className="font-semibold h-12" numberOfLines={2}>
          {name}
        </Label>
        <Label className="font-bold text-xl">R${price}</Label>

        <ReviewStars rating={rating} />
      </View>
    </Pressable>
  );
}
