export const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const getCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
};
