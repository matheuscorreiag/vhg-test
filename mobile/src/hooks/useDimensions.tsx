import { Dimensions } from "react-native";

export function useDimensions() {
  const window = Dimensions.get("window");

  return {
    width: window.width,
    height: window.height,
  };
}
