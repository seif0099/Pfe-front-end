import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./admin/main/Main";
import Navbar from "./admin/navbar/Navbar";
import Sidebar from "./admin/sidebar/Sidebar";
import MainEmployee from "./employee/main/MainEmlpoyee";
import NavbarEmp from "./employee/navbar/NavbarEmp";
import SidebarEmployee from "./employee/sidebar/SidebarEmlpoyee";
import { privateRoutes, publicRoutes } from "./../routes/routes";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import PrivateRoutes from "./../routes/privateRoutes";
import PublicRoutes from "../routes/publicRoute";
import Login from "../components/authentication/sign-in/Login"
import Signup from './authentication/sign-up/Signup';
import Pointage from "./employee/pointage/Pointage";
import Home from './home/Home';
import About from "./home/About";
import { BrowserRouter } from "react-router-dom";

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
 
      
      <NavbarEmp sideBarOpen={sideBarOpen} openSideBar={openSideBar} />
      <Router>
        <Switch>
          {privateRoutes.map((Route) => (
            <PrivateRoutes path={Route.path} exact={Route.exact}>
              <Route.component />
            </PrivateRoutes>
          ))}
          {publicRoutes.map((Route) => (
            <PublicRoutes path={Route.path} exact={Route.exact} >
              <Route.component />
            </PublicRoutes>
          ))}
        </Switch>
      </Router>
      
          
          <SidebarEmployee sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />
         
    </>
  );
}

export default MainContainer;
