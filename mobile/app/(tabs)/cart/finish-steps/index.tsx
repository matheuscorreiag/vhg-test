import { Button } from "@/src/components/common/button";
import { Input } from "@/src/components/common/input";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { Step } from "@/src/components/common/step";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function AddressScreen() {
  const router = useRouter();
  return (
    <PageContainer>
      <PageHeader title="Checkout" />

      <Step title="Enter a shipping address" submitLabel="Continuar">
        <View className="flex-col gap-y-6">
          <Input placeholder="Rebeca Winter" label="FULL NAME" required />
          <Input placeholder="Mandatory 112" label="ADDRESS LINE 1" required />
          <Input placeholder="Entrance 1" label="ADDRESS LINE 2" required />
          <View className="flex-row gap-x-2 ">
            <Input placeholder="Truro" label="CITY" required />
            <Input placeholder="Cornwall" label="STATE / REGION" />
          </View>
          <View className="flex-row gap-x-2 ">
            <Input placeholder="89750" label="ZIP CODE" required />
            <Input placeholder="United Kingdom" label="COUNTRY" required />
          </View>
        </View>

        <Button
          title="Continuar"
          className="mt-8 mb-10  w-full"
          onPress={() => router.push("/cart/finish-steps/card")}
        />
      </Step>
    </PageContainer>
  );
}
