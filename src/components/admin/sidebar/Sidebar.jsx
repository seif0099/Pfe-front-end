import React from "react";
import "./sidebar.css";
import avatar from "../../../assets/avatar.png";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
const Sidebar = ({ sideBarOpen, closeSideBar }) => {
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
        <div className="sidebar__link">
          <i className="fa fa-building-o"></i>
          <a href="#">Promotion</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-wrench"></i>
          <a href="#">employee</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-archive"></i>
          <a href="#">Sanction</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-handshake-o"></i>
          <a href="#">Contracts</a>
        </div>
        <h2> Leave</h2>
        <BrowserRouter forceRefresh={true}>
        <Link to="/admin/requests">
        <div className="sidebar__link">
          <i className="fa fa-question"></i>
          <a href="#">requests</a>
        </div>
        </Link>
        </BrowserRouter>
        
        <h2>Missions</h2>
        <div className="sidebar__link">
          <i className="fa fa-money"></i>
          <a href="#">Assigner des missions</a>
       </div>
      </div>
    </div>
  );
};

export default Sidebar;
