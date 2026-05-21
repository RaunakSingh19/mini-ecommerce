export const calcSubtotal = cartItems =>
  cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

export const calcTotal = (cartItems, shipping = 0, taxes = 0) =>
  calcSubtotal(cartItems) + shipping + taxes;   