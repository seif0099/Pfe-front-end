import "./Navbar.css";
import avatar from "../../../assets/avatar.png";
import React from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ sideBarOpen, openSideBar }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("admin-info"))) {
      const { user } = JSON.parse(
        localStorage.getItem("admin-info")
      );
      setUserInfo(user);
    }
  }, []);
  function logout() {
    localStorage.removeItem("admin-info");
    window.location.href = "/admin-signin";
  }
  return (
    <nav className="navbar">
      <div className="nav_icon">
        <i
          className="fa fa-bars"
          onClick={() => openSideBar()}
        ></i>
      </div>
      <div className="navbar_left"></div>
      <div className="navbar_right">
        <BrowserRouter forceRefresh={true}>
          <Link to="/admin/profile">
            <img
              className="navbarImage"
              width={30}
              src={
                "http://localhost:9000/public/uploads/" +
                userInfo?.imageProfile
              }
              alt="avatar"
            />
          </Link>
        </BrowserRouter>
        <a onClick={logout}>
          <i className="fa fa-power-off logout"></i>
        </a>
      </div>
    </nav>
  );
};
export default Navbar;
