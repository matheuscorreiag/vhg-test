import Checkbox from "expo-checkbox";
import { Button } from "@/src/components/common/button";
import { Input } from "@/src/components/common/input";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { Step } from "@/src/components/common/step";
import { CardIcon } from "@/src/components/icons/card";
import { useState } from "react";
import { Text, View } from "react-native";

export default function CardScreen() {
  const [isChecked, setChecked] = useState(false);
  return (
    <PageContainer>
      <PageHeader title="Checkout" />
      <Step
        title="Enter a payment method"
        description="You will not be charged until you review your purchase on the next screen."
        submitLabel="Continuar"
      >
        <View className="flex-row justify-between">
          <Text className="font-semibold text-lg mb-5">Card</Text>
          <CardIcon />
        </View>
        <View className="flex-col gap-y-6">
          <Input label="FULL NAME" placeholder="Rebecca Winter" required />
          <Input
            label="CARD NUMBER"
            placeholder="5555 5555 5555 4444"
            required
          />
          <Input
            label="FULL NAME ON CARD"
            placeholder="Rebecca Winter"
            required
          />
          <View className="flex-row gap-x-2 justify-between">
            <Input label="EXPIRATION DATE" placeholder="03/26" required />
            <Input label="SECURITY CODE" placeholder="123" required />
          </View>
        </View>

        <View className="mt-8 flex-row items-center gap-x-4">
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color="#007CC2"
          />
          <Text className="">
            Meu endereço de cobrança é igual ao meu endereço de entrega
          </Text>
        </View>

        <Button title="COMPRAR AGORA" className="mt-12" />
      </Step>
    </PageContainer>
  );
}
