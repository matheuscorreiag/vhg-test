import { ReviewStars } from "@/src/components/common/review-stars";
import { Pressable, PressableProps, Text, View } from "react-native";
import { Image } from "expo-image";
import { twMerge } from "tailwind-merge";
import { useRouter } from "expo-router";

interface ProductCardProps extends PressableProps {
  id: string;
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
  const router = useRouter();

  const onPress = () => {
    router.push("/cart/product");
  };

  return (
    <Pressable
      onPress={onPress}
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
          {title}
        </Text>
        <Text className="font-bold font-sans text-xl">R${price}</Text>

        <ReviewStars rating={rating} />
      </View>
    </Pressable>
  );
}
