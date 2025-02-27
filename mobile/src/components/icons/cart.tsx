import { Label } from "@/src/components/common/label";
import { gradientColor } from "@/src/constants/colors";
import { useCartStore } from "@/src/store/cart";
import * as React from "react";
import { View } from "react-native";
import Svg, {
  SvgProps,
  G,
  Path,
  Defs,
  ClipPath,
  LinearGradient,
  Stop,
} from "react-native-svg";

interface CartIconProps extends SvgProps {
  isFocused?: boolean;
  showCount?: boolean;
}
export const CartIcon = ({
  isFocused,
  showCount = false,
  ...props
}: CartIconProps) => {
  const { count } = useCartStore();

  return (
    <Svg width={24} height={24} {...props}>
      {count > 0 && showCount && (
        <View className="absolute bg-red-600 rounded-full w-4 h-4 -right-1">
          <Label className="text-center text-white text-xs">{count}</Label>
        </View>
      )}
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={gradientColor.start} />
          <Stop offset="100%" stopColor={gradientColor.end} />
        </LinearGradient>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#a)">
        <Path
          fill={isFocused ? "url(#grad)" : "#000"}
          d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2ZM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1Zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2Z"
        />
      </G>
    </Svg>
  );
};
