export interface CartProduct {
  id: string;
  color: string;
  productId: string;
  name: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  products: CartProduct[];
  state: "CART" | "COMPLETED";
}
