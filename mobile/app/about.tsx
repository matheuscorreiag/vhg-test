import { AppName } from "@/src/components/common/app-name";
import { Label } from "@/src/components/common/label";
import { PageContainer } from "@/src/components/common/page-container";
import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";

export default function AboutScreen() {
  return (
    <PageContainer safeArea={false}>
      <View className="flex-1 items-center mt-28">
        <Label className="text-2xl font-bold">Sobre</Label>
        <View className="mt-10">
          <Image
            source={require("../assets/images/icon.png")}
            style={{ width: 50, height: 50 }}
          />
        </View>

        <View className="mt-10">
          <AppName />
          <Label className="mt-5 text-center max-w-[330px]">
            Um aplicativo para executar testes v1.5.0-build 188
          </Label>

          <TouchableOpacity className="mt-6">
            <Label className="text-center text-blue-600 font-bold">
              Visite nosso site
            </Label>
          </TouchableOpacity>
        </View>
      </View>
    </PageContainer>
  );
}
