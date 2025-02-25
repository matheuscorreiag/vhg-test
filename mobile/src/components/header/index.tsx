import { SafeAreaView, Text, View } from "react-native";

export function Header() {
  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-center">
        <Text className="text-lg text-center font-bold">
          My Demo <Text className="font-normal">App</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
