import { Button } from "@/src/components/common/button";
import { Label } from "@/src/components/common/label";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import {
  BarcodeScanningResult,
  CameraView,
  CameraViewProps,
  useCameraPermissions,
} from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";

export default function QRCodeScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  function onBarCodeScanned(readQRCode: BarcodeScanningResult) {
    if (readQRCode.data) {
      return router.push(`/(tabs)`);
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <PageContainer>
      <PageHeader title="QR Code Scanner" className="flex-col" />

      <Label>
        Digitalize um código QR que contenha um URL. Ele será aberto no
        navegador padrão.
      </Label>

      <View className="h-[400px] mt-4 rounded-lg">
        {permission?.granted && (
          <CameraView
            style={{ flex: 1 }}
            mode="picture"
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={(data) => onBarCodeScanned(data)}
          />
        )}
      </View>

      <View className="flex-row flex-1 px-16 gap-x-4 mt-10">
        <Button title="Limpar" className="flex-1 px-" />
        <Button title="Salvar" className="flex-1" />
      </View>
    </PageContainer>
  );
}
