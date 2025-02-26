import { BackButtonIcon } from "@/assets/back-button";
import { Href, useRouter } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

interface HeaderProps {
  hasBackButton?: boolean;
  goBackRoute?: Href;
}

export function Header({ hasBackButton = false, goBackRoute }: HeaderProps) {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-center">
        {hasBackButton && (
          <View className="absolute left-5">
            <BackButtonIcon onPress={() => router.back()} />
          </View>
        )}
        <Text className="text-lg text-center font-bold font-sans">
          My Demo <Text className="font-normal">App</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
