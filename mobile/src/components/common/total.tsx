import { Text, View } from "react-native";

interface TotalProps {
  total: number;
  quantity: number;
}

export function Total({ total, quantity }: TotalProps) {
  const isPlural = quantity > 1;
  return (
    <View className="flex-row items-center justify-between">
      <Text className="font-sans font-semibold text-base items-center">
        Total:{" "}
        <Text>
          {quantity}
          {isPlural ? " itens" : " item"}
        </Text>
      </Text>

      <Text className="text-xl font-bold font-sans">R$ {total}</Text>
    </View>
  );
}
