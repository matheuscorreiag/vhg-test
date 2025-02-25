import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const HomeIcon = (props: SvgProps) => (
  <Svg width={18} height={16} {...props}>
    <Path
      fill="currentColor"
      d="M17 0H1v2h16V0Zm1 10V8l-1-5H1L0 8v2h1v6h10v-6h4v6h2v-6h1Zm-9 4H3v-4h6v4Z"
    />
  </Svg>
);
