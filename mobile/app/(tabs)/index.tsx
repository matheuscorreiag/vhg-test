import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { FilterIcon } from "@/src/components/icons/filter";
import { ProductCard } from "@/src/components/product-card";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <PageContainer>
      <PageHeader title="Produtos" className="flex-row justify-between">
        <FilterIcon />
      </PageHeader>

      <ScrollView>
        <ProductCard
          title="Swag Labs Backpack"
          price={29.99}
          rating={4}
          imageUrl=""
        />
      </ScrollView>
    </PageContainer>
  );
}
