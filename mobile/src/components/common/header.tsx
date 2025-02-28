import { BackButtonIcon } from "@/src/components/icons/back-button";
import { AppName } from "@/src/components/common/app-name";
import { Href, useRouter } from "expo-router";
import { SafeAreaView, View } from "react-native";

interface HeaderProps {
  hasBackButton?: boolean;
  route?: Href;
}

export function Header({ hasBackButton = false, route }: HeaderProps) {
  const router = useRouter();

  function handleBackButton() {
    if (route) return router.push(route);

    router.back();
  }
  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-center">
        {hasBackButton && (
          <View className="absolute left-5">
            <BackButtonIcon onPress={handleBackButton} />
          </View>
        )}
        <AppName />
      </View>
    </SafeAreaView>
  );
}
