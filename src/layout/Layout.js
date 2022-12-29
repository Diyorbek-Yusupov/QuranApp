import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const MainLayout = () => {
   return (
      <div>
         <Navbar />
         <Outlet />
      </div>
   );
};

export default MainLayout;
