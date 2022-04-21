import "./navbar.css";
import avatar from "../../../assets/avatar.png";
import React from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import { useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  
import { Redirect } from "react-router-dom";
const NavbarEmp = ({ sideBarOpen, openSideBar }) => {
  const [userInfo, setUserInfo] = useState({});
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');

  useEffect(() => {
	  if(JSON.parse(localStorage.getItem("user-info"))){
		const { user } = JSON.parse(localStorage.getItem("user-info"));
		setUserInfo(user);
	  }

  }, []);
  function logout(){
    localStorage.removeItem("user-info")
    window.location.href = "/"
  }
  
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSideBar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar_left">
        
        <a className="active_link" href="#">
          Bienvenu {userInfo?.nom} {userInfo?.prenom}
        </a>
      </div>
      <div className="navbar_right">
        <a href="#">
          <i className="fa fa-search"></i>
        </a>
        <a href="#">
          <i className="fa fa-clock-o"></i>
        </a>
        <BrowserRouter forceRefresh={true}>
        <Link to="/Profile">
          <img width={30} src={avatar} alt="avatar" />
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
