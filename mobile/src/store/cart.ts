import { CompleteOrderAddress } from "@/src/data/order";
import { create } from "zustand";

interface CartProduct {
  productId: string;
  quantity: number;
}

interface State {
  count: number;
  products: CartProduct[];
  address: CompleteOrderAddress | null;
}
interface Actions {
  addToCart: (item: CartProduct) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  setAddress: (address: CompleteOrderAddress) => void;
  clearCart: () => void;
}

const initialState: State = {
  count: 0,
  products: [],
  address: null,
};
export const useCartStore = create<State & Actions>((set, get) => ({
  ...initialState,
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
  clearCart: () => {
    set({ ...initialState });
  },
}));
