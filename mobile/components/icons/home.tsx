import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

export const HomeIcon = ({
  isFocused,
  ...props
}: SvgProps & { isFocused?: boolean }) => (
  <Svg width={18} height={16} {...props}>
    <Defs>
      <LinearGradient id="homeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#28CE9C" />
        <Stop offset="100%" stopColor="#6AC9FF" />
      </LinearGradient>
    </Defs>
    <Path
      fill={isFocused ? "url(#homeGrad)" : "#000"}
      d="M17 0H1v2h16V0Zm1 10V8l-1-5H1L0 8v2h1v6h10v-6h4v6h2v-6h1Zm-9 4H3v-4h6v4Z"
    />
  </Svg>
);
