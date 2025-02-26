import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { ProductCard } from "@/src/components/common/product-card";
import { FilterIcon } from "@/src/components/icons/filter";
import { ScrollView, View } from "react-native";

const products = [
  {
    id: "1",
    title: "Swag Labs Backpackaaaaaa",
    price: 29.99,
    rating: 4,
    imageUrl: "",
  },
  {
    id: "2",
    title: "Swag Labs Bike Light",
    price: 9.99,
    rating: 4,
    imageUrl: "",
  },
  {
    id: "3",
    title: "Swag Labs Bike Dark",
    price: 9.99,
    rating: 4,
    imageUrl: "",
  },
  {
    id: "4",
    title: "Swag Labs Bike Pink",
    price: 9.99,
    rating: 4,
    imageUrl: "",
  },
];
export default function HomeScreen() {
  return (
    <PageContainer>
      <PageHeader title="Produtos" className="flex-row justify-between">
        <FilterIcon />
      </PageHeader>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="flex-row flex-wrap justify-between ">
          {products.map((item) => (
            <View key={item.title} className="w-[48%] mb-4">
              <ProductCard
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                imageUrl={item.imageUrl}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </PageContainer>
  );
}
