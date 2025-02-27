import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { Stepper } from "@/src/components/common/stepper";

export default function FinishStepsScreen() {
  return (
    <PageContainer>
      <PageHeader title="Checkout" />
      <Stepper />
    </PageContainer>
  );
}
