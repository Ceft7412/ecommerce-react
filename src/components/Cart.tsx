import React, { useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Cart interface for type checking the cart items
interface Cart {
  id: number;
  quantity: number;
}
function Cart() {
  const navigate = useNavigate();
  const { isCartOpen, toggleCart, cartItems, setCartItems } = useContext(CartContext);

  // Calculate the total price of the cart items
  // Reduce works by taking an array and reducing it to a single value
  // acc is the accumulator, which is the value that is returned after each iteration
  // accumulator is like a storage box that stores the value of the previous iteration and passes it to the next iteration
  // The 0 at the end is the initial value of the accumulator
  const total = cartItems?.reduce(
    (acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );
  useEffect(() => {
    // Disabling scrolling when cart is open
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    }

    // Enabling scrolling when cart is closed
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const handleRemove = (index: number) => {
    // Remove the item from the cart in the state by filtering it out
    const newCartItems = cartItems && cartItems.filter((item) => item.id !== index);
    // Update the state with the new cart items
    setCartItems(newCartItems);
    // Get the cart from local storage
    const cart: Cart[] = JSON.parse(localStorage.getItem("carts") || "[]");
    // Remove the item from the cart in local storage by filtering it out
    const updatedCart = cart.filter((item: Cart) => item.id !== index);
    localStorage.setItem("carts", JSON.stringify(updatedCart));
  };

  const handleIncrement = (index: number) => {
    // Finding the item in the state and incrementing the quantity
    const newCartItems =
      cartItems &&
      cartItems.map((item) => {
        if (item.id === index) {
          item.quantity = (item.quantity ?? 0) + 1;
        }
        return item;
      });
    // Update the state with the new cart items
    setCartItems(newCartItems);
    // Get the cart from local storage
    const cart: Cart[] = JSON.parse(localStorage.getItem("carts") || "[]");
    // Update the cart in local storage if it matches the index
    const updatedCart = cart.map((item: Cart) => {
      if (item.id === index) {
        item.quantity += 1;
      }
      return item;
    });
    localStorage.setItem("carts", JSON.stringify(updatedCart));
  };

  const handleDecrement = (index: number) => {
    // Check if the quantity is 1, if so, return nothing.
    // This is to prevent the quantity from going below 1 when the user clicks the decrement button
    if (cartItems && cartItems.find((item) => item.id === index)?.quantity === 1) {
      return;
    }
    // Finding the item in the state and decrementing the quantity
    const newCartItems =
      cartItems &&
      cartItems.map((item) => {
        if (item.id === index) {
          item.quantity = (item.quantity ?? 0) - 1;
        }
        return item;
      });
    // Update the state with the new cart items
    setCartItems(newCartItems);
    // Get the cart from local storage
    const cart: Cart[] = JSON.parse(localStorage.getItem("carts") || "[]");
    // Update the cart in local storage if it matches the index
    const updatedCart = cart.map((item: Cart) => {
      if (item.id === index) {
        item.quantity -= 1;
      }
      return item;
    });
    localStorage.setItem("carts", JSON.stringify(updatedCart));
  };
  const modalVariant = {
    hidden: {
      opacity: 0,
      x: "100%",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        type: "tween",
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.2,
        type: "tween",
      },
    },
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <section
            className="fixed overflow-hidden z-[1000] bg-black/[0.3] top-0 right-0 bottom-0 left-0"
            onClick={toggleCart}
          >
            <motion.div
              className="fixed right-0 w-[500px] top-0 bottom-0 bg-white flex flex-col"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="border-b p-4 text-[18px] font-medium flex justify-between items-center">
                <h1 className="tracking-wide">Cart</h1>
                <IoClose className="text-[23px] cursor-pointer" onClick={toggleCart} />
              </div>
              <div className="w-full p-4 flex flex-col flex-1 gap-5 overflow-y-auto">
                {cartItems &&
                  cartItems.map((item) => (
                    <div className="flex gap-4 border-b pb-4 w-full" key={item.id}>
                      <img
                        src={item.image}
                        alt={item.title}
                        width={50}
                        height={20}
                        className=""
                      />
                      <div className="flex flex-col gap-3 w-[70%]">
                        <span
                          title={item.title}
                          className="text-ellipsis overflow-hidden truncate"
                        >
                          {item.title}
                        </span>
                        <div className="text-[18px]">
                          <span
                            onClick={() => handleDecrement(item.id ?? 0)}
                            className="border-l border-t border-b p-1 px-2 cursor-pointer hover:bg-neutral-200"
                          >
                            -
                          </span>
                          <span className="border p-1 px-2">{item.quantity}</span>
                          <span
                            className="border-r border-t border-b p-1 px-2 cursor-pointer hover:bg-neutral-200"
                            onClick={() => handleIncrement(item.id ?? 0)}
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <div className="w-[20%] flex flex-col justify-between items-end text-neutral-500">
                        <MdOutlineCancel
                          className="text-[20px]"
                          onClick={() => item.id && handleRemove(item.id)}
                        />
                        <span className="text-[16px] font-medium ">
                          ${item.price && item.quantity && item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                {cartItems && cartItems.length === 0 && (
                  <div className="h-full flex items-center justify-center text-neutral-500">
                    No carts yet available.
                  </div>
                )}
              </div>
              {cartItems && cartItems.length !== 0 && (
                <div>
                  <div className="flex justify-between border items-center font-medium">
                    <span className="p-2 px-7 text-orange-400">Subtotal:</span>
                    <span className="p-2 px-7 text-neutral-600">${total}</span>
                  </div>
                  <div className="p-2 px-4">
                    <button
                      onClick={() => {
                        navigate("/shop");
                        toggleCart();
                      }}
                      type="button"
                      className="border border-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-500 tracking-widest text-orange-500 p-4 w-full font-medium"
                    >
                      CHECKOUT
                    </button>
                  </div>
                  <div className="footer flex justify-center items-center w-full p-2 px-4">
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/cart");
                        toggleCart();
                      }}
                      className="border border-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-500 tracking-widest text-orange-500 p-4 w-full font-medium"
                    >
                      GO TO CART
                    </button>
                  </div>
                </div>
              )}
              {cartItems && cartItems.length === 0 && (
                <div className="footer flex justify-center items-center w-full p-2 px-4">
                  <button
                    onClick={() => {
                      navigate("/shop");
                      toggleCart();
                    }}
                    type="button"
                    className="border border-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-500 tracking-widest text-orange-500 p-4 w-full font-medium"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              )}
            </motion.div>
          </section>
        )}
      </AnimatePresence>
    </>
  );
}

export default Cart;
