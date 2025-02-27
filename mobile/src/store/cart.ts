import { create } from "zustand";

interface CartProduct {
  productId: string;
  quantity: number;
}

interface CartState {
  count: number;
  products: CartProduct[];
  addToCart: (item: CartProduct) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  count: 0,
  products: [],
  addToCart: (item) => {
    if (
      get().products.some(
        (product) =>
          product.productId === item.productId &&
          product.quantity === item.quantity
      )
    )
      return;

    set((state) => ({
      count: state.count + 1,
      products: [...state.products, item],
    }));
  },
  updateQuantity: (itemId, quantity) => {
    console.log("UPDATE", itemId, quantity);
    if (quantity === 0) {
      set((state) => ({
        products: state.products.filter(
          (product) => product.productId !== itemId
        ),
        count: state.count - 1,
      }));
      return;
    }
    set((state) => ({
      products: state.products.map((product) =>
        product.productId === itemId ? { ...product, quantity } : product
      ),
    }));
  },
}));
