export interface OrderProduct {
  id: string;
  color: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  products: OrderProduct[];
  state: "CART" | "COMPLETED";
}
