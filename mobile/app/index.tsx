import { Label } from "@/src/components/common/label";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  setTimeout(() => {
    router.push("/login");
  }, 2000);

  return (
    <View className="flex-1 items-center justify-center">
      <LottieView
        source={require("@/assets/animation/splash.json")}
        autoPlay
        loop
        style={{ width: "100%", height: 100 }}
      />
      <Label className="text-center text-4xl font-bold mt-6">
        My Demo
        <Label className="font-normal text-4xl"> App</Label>
      </Label>
    </View>
  );
}
