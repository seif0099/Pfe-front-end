import React, { useState } from "react";
import Main from "./admin/main/Main";
import Navbar from "./admin/navbar/Navbar";
import Sidebar from "./admin/sidebar/Sidebar";
import MainEmployee from "./employee/main/MainEmlpoyee";
import NavbarEmp from './employee/navbar/NavbarEmp';
import SidebarEmployee from './employee/sidebar/SidebarEmlpoyee';
import Pointage from "./employee/pointage/Pointage";
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
     {/* <Navbar sideBarOpen={sideBarOpen} openSideBar={openSideBar} />
      <Main />
  <Sidebar sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />*/}

<NavbarEmp sideBarOpen={sideBarOpen} openSideBar={openSideBar} />
      <Pointage />
  <SidebarEmployee sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />*
    </>
  );
}

export default MainContainer;
