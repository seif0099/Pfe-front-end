import React, { useState } from "react";
import Main from "./admin/main/Main";
import Navbar from "./admin/navbar/Navbar";
import Sidebar from "./admin/sidebar/Sidebar";

function MainContainer() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const openSideBar = () => {
    setSideBarOpen(true);
  };
  const closeSideBar = () => {
    setSideBarOpen(false);
  };
  return (
    <>
      <Navbar sideBarOpen={sideBarOpen} openSideBar={openSideBar} />
      <Main />
      <Sidebar sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />
    </>
  );
}

export default MainContainer;
