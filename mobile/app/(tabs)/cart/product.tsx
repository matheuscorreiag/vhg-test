import { GradientButton } from "@/src/components/common/gradient-button";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { ProductColorPicker } from "@/src/components/common/product-color-picker";
import { ProductCounter } from "@/src/components/common/product-counter";
import { ReviewStars } from "@/src/components/common/review-stars";
import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";

export default function ProductScreen() {
  return (
    <PageContainer>
      <ScrollView>
        <PageHeader title="Swag Labs Backpack" className="flex-col">
          <ReviewStars rating={4} />
        </PageHeader>

        <View className="w-full rounded-lg overflow-hidden mt-4">
          <Image
            placeholder={require("../../../assets/images/default-product-image.png")}
            style={{ width: 358, height: 358, objectFit: "cover" }}
          />
        </View>

        <View className="mt-5">
          <ProductColorPicker
            colors={["#28CE9C", "#6AC9FF", "#FFCD48", "#EDEDED"]}
          />
        </View>

        <View className="mt-6">
          <Text className="text-3xl font-semibold font-sans">R$29.99</Text>
        </View>

        <View className="mt-8 flex-row justify-between items-center gap-x-16">
          <ProductCounter />
          <GradientButton title="Adicionar ao carrinho" className="flex-1" />
        </View>
      </ScrollView>
    </PageContainer>
  );
}
