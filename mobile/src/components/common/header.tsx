import { BackButtonIcon } from "@/assets/back-button";
import { Label } from "@/src/components/common/label";
import { useRouter } from "expo-router";
import { SafeAreaView, View } from "react-native";

interface HeaderProps {
  hasBackButton?: boolean;
}

export function Header({ hasBackButton = false }: HeaderProps) {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-center">
        {hasBackButton && (
          <View className="absolute left-5">
            <BackButtonIcon onPress={() => router.back()} />
          </View>
        )}
        <Label className="text-lg text-center font-bold">
          My Demo <Label className="font-normal">App</Label>
        </Label>
      </View>
    </SafeAreaView>
  );
}
