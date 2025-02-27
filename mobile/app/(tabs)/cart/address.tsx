import { Button } from "@/src/components/common/button";
import { Input } from "@/src/components/common/input";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { Step } from "@/src/components/common/step";
import { CompleteOrderAddress } from "@/src/data/order";
import { useCartStore } from "@/src/store/cart";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";

export default function AddressScreen() {
  const router = useRouter();
  const cartStore = useCartStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompleteOrderAddress>({
    mode: "onSubmit",
  });

  function onSubmit(data: CompleteOrderAddress) {
    cartStore.setAddress(data);

    router.push("/cart/card");
  }

  return (
    <PageContainer>
      <PageHeader title="Checkout" />

      <Step title="Enter a shipping address" submitLabel="Continuar">
        <View className="flex-col gap-y-6">
          <Input
            name="addressName"
            control={control}
            placeholder="Rebeca Winter"
            label="FULL NAME"
            error={!!errors.addressName}
            required
          />

          <Input
            name="addressLine1"
            control={control}
            placeholder="Rebeca Winter"
            label="ADDRESS LINE 1"
            error={!!errors.addressLine1}
            required
          />
          <Input
            name="addressLine2"
            control={control}
            placeholder="Rebeca Winter"
            label="ADDRESS LINE 2"
            error={!!errors.addressLine2}
          />
          <View className="flex-row gap-x-2">
            <Input
              name="city"
              control={control}
              placeholder="Truro"
              label="CITY"
              error={!!errors.city}
              required
            />
            <Input
              name="region"
              control={control}
              placeholder="Cornwall"
              label="STATE / REGION"
              error={!!errors.region}
            />
          </View>

          <View className="flex-row gap-x-2">
            <Input
              name="zipCode"
              control={control}
              placeholder="89750"
              label="ZIP CODE"
              error={!!errors.zipCode}
              required
            />
            <Input
              name="country"
              control={control}
              placeholder="United Kingdom"
              label="COUNTRY"
              error={!!errors.country}
              required
            />
          </View>
        </View>

        <Button
          title="Continuar"
          className="mt-8 mb-10  w-full"
          onPress={handleSubmit(onSubmit)}
        />
      </Step>
    </PageContainer>
  );
}
