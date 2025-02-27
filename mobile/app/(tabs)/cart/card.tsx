import Checkbox from "expo-checkbox";
import { Button } from "@/src/components/common/button";
import { Input } from "@/src/components/common/input";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { Step } from "@/src/components/common/step";
import { CardIcon } from "@/src/components/icons/card";
import { useState } from "react";
import { Text, View } from "react-native";
import { useCompleteCart } from "@/src/hooks/cart/useCompleteCart";
import { CompleteOrderCard } from "@/src/data/order";
import { useForm } from "react-hook-form";
import { useCartStore } from "@/src/store/cart";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { Label } from "@/src/components/common/label";

export default function CardScreen() {
  const [isChecked, setChecked] = useState(false);
  const cartStore = useCartStore();

  const { completeCart } = useCompleteCart();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CompleteOrderCard>({
    mode: "onSubmit",
  });

  function validateExpiratioFormat(value: string) {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return regex.test(value);
  }

  function generateExpiration(value: string): Date | void {
    const isDateValid = validateExpiratioFormat(value);
    const month = value.split("/")[0];
    const year = value.split("/")[1];
    const actualYear = new Date().getFullYear();
    const first2DigitsOfYear = actualYear.toString().slice(0, 2);

    if (!month || !year || !first2DigitsOfYear || !isDateValid) {
      return Toast.show({
        type: "error",
        text1: "Data de expiração deve ser no formato MM/AA",
      });
    }

    return new Date(Number(first2DigitsOfYear + year), Number(month) - 1, 1);
  }

  async function onSubmit(data: CompleteOrderCard) {
    const addressInfo = cartStore.address;

    const expirationDate = generateExpiration(data.expiration);

    if (!expirationDate || !addressInfo) return;

    await completeCart({
      ...addressInfo,
      ...data,
      expiration: expirationDate.toISOString(),
    });
  }

  return (
    <PageContainer>
      <PageHeader title="Checkout" />
      <Step
        title="Enter a payment method"
        description="You will not be charged until you review your purchase on the next screen."
        submitLabel="Continuar"
      >
        <View className="flex-row justify-between">
          <Label className="font-semibold text-lg mb-5">Card</Label>
          <CardIcon />
        </View>
        <View className="flex-col gap-y-6">
          <Input
            name="cardName"
            control={control}
            label="FULL NAME"
            placeholder="Rebecca Winter"
            error={!!errors.cardName}
            required
          />
          <Input
            name="cardNumber"
            control={control}
            label="CARD NUMBER"
            placeholder="5555 5555 5555 4444"
            error={!!errors.cardNumber}
            required
          />

          <View className="flex-row gap-x-2 justify-between">
            <Input
              name="expiration"
              control={control}
              label="EXPIRATION DATE"
              placeholder="03/26"
              error={!!errors.expiration}
              required
            />

            <Input
              name="securityCode"
              control={control}
              label="SECURITY CODE"
              placeholder="123"
              error={!!errors.securityCode}
              required
            />
          </View>
        </View>

        <View className="mt-8 flex-row items-center gap-x-4">
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color="#007CC2"
          />
          <Label>
            Meu endereço de cobrança é igual ao meu endereço de entrega
          </Label>
        </View>

        <Button
          title="COMPRAR AGORA"
          className="mt-12"
          onPress={handleSubmit(onSubmit)}
        />
      </Step>
    </PageContainer>
  );
}
