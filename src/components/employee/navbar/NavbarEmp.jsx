import "./navbar.css";
import avatar from "../../../assets/avatar.png";
import React from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import { useEffect,useState } from 'react';

const NavbarEmp = ({ sideBarOpen, openSideBar }) => {
  const [userInfo, setUserInfo] = useState({});
  const [myUser, setMyUser] = useState({});
  const [image, setImage] = useState(avatar);

  useEffect(() => {
	  if(JSON.parse(localStorage.getItem("user-info"))){
      console.log("xx")
      const { user } = JSON.parse(localStorage.getItem("user-info"));
      setUserInfo(user)
    }
  }, []);
  function logout(){
    localStorage.removeItem("user-info")
    window.location.href = "/login"
  }
  
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSideBar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar_left">
       
      </div>
      <div className="navbar_right">
      
        <BrowserRouter forceRefresh={true}>
        <Link to="/Profile">
          <img className="navbarImage" width={30} src={"http://localhost:9000/public/uploads/"+userInfo.imageProfile} alt="avatar" />
        </Link>
        </BrowserRouter>
        <a onClick={logout}>
        <i className="fa fa-power-off logout"></i>
        </a>
      </div>
      
    </nav>
  );
};

export default NavbarEmp;
