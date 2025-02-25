import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { FilterIcon } from "@/src/components/icons/filter";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <PageContainer>
      <PageHeader title="Produtos" className="flex-row justify-between">
        <FilterIcon />
      </PageHeader>

      <ScrollView></ScrollView>
    </PageContainer>
  );
}
