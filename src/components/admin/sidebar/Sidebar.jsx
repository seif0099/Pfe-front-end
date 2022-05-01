import React, { useState } from "react";
import "./sidebar.css";
import avatar from "../../../assets/avatar.png";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import { useEffect } from 'react';

const Sidebar = ({ sideBarOpen, closeSideBar }) => {
  var [numberOfRequests, setNB] = useState(0)
  var [numberOfHRequests, setHNB] = useState(0)
  async function getRequests(){
		let URL = "http://localhost:9000/adminRequests"
    	let result = await fetch(URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		let results = await result.json(); 
    let x = Object.getOwnPropertyNames(results)
    setNB(x.length-1)
		numberOfRequests = x.length-1
    let URL2 = "http://localhost:9000/adminSuppHours"
    	let result2 = await fetch(URL2, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		let results2 = await result2.json();
    let x2 = Object.getOwnPropertyNames(results2)
    setHNB(x2.length-1)
		numberOfHRequests = x2.length-1
	}
	useEffect(() => {
		getRequests();
	}, []);
  return (
    <div className={sideBarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={avatar} alt="avatar" />
        </div>
        <i
          className="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSideBar()}
        ></i>
      </div>
      <div className="sidebar__menu">
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>
          <a href="#">Dashboard</a>
        </div>
        <h2>MNG</h2>
        <div className="sidebar__link">
          <i className="fa fa-user"></i>
          <a href="#">Admin Management</a>
        </div>
        <BrowserRouter forceRefresh={true}>
        <Link to="/admin/promotion">
        <div className="sidebar__link">
          <i className="fa fa-building-o"></i>
          <a href="#">Promotion</a>
        </div>
        </Link>
        </BrowserRouter>
        <BrowserRouter forceRefresh={true}>
        <Link to="/admin/GestionEmp">
        <div className="sidebar__link">
          <i className="fa fa-wrench"></i>
          <a href="#">employee</a>
        </div>
        </Link></BrowserRouter>
        <BrowserRouter forceRefresh={true}>
        <Link to="/admin/sanction">
        <div className="sidebar__link">
          <i className="fa fa-archive"></i>
          <a href="#">Sanction</a>
        </div>
        </Link>
        </BrowserRouter>
        <BrowserRouter forceRefresh={true}>
        <Link to="/admin/supphours">
        <div className="sidebar__link">
          <i className="fa fa-handshake-o"></i>
          <a href="#">Heures supplémentaires</a>
          <i className="bell">{numberOfHRequests}</i>
        </div>
        </Link>
        </BrowserRouter>
        <h2> Leave</h2>
        <BrowserRouter forceRefresh={true}>
        <Link to="/admin/requests">
        <div className="sidebar__link">
          <i className="fa fa-question"></i>
          <a href="#">requests</a>
          <i className="bell">{numberOfRequests}</i>

        </div>
        </Link>
        </BrowserRouter>
        
        <h2>Missions</h2>
        <BrowserRouter forceRefresh={true}>
        <Link to="/admin/mission">
        <div className="sidebar__link">
          <i className="fa fa-money"></i>
          <a href="#">Assigner des missions</a>
       </div>
       </Link>
       </BrowserRouter>
       <BrowserRouter forceRefresh={true}>
        <Link to="/admin/rapportmissions">
        <div className="sidebar__link">
          <i className="fa fa-money"></i>
          <a>Missions</a>
       </div>
       </Link>
       </BrowserRouter>
       
       <h2>Mutation</h2>
        <BrowserRouter forceRefresh={true}>
        <Link to="/admin/mutation">
        <div className="sidebar__link">
          <i className="fa fa-money"></i>
          <a href="#">Assigner des mutations</a>
       </div>
       </Link>
       </BrowserRouter>
      </div>
    </div>
  );
};

export default Sidebar;
