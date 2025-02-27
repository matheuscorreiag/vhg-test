import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const CardIcon = (props: SvgProps) => (
  <Svg width={28} height={22} fill="none" {...props}>
    <Path
      fill="#DBDBDB"
      d="M24.667.333H3.333A2.646 2.646 0 0 0 .68 3L.667 19a2.657 2.657 0 0 0 2.666 2.667h21.334A2.657 2.657 0 0 0 27.333 19V3A2.657 2.657 0 0 0 24.667.333Zm0 18.667H3.333v-8h21.334v8Zm0-13.333H3.333V3h21.334v2.667Z"
    />
  </Svg>
);
