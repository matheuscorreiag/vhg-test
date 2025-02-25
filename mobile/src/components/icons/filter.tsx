import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const FilterIcon = (props: SvgProps) => (
  <Svg width={16} height={9} fill="none" {...props}>
    <Path
      fill="#132322"
      d="M5.5 8.125a.625.625 0 0 1 .625-.625h3.75a.625.625 0 1 1 0 1.25h-3.75a.625.625 0 0 1-.625-.625ZM3 4.375a.625.625 0 0 1 .625-.625h8.75a.625.625 0 1 1 0 1.25h-8.75A.625.625 0 0 1 3 4.375ZM.5.625A.625.625 0 0 1 1.125 0h13.75a.625.625 0 1 1 0 1.25H1.125A.625.625 0 0 1 .5.625Z"
    />
  </Svg>
);
