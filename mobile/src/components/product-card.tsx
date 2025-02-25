import { ReviewStars } from "@/src/components/common/review-stars";
import { Text, View, ViewProps } from "react-native";
import { Image } from "expo-image";
import { twMerge } from "tailwind-merge";

interface ProductCardProps extends ViewProps {
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
}

export function ProductCard({
  title,
  price,
  rating,
  imageUrl,
  className,
  ...props
}: ProductCardProps) {
  return (
    <View
      className={twMerge("rounded-lg border border-cardBorder", className)}
      {...props}
    >
      <Image
        contentFit="contain"
        style={{ width: 200, height: 200 }}
        // source={require("../../assets/images/default-product-image.png")}
        placeholder={require("../../assets/images/default-product-image.png")}
        placeholderContentFit="cover"
      />
      <Text>{title}</Text>
      <Text>{price}</Text>
      <Text>{rating}</Text>

      <ReviewStars rating={rating} />
    </View>
  );
}
