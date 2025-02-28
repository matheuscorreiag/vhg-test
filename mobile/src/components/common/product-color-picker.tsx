import { Label } from "@/src/components/common/label";
import { View } from "react-native";

interface ProductColorPickerProps {
  colors: string[];
  onPress?: (color: string) => void;
}
export function ProductColorPicker({ colors }: ProductColorPickerProps) {
  return (
    <View className="flex-row gap-x-2">
      <Label>Cor: </Label>
      {colors.map((color, index) => (
        <View
          key={index}
          style={{
            backgroundColor: color,
          }}
          className="w-5 h-5 rounded-full"
        />
      ))}
    </View>
  );
}
