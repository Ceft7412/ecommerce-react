import React, { useContext } from "react";
import { DropDownContext } from "../context/DropDownContext";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import ScrollTop from "../components/ScrollTop";

function MainLayout() {
  const { isDropDownOpen, toggleDropDown, setIsDropDownOpen } =
    useContext(DropDownContext);
  return (
    <>
      <div onClick={() => setIsDropDownOpen(false)}>
        <NavigationBar />
        <Cart />
        <main className="max-w-screen-2xl mx-auto">
          <Outlet />
        </main>
        <ScrollTop />
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
