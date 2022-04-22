import "./Navbar.css";
import avatar from "../../../assets/avatar.png";
import React from "react";

const Navbar = ({ sideBarOpen, openSideBar }) => {
  function logout(){
    localStorage.removeItem("admin-info")
    window.location.href = "/admin-signin"
  }
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSideBar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar_left">
       
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
        <a onClick={logout}>
        <i className="fa fa-power-off logout"></i>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
