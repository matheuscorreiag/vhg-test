import { create } from "zustand";

interface CartProduct {
  id: string;
  quantity: number;
}

interface CartState {
  count: number;
  products: CartProduct[];
  addToCart: (item: CartProduct) => void;
  removeFromCart: (item: CartProduct) => void;
}

// A lógica feito foi somente adicionar o count + 1 se for um novo item do carrinho
export const useCartStore = create<CartState>((set) => ({
  count: 0,
  products: [],
  addToCart: (item) => {
    set((state) => ({
      count: !state.products.some((product) => product.id === item.id)
        ? state.count + 1
        : state.count,
      products: [...state.products, item],
    }));
  },
  removeFromCart: (item) => {
    set((state) => ({
      count: state.products.filter((product) => product.id !== item.id).length,
      products: state.products.filter((product) => product.id !== item.id),
    }));
  },
}));
