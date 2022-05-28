import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./admin/main/Main";
import Navbar from "./admin/navbar/Navbar";
import Sidebar from "./admin/sidebar/Sidebar";
import MainEmployee from "./employee/main/MainEmlpoyee";
import NavbarEmp from "./employee/navbar/NavbarEmp";
import SidebarEmployee from "./employee/sidebar/SidebarEmlpoyee";
import { adminRoutes, privateRoutes, publicRoutes } from "./../routes/routes";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import PrivateRoutes from "./../routes/privateRoutes";
import PublicRoutes from "../routes/publicRoute";
import Login from "../components/authentication/sign-in/Login";
import Signup from "./authentication/sign-up/Signup";
import Pointage from "./employee/pointage/Pointage";
import Home from "./home/Home";
import About from "./home/About";
import { BrowserRouter } from "react-router-dom";
import AdminRoutes from "../routes/adminRoutes";
import "./main.css";
function MainContainer() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const openSideBar = () => {
    setSideBarOpen(true);
  };
  const closeSideBar = () => {
    setSideBarOpen(false);
  };

  return (
    <Router>
      <Switch>
        {privateRoutes.map((Route, index) => (
          <PrivateRoutes key={index} path={Route.path} exact={Route.exact}>
            <NavbarEmp sideBarOpen={sideBarOpen} openSideBar={openSideBar} />

            <Route.component />
            <SidebarEmployee sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />
          </PrivateRoutes>
        ))}
        {publicRoutes.map((Route, index) => (
          <PublicRoutes key={index} path={Route.path} exact={Route.exact}>
            <Route.component />
          </PublicRoutes>
        ))}

        {adminRoutes.map((Route, index) => (
          <AdminRoutes key={index} path={Route.path} exact={Route.exact}>
            <Navbar></Navbar>
            <Route.component />
            <Sidebar></Sidebar>
          </AdminRoutes>
        ))}
      </Switch>
    </Router>
  );
}

export default MainContainer;
