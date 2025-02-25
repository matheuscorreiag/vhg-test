import { StarsIcon } from "@/src/components/icons/star";
import { View } from "react-native";

interface ReviewStarsProps {
  rating: number;
}
const MAXIMUM_AMOUNT_OF_STARTS = 5;

export function ReviewStars({ rating }: ReviewStarsProps) {
  const amountOfStars = Array.from({ length: MAXIMUM_AMOUNT_OF_STARTS });

  return (
    <View className="flex-row items-center">
      {amountOfStars.map((_, index) => (
        <StarsIcon isChecked={index < rating} key={index} />
      ))}
    </View>
  );
}
