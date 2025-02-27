import { Button } from "@/src/components/common/button";
import { Input } from "@/src/components/common/input";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { Step } from "@/src/components/common/step";
import { CompleteOrderAddress } from "@/src/data/order";
import { useCartStore } from "@/src/store/cart";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
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

    router.push("/cart/finish-steps/card");
  }

  return (
    <PageContainer>
      <PageHeader title="Checkout" />

      <Step title="Enter a shipping address" submitLabel="Continuar">
        <View className="flex-col gap-y-6">
          <Controller
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Rebeca Winter"
                label="FULL NAME"
                onChangeText={onChange}
                error={!!errors.country}
                required
              />
            )}
            name="addressName"
            control={control}
          />
          <Controller
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Mandatory 112"
                label="ADDRESS LINE 1"
                onChangeText={onChange}
                error={!!errors.country}
                required
              />
            )}
            name="addressLine1"
            control={control}
          />
          <Controller
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Entrance 1"
                label="ADDRESS LINE 2"
                onChangeText={onChange}
                error={!!errors.country}
                required
              />
            )}
            name="addressLine2"
            control={control}
          />

          <View className="flex-row gap-x-2 ">
            <Controller
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Truro"
                  label="CITY"
                  onChangeText={onChange}
                  error={!!errors.country}
                  required
                />
              )}
              name="city"
              control={control}
            />
            <Controller
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Cornwall"
                  label="STATE / REGION"
                  onChangeText={onChange}
                  error={!!errors.country}
                />
              )}
              name="region"
              control={control}
            />
          </View>

          <View className="flex-row gap-x-2 ">
            <Controller
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="89750"
                  label="ZIP CODE"
                  onChangeText={onChange}
                  error={!!errors.country}
                  required
                />
              )}
              name="zipCode"
              control={control}
            />
            <Controller
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="United Kingdom"
                  label="COUNTRY"
                  onChangeText={onChange}
                  error={!!errors.country}
                  required
                />
              )}
              name="country"
              control={control}
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
