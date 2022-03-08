import React from "react";
import "./sidebarEmployee.css";
import avatar from "../../../assets/avatar.png";
const SidebarEmployee = ({ sideBarOpen, closeSideBar }) => {
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
        <h2>Management</h2>
        <div className="sidebar__link">
          <i className="fa fa-user"></i>
          <a href="#">Poinatage</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-building-o"></i>
          <a href="#">Rapport</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-wrench"></i>
          <a href="#">Heure supplimentaire</a>
        </div>

        <div className="sidebar__link">
          <i className="fa fa-handshake-o"></i>
          <a href="#">Contracts</a>
        </div>
        <h2> Congé</h2>
        <div className="sidebar__link">
          <i className="fa fa-question"></i>
          <a href="#">Demande</a>
        </div>

        <h2>Missions</h2>
        <div className="sidebar__link">
          <i className="fa fa-money"></i>
          <a href="#">Rapport de mission</a>
        </div>

        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <a href="#">Log out</a>
        </div>
      </div>
    </div>
  );
};

export default SidebarEmployee;
