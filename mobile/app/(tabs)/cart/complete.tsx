import { PageContainer } from "@/src/components/common/page-container";
import { CompleteIcon } from "@/src/components/icons/complete";
import { Text, View } from "react-native";

export default function CompleteScreen() {
  <PageContainer>
    <View>
      <CompleteIcon />
      <Text className="text-black">Checkout completado</Text>

      <Text>
        Obrigado pelo seu pedido. Seu pedido foi despachado e chegará tão rápido
        quanto o pônei galopa
      </Text>
    </View>
  </PageContainer>;
}
