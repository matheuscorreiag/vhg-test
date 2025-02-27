import { Button } from "@/src/components/common/button";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function QRCodeScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <PageContainer>
      <PageHeader title="QR Code Scanner" className="flex-col" />

      <Text>
        Digitalize um código QR que contenha um URL. Ele será aberto no
        navegador padrão.
      </Text>

      <View className="h-[400px] mt-4 rounded-lg">
        {permission?.granted && <CameraView style={{ flex: 1 }} />}
      </View>

      <View className="flex-row flex-1 px-16 gap-x-4 mt-10">
        <Button title="Limpar" className="flex-1 px-" />
        <Button title="Limpar" className="flex-1" />
      </View>
    </PageContainer>
  );
}
