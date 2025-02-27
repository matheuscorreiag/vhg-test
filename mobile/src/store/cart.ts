import { CompleteOrderAddress } from "@/src/data/order";
import { create } from "zustand";

interface CartProduct {
  productId: string;
  quantity: number;
}

interface CartState {
  count: number;
  products: CartProduct[];
  address: CompleteOrderAddress | null;
  addToCart: (item: CartProduct) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  setAddress: (address: CompleteOrderAddress) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  count: 0,
  products: [],
  address: null,
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
  setAddress: (address) => {
    set({ address });
  },
}));
