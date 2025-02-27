import { Button } from "@/src/components/common/button";
import { Input } from "@/src/components/common/input";
import { Step } from "@/src/components/common/stepper/step";
import { ScrollView, View } from "react-native";

interface AddressStepProps {
  onSubmit: () => void;
}
export function AddressStep({ onSubmit }: AddressStepProps) {
  return (
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

      <Button title="Continuar" className="mt-28  w-full" onPress={onSubmit} />
    </Step>
  );
}
