import { CounterAddIcon } from "@/src/components/icons/counter-add";
import { CounterMinusIcon } from "@/src/components/icons/counter-minus";
import { useState } from "react";
import { Pressable, Text, View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

interface ProductCounterProps extends ViewProps {}

export function ProductCounter({ className, ...props }: ProductCounterProps) {
  const [counter, setCounter] = useState(0);

  function onAdd() {
    setCounter(counter + 1);
  }

  function onMinus() {
    if (counter === 0) return;
    setCounter(counter - 1);
  }

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
