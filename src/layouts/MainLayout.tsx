import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

function MainLayout() {
  return (
    <>
      <NavigationBar />
      <main className="pt-[80px]">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
