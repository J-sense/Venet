import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

export interface ICartItem {
  id?: string;
  program_id?: string;
  title: string;
  price?: number;
  category?: string;
  image?: string;
}

export interface CartState {
  items: ICartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const exists = state.items.some(
        (item) =>
          (action.payload.id && item.id === action.payload.id) ||
          item.title.toLowerCase() === action.payload.title.toLowerCase()
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      // payload can be item id or title
      state.items = state.items.filter(
        (item) => item.id !== action.payload && item.title !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCartItems: (state, action: PayloadAction<ICartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) => state.cart.items.length;
