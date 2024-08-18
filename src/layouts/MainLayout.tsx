import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

function MainLayout() {
  return (
    <>
      <NavigationBar />
      <main className="max-w-screen-2xl mx-auto">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
