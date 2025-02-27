import { Label } from "@/src/components/common/label";
import { Text, View } from "react-native";

interface TotalProps {
  total: number;
  quantity: number;
}

export function Total({ total, quantity }: TotalProps) {
  const isPlural = quantity > 1;
  return (
    <View className="flex-row items-center justify-between">
      <Label className="font-semibold items-center">
        Total:{" "}
        <Label>
          {quantity}
          {isPlural ? " itens" : " item"}
        </Label>
      </Label>

      <Label className="text-xl font-bold">R$ {total}</Label>
    </View>
  );
}
