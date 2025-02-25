import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const MenuIcon = (props: SvgProps) => (
  <Svg width={22} height={17} {...props}>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 1.25C0 .56.513 0 1.146 0h19.708C21.487 0 22 .56 22 1.25s-.513 1.25-1.146 1.25H1.146C.513 2.5 0 1.94 0 1.25Zm0 7C0 7.56.513 7 1.146 7h19.708C21.487 7 22 7.56 22 8.25s-.513 1.25-1.146 1.25H1.146C.513 9.5 0 8.94 0 8.25ZM1.146 14C.513 14 0 14.56 0 15.25s.513 1.25 1.146 1.25h19.708c.633 0 1.146-.56 1.146-1.25S21.487 14 20.854 14H1.146Z"
      clipRule="evenodd"
    />
  </Svg>
);
