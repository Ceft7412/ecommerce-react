import React, { useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

function Cart() {
  const { isCartOpen, toggleCart } = useContext(CartContext);
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
              className="fixed right-0 w-[500px] top-0 bottom-0 bg-white"
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
              <div className=""></div>
              <div className="footer absolute bottom-5 flex justify-center items-center w-full p-2 px-4">
                <button
                  type="button"
                  className="border border-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-500 tracking-widest text-orange-500 p-4 w-full font-medium"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </motion.div>
          </section>
        )}
      </AnimatePresence>
    </>
  );
}

export default Cart;
