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
  total: number;
  productCount: number;
  state: "CART" | "COMPLETED";
}

export interface CompleteOrderAddress {
  addressName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  region: string;
  zipCode: string;
  country: string;
}

export interface CompleteOrderCard {
  cardName: string;
  cardNumber: string;
  expiration: Date;
  securityCode: string;
}

export interface CompleteOrder
  extends CompleteOrderAddress,
    CompleteOrderCard {}
