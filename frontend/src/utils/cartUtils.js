export const updateCart = (state) => {

  state.itemsPrice = state.cartItems.reduce((accumulator, item) => {
    //console.log(item.product.price * (1 - item.product.discount/100) * item.quantity)
    return accumulator + item.product.price * (1 - item.product.discount/100) * item.quantity
  }, 0)

  console.log(state.itemsPrice)

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};