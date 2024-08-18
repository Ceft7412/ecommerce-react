import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { GoPerson } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { AiOutlineHeart } from "react-icons/ai";
import { CgSearch } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";

function NavigationBar() {
  const { toggleCart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="fixed z-20  bg-white shadow top-0 left-0 right-0 h-[80px] flex justify-between items-center p-6 px-10 bg-transparent">
      <ul className="flex gap-4 text-[18px] font-normal text-orange-500">
        <li
          className={`${
            location.pathname === "/"
              ? "border-b border-orange-500 cursor-default"
              : "cursor-pointer"
          }`}
          onClick={() => navigate("/")}
        >
          HOME
        </li>
        <li
          className={`${
            location.pathname === "/shop"
              ? "border-b border-orange-500 cursor-default"
              : "cursor-pointer"
          }`}
          onClick={() => navigate("/shop")}
        >
          SHOP
        </li>
      </ul>
      <div className="flex items-center">
        <div className="flex text-[25px] gap-4 text-neutral-600">
          <GoPerson />
          <AiOutlineHeart />
          <HiOutlineShoppingBag className="cursor-pointer" onClick={toggleCart} />
        </div>
      </div>
    </header>
  );
}

export default NavigationBar;
