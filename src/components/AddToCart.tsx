import { useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

interface AddToCartProps {
  productId?: number;
}

function AddToCart({ productId }: AddToCartProps) {
  const { setCartItems } = useContext(CartContext);
  const handleAddToCart = async (productId: number) => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
      // Get the cart from local storage
      const cart = JSON.parse(localStorage.getItem("carts") || "[]");

      // Check if the item is already in the cart
      const existingItem = cart.find((item: any) => item.id === response.data.id);

      if (existingItem) {
        // If the item is already in the cart, increment its quantity
        existingItem.quantity += 1;
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        response.data.quantity = 1;
        cart.push(response.data);
      }
      // Update the cart in local storage
      localStorage.setItem("carts", JSON.stringify(cart));
      setCartItems((prevCartItems) => {
        if (prevCartItems) {
          // Check if the item is already in the cart
          const existingItemIndex = prevCartItems.findIndex(
            (item) => item.id === response.data.id
          );

          if (existingItemIndex !== -1) {
            // If the item is already in the cart, increment its quantity
            const newCartItems = [...prevCartItems];
            newCartItems[existingItemIndex].quantity! += 1; // Add type assertion to ensure existingItem is not undefined
            return newCartItems;
          } else {
            // If the item is not in the cart, add it with a quantity of 1
            response.data.quantity = 1;
            return [...prevCartItems, response.data];
          }
        } else {
          // If there are no items in the cart, add the new item with a quantity of 1
          response.data.quantity = 1;
          return [response.data];
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <span
      onClick={() => handleAddToCart(productId ?? 0)}
      className="font-medium rounded-full p-2 border-black border-2 hover:bg-orange-500 hover:border-orange-500 transition-colors duration-400 cursor-default hover:text-white "
    >
      Add to Cart
    </span>
  );
}

export default AddToCart;
