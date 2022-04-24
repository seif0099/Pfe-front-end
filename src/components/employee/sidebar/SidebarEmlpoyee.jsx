import React,{useState} from "react";
import "./sidebarEmployee.css";
import avatar from "../../../assets/avatar.png";
import { Link } from "react-router-dom";
import { Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Pointage from './../pointage/Pointage';
import SuppHours from './../heure-supp/SuppHours';
import ReqLeave from './../leave/ReqLeave';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const SidebarEmployee = ({ sideBarOpen, closeSideBar }) => {
  let user = JSON.parse(localStorage.getItem('user-info'));
 const history = useHistory('');
  const [activeComp,setActiveComp] = useState(""); 
  function logOut(){
localStorage.clear();
history.push('/home');
  }
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
        <div className="sidebar__link active_menu_link" id="dash">
          <i className="fa fa-home"></i>
          <a href="#">Dashboard</a>
        </div>
        <h2>Management</h2>
      <BrowserRouter forceRefresh={true}>
       <Link to="/Pointage">
        <div className="sidebar__link" onClick={()=>setActiveComp("pointage")}>
          <i className="fa fa-user"></i>
          <a href="#">Pointage</a>

        </div>
        {activeComp==="pointage" && <Pointage/>}

        </Link>
        </BrowserRouter>
       <BrowserRouter forceRefresh={true}>
       <Link to="/Rapport">
        <div className="sidebar__link"  onClick={()=>setActiveComp("rapport")}>
          <i className="fa fa-building-o"></i>
          <a href="#">Rapport</a>
        </div>
        </Link>
        </BrowserRouter>
        <BrowserRouter forceRefresh={true}>
        <Link to="/SuppHours">
        <div className="sidebar__link" onClick={()=>setActiveComp("suppHours")}>
          <i className="fa fa-wrench"></i>
          <a href="#">Heure supplimentaire</a>

        </div>
        {activeComp==="suppHours" && <SuppHours/>}

        </Link>
</BrowserRouter>
        <div className="sidebar__link">
          <i className="fa fa-handshake-o"></i>
          <a href="#">Contracts</a>
        </div>

        <h2> Congé</h2>
        <BrowserRouter forceRefresh={true}>
        <Link to="/ReqLeave">
        <div className="sidebar__link"  onClick={()=>setActiveComp("ReqLeave")}>
          <i className="fa fa-question"></i>
          <a href="#">Demande</a>
        </div>
        {activeComp==="ReqLeave" && <ReqLeave/>}
       </Link>
      </BrowserRouter>
      <BrowserRouter forceRefresh={true}>
        <Link to="/LeaveManagement">
        <div className="sidebar__link"  onClick={()=>setActiveComp("ReqLeave")}>
          <i className="fa fa-question"></i>
          <a href="#">Consulter les demandes</a>
        </div>
        {activeComp==="ReqLeave" && <ReqLeave/>}
       </Link>
      </BrowserRouter>
        <h2>Missions</h2>
        <BrowserRouter forceRefresh={true}>
        <Link to="/">
        <div className="sidebar__link">
          <i className="fa fa-money"></i>
          <a href="#">Rapport de mission</a>
        </div>
        {activeComp==="ReqLeave" && <ReqLeave/>}
</Link>
</BrowserRouter>
        
      </div>
    </div>
  );
};

export default SidebarEmployee;
