import { PageContainer } from "@/src/components/common/page-container";
import { useRouter } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MenuModal() {
  const router = useRouter();

  return (
    <Pressable
      className="bg-transparent/30 m-0 p-0 h-full"
      onPress={() => router.back()}
    >
      <View className="flex-1 bg-white w-5/6">
        <PageContainer>
          <Text>Menu</Text>
        </PageContainer>
      </View>
    </Pressable>
  );
}
