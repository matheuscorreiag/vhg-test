import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const CounterAddIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#007CC2"
      d="M11 5H9v4H5v2h4v4h2v-4h4V9h-4V5Zm-1-5C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Z"
    />
  </Svg>
);
