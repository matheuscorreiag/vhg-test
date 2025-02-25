import { SafeAreaView, Text, View } from "react-native";

export function Header() {
  return (
    <SafeAreaView>
      <View>
        <Text className="bg-red-600 w-full">My Demo App</Text>
      </View>
    </SafeAreaView>
  );
}
