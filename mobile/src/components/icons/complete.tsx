import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

export const CompleteIcon = (props: SvgProps) => (
  <Svg width={72} height={69} fill="none" {...props}>
    <Path
      fill="url(#a)"
      d="M34.5 0c6.628 0 12.82 1.87 18.077 5.11l-4.061 4.569A28.37 28.37 0 0 0 34.5 6C18.76 6 6 18.76 6 34.5S18.76 63 34.5 63 63 50.24 63 34.5c0-2.84-.415-5.581-1.188-8.17l4.54-5.108A34.394 34.394 0 0 1 69 34.5C69 53.554 53.554 69 34.5 69 15.446 69 0 53.554 0 34.5 0 15.446 15.446 0 34.5 0Z"
    />
    <Path
      fill="url(#b)"
      d="M71.079 6.16a3.74 3.74 0 0 0-.304-5.225 3.612 3.612 0 0 0-5.15.308L35.746 35.349 24.378 22.347a3.612 3.612 0 0 0-5.15-.313 3.74 3.74 0 0 0-.309 5.225L35.742 46.5 71.08 6.16Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={72}
        x2={5.5}
        y1={61}
        y2={9}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#28CE9C" />
        <Stop offset={1} stopColor="#6AC9FF" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={72}
        x2={5.5}
        y1={61}
        y2={9}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#28CE9C" />
        <Stop offset={1} stopColor="#6AC9FF" />
      </LinearGradient>
    </Defs>
  </Svg>
);
