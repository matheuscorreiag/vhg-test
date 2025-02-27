import { CounterAddIcon } from "@/src/components/icons/counter-add";
import { CounterMinusIcon } from "@/src/components/icons/counter-minus";
import { Pressable, Text, View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

interface ProductCounterProps extends ViewProps {
  counter: number;
  onAdd: () => void;
  onMinus: () => void;
}

export function ProductCounter({
  onAdd,
  onMinus,
  counter,
  className,
  ...props
}: ProductCounterProps) {
  return (
    <View className={twMerge("flex-row gap-x-2.5", className)} {...props}>
      <Pressable onPress={onMinus}>
        <CounterMinusIcon />
      </Pressable>
      <Text className="font-sans font-semibold">{counter}</Text>
      <Pressable onPress={onAdd}>
        <CounterAddIcon />
      </Pressable>
    </View>
  );
}
