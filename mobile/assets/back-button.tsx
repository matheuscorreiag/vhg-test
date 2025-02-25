import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const BackButtonIcon = (props: SvgProps) => (
  <Svg width={14} height={12} fill="none" {...props}>
    <Path
      fill="#132322"
      d="m2.613 6.668 4.191 4.192a.668.668 0 0 1-.944.944L.53 6.472a.668.668 0 0 1 0-.944L5.86.196a.668.668 0 1 1 .944.944L2.613 5.332h10.386a.668.668 0 0 1 0 1.336H2.613Z"
    />
  </Svg>
);
