import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CartContext } from "../context/CartContext";

type Cart = {
  id?: number;
  quantity?: number;
  image?: string;
  title?: string;
  rating?: {
    rate?: number;
    count?: number;
  };
  price?: number;
};
function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  console.log("cartItems: ", cartItems);
  const total = cartItems?.reduce(
    (acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );

  const removeCart = (index: number) => {
    // Remove the item from the cart in the state by filtering it out
    const newCartItems = cartItems && cartItems.filter((item) => item.id !== index);
    setCartItems(newCartItems);

    const cart: Cart[] = JSON.parse(localStorage.getItem("carts") || "[]");
    const updatedCart = cart.filter((item: Cart) => item.id !== index);
    localStorage.setItem("carts", JSON.stringify(updatedCart));
  };

  return (
    <section className="min-h-screen pt-[80px] p-5 md:px-5 lg:px-20 flex justify-center text-black/[0.75]">
      <div className="flex flex-col w-full ">
        <div className="sm:p-10 pt-2 ">
          <h1 className="border-b pb-4 text-[25px] font-medium">Cart</h1>
        </div>
        <div className="flex flex-col-reverse lg:flex-row gap-5 sm:p-10">
          <div className="overflow-y-auto">
            <table className="border-t border-l border-r overflow-x-auto w-[800px] ">
              <tr className="grid grid-cols-[0.3fr,1fr,1fr,1fr,1fr,1fr] text-left gap-10 p-4 bg-neutral-100 border">
                <th></th>
                <th className="w-[100px]"></th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th className="pr-16">Subtotal</th>
              </tr>
              {cartItems &&
                cartItems.map((cart) => (
                  <tr className="grid grid-cols-[0.3fr,1fr,1fr,1fr,1fr,1fr] items-center gap-10 p-4 border-b">
                    <td className="flex items-center text-neutral-400 hover:text-neutral-600 transition-colors duration-300">
                      <IoMdCloseCircleOutline
                        className="text-[25px]"
                        onClick={() => removeCart(cart.id ?? 0)}
                      />
                    </td>
                    <td>
                      <span>
                        <img src={cart.image} alt={cart.title} width={50} />
                      </span>
                    </td>
                    <td>
                      <span>{cart.title}</span>
                    </td>
                    <td>
                      <span>{cart.quantity}</span>
                    </td>
                    <td>
                      <span>${cart.price}</span>
                    </td>
                    <td className="pr-16 font-bold">
                      <span>${(cart.price ?? 0) * (cart.quantity ?? 0)}</span>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
          <div className="border flex flex-col sm:w-[350px] h-[260px]">
            <span className="bg-neutral-100 p-4 border-b font-medium">Cart total</span>
            <div className="flex flex-col p-4">
              <div className="flex justify-between p-4 px-12 border-b">
                <span className="font-medium">Total</span>
                <span>${total}</span>
              </div>
            </div>
            <div className="flex items-center justify-center p-4">
              <button
                type="button"
                className="py-6 border border-orange-400 w-full font-medium hover:bg-orange-500 hover:text-white transition-colors duration-300 text-orange-500"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
