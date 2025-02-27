import { AddressStep } from "@/src/components/common/stepper/address-step";
import { CardStep } from "@/src/components/common/stepper/card-step";
import { useState } from "react";

enum Steps {
  Address,
  Payment,
}

export function Stepper() {
  const [step, setStep] = useState<Steps>(Steps.Address);

  if (step === Steps.Address) {
    return <AddressStep onSubmit={() => setStep(Steps.Payment)} />;
  }

  return <CardStep onSubmit={() => setStep(Steps.Address)} />;
}
