export const updateCart = (state) => {

  state.itemsPrice = state.cartItems.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity, 0
  })

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};