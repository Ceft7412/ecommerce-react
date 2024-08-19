import React, { createContext, useState, useEffect } from "react";

const initialState: CartContextState = {
  isCartOpen: false,
  cartItems: null,
  setCartItems: () => {},
  toggleCart: () => {},
};
type CartContextState = {
  isCartOpen: boolean;
  cartItems: Cart[] | null;
  setCartItems: React.Dispatch<React.SetStateAction<Cart[] | null>>;
  toggleCart: () => void;
};

type Cart = {
  id?: number;
  title?: string;
  image?: string;
  price?: number;
  rating?: {
    rate?: number;
    count?: number;
  };
  quantity?: number;
};

type CartContextType = {
  children: React.ReactNode;
};
export const CartContext = createContext<CartContextState>(initialState);
function CartProvider({ children }: CartContextType) {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Cart[] | null>(null);
  console.log("cartItems: ", cartItems);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("carts") || "[]");
    setCartItems(cart);
  }, []);
  return (
    <CartContext.Provider value={{ isCartOpen, cartItems, toggleCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
