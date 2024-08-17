import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Outlet />
      <div className="">hey</div>
    </>
  );
}

export default MainLayout;
