import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { PiMessengerLogo } from "react-icons/pi";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

type Product = {
  id?: number;
  title?: string;
  image?: string;
  price?: number;
  rating?: {
    rate?: number;
    count?: number;
  };
};
function Products() {
  const [products, setProducts] = useState<Product[] | null>([]);
  const [isMessage, setIsMessage] = useState<boolean>(false);
  const { setCartItems } = useContext(CartContext);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products?limit=7");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("products: ", products);
  useEffect(() => {
    fetchProducts();
  }, []);

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
      setIsMessage(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="h-[100%] py-6 px-16 ">
      <h1 className="font-bold text-[24px] mb-10">Products You Might Like</h1>
      <div className="grid grid-cols-4 gap-16">
        {products &&
          products.map((product) => (
            <div
              className="p-3 py-6 w-80 flex flex-col gap-2 border rounded-2xl"
              key={product.id}
            >
              <Link to={`/product/${product.id}`}>
                <div className="h-64 w-[95%] flex justify-center items-center p-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    title={product.title}
                    className="h-full w-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="h-56 text-[17px] flex flex-col justify-between">
                <div className="flex gap-4 flex-col">
                  <span className="font-medium">{product.title}</span>
                  <span className="font-medium">${product.price}</span>
                  <div className="rating flex mb-5">
                    {[...Array(5)].map((_, i) =>
                      product.rating && product.rating.rate && i < product.rating.rate ? (
                        <FaStar key={i} />
                      ) : (
                        <FaRegStar key={i} />
                      )
                    )}
                  </div>
                </div>
                <div>
                  <AddToCart productId={product.id} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Products;
