import React from "react";
import { GoPerson } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { AiOutlineHeart } from "react-icons/ai";
import { CgSearch } from "react-icons/cg";

function NavigationBar() {
  return (
    <header className="fixed z-20  bg-white shadow top-0 left-0 right-0 h-[80px] flex justify-between items-center p-6 px-10 bg-transparent">
      <ul className="flex gap-4 text-[16px] font-medium text-neutral-500">
        <li>Home</li>
        <li>Shop</li>
      </ul>
      <div className="flex items-center">
        <div className="flex text-[25px] gap-4 text-neutral-600">
          <GoPerson />
          <AiOutlineHeart />
          <HiOutlineShoppingBag />
        </div>
      </div>
    </header>
  );
}

export default NavigationBar;
