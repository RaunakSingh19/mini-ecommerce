    import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  let items = [...state.items];
  switch (action.type) {
    case 'ADD_TO_CART':
      // handle multi-variant products, increase if same combination exists
      const idx = items.findIndex(item =>
        item.product === action.payload.product &&
        item.size === action.payload.size &&
        item.color === action.payload.color
      );
      if (idx > -1) { // exists, increment
        items[idx].quantity += action.payload.quantity;
      } else {
        items.push(action.payload);
      }
      return { ...state, items };
    case 'UPDATE_QUANTITY':
      items = items.map(item =>
        item.product === action.payload.product
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { ...state, items };
    case 'REMOVE_FROM_CART':
      items = items.filter(item => item.product !== action.payload.product);
      return { ...state, items };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

// Cart Provider
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, init => {
    const persisted = localStorage.getItem('cart');
    return persisted ? JSON.parse(persisted) : init;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

// Custom hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart outside CartProvider');
  return context;
}