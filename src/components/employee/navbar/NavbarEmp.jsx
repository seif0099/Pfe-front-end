import "./navbar.css";
import avatar from "../../../assets/avatar.png";
import React from "react";

const NavbarEmp = ({ sideBarOpen, openSideBar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSideBar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar_left">
        <a href="#">subs</a>
        <a href="#">management</a>
        <a className="active_link" href="#">
          Admin
        </a>
      </div>
      <div className="navbar_right">
        <a href="#">
          <i className="fa fa-search"></i>
        </a>
        <a href="#">
          <i className="fa fa-clock-o"></i>
        </a>
        <a href="#">
          <img width={30} src={avatar} alt="avatar" />
        </a>
      </div>
    </nav>
  );
};

export default NavbarEmp;
