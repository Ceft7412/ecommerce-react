import React, { createContext, useState } from "react";

const initialState = {
  isCartOpen: false,
  toggleCart: () => {},
};

interface CartContextType {
  children: React.ReactNode;
}
export const CartContext = createContext(initialState);
function CartProvider({ children }: CartContextType) {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };
  return (
    <CartContext.Provider value={{ isCartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
