import { Text, View } from "react-native";

interface ProductColorPickerProps {
  colors: string[];
}
export function ProductColorPicker({ colors }: ProductColorPickerProps) {
  return (
    <View className="flex-row gap-x-2">
      <Text className="font-sans text-base">Cor: </Text>
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
