import { EmptyCart } from "@/src/components/common/empty-cart";
import { PageContainer } from "@/src/components/common/page-container";
import { useCart } from "@/src/hooks/cart/useCart";
import { useRouter } from "expo-router";

export default function CartScreen() {
  const router = useRouter();
  const { cart } = useCart();

  return (
    <PageContainer className="flex-1 items-center justify-center">
      {cart?.products?.length === 0 && <EmptyCart />}
    </PageContainer>
  );
}
