import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Cart from "../components/Cart";

function MainLayout() {
  return (
    <>
      <NavigationBar />
      <Cart />
      <main className="max-w-screen-2xl mx-auto">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
