import "./navbar.css";
import avatar from "../../../assets/avatar.png";
import React from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";

const NavbarEmp = ({ sideBarOpen, openSideBar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSideBar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar_left">
        
        <a className="active_link" href="#">
          Employee
        </a>
      </div>
      <div className="navbar_right">
        <a href="#">
          <i className="fa fa-search"></i>
        </a>
        <a href="#">
          <i className="fa fa-clock-o"></i>
        </a>
        <BrowserRouter>
        <Link to="/Profile">
        <a href="#">
          <img width={30} src={avatar} alt="avatar" />
        </a>
        </Link>
        </BrowserRouter>
      </div>
    </nav>
  );
};

export default NavbarEmp;
