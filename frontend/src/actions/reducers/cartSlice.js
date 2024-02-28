import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtils";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [], shippingAddress: '' };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const productId = action.payload;
            if (state.cartItems.find((x) => x._id === productId)) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === productId ? { ...x, quantity: x.quantity + 1 } : x
                );
                return updateCart(state);
            } else {
                state.cartItems = [...state.cartItems, { _id: productId, quantity: 1 }];
                return updateCart(state);
            }
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },

        clearCartItems: (state, action) => {
            state.cartItems = [];
            localStorage.setItem("cart", JSON.stringify(state));
        },

        resetCart: (state) => (state = initialState),
    },
});

export const {
    addToCart,
    removeFromCart,
    savePaymentMethod,
    saveShippingAddress,
    clearCartItems,
    resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;