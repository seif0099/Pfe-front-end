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
  const [myUser, setMyUser] = useState({});
  const [image, setImage] = useState(avatar);

  async function getUserInfo(){
    let result = await fetch("http://localhost:9000/getuserbyid?id="+JSON.parse(localStorage.getItem("user-info")).user._id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(function(result){
        result.json().then(function(res){
          setMyUser(res)
          setImage("http://localhost:9000/public/uploads/"+res.imageProfile)
        })
      }
      );
  }
  useEffect(() => {
	  if(JSON.parse(localStorage.getItem("user-info"))){
		const { user } = JSON.parse(localStorage.getItem("user-info"));
		setUserInfo(user);
	  }
    getUserInfo();
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
          <img className="navbarImage" width={30} src={image} alt="avatar" />
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
