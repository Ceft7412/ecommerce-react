import React, { useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { IoClose } from "react-icons/io5";

function Cart() {
  const { isCartOpen, toggleCart } = useContext(CartContext);
  console.log("isCartOpen: ", isCartOpen);
  useEffect(() => {
    // Disable scrolling on mount
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    }

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]); // Empty array ensures effect is only run on mount and unmount

  return (
    <>
      {isCartOpen && (
        <section
          className="fixed overflow-hidden z-[1000] bg-black/[0.3] top-0 right-0 bottom-0 left-0"
          onClick={toggleCart}
        >
          <div
            className="fixed right-0 w-[500px] top-0 bottom-0 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b p-4 text-[18px] font-medium flex justify-between items-center">
              <h1 className="tracking-wide">Cart</h1>
              <IoClose className="text-[23px] cursor-pointer" onClick={toggleCart} />
            </div>
            <div className=""></div>
            <div className="footer absolute bottom-5 flex justify-center items-center w-full p-2 px-4">
              <button
                type="button"
                className="border border-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-500 tracking-widest text-orange-500 p-4 w-full font-medium"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Cart;
