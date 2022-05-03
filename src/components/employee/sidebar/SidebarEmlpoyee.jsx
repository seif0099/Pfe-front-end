import React,{useEffect, useState} from "react";
import "./sidebarEmployee.css";
import avatar from "../../../assets/avatar.png";
import { Link } from "react-router-dom";
import { Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Pointage from './../pointage/Pointage';
import SuppHours from './../heure-supp/SuppHours';
import ReqLeave from './../leave/ReqLeave';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Mutation from '../../admin/mutation/AdminMutation';
import MutationManagement from './../mutation/MutationManagement';
import Missions from "../mission/Mission";
import Popup from 'react-animated-popup'

const SidebarEmployee = ({ sideBarOpen, closeSideBar }) => {
  let user = JSON.parse(localStorage.getItem('user-info'));
  const [myUser, setMyUser] = useState({});
  const [image, setImage] = useState(avatar);
  const [leaveNotifications, setleavenotifs] = useState(0)
  const [suppNotifications, setsuppnotifs] = useState(0)
  const [missionNotifications, setmissionnotifs] = useState(0)
  const [mutationNotifications, setmutationnotifs] = useState(0)
  const [prom, setpromnotifs] = useState(0)

  const [userInfo, setUserInfo] = useState({});
  const [activeComp,setActiveComp] = useState(""); 
  const [visible, setVisible] = useState(false)
  const [checked, setChecked] = useState(false);

const[news,setNews]=useState([]);
    
  async function getNotifications(){
    console.log("f jbal",JSON.parse(localStorage.getItem("user-info")).user)
    let result = await fetch("http://localhost:9000/getNotifications?id="+JSON.parse(localStorage.getItem("user-info")).user._id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(function(result){
        result.json().then(function(res){
          console.log(res)
          let leaves = []
          let re = res.notifs.filter(row => 
            row.type == "leave"
          )
          setleavenotifs(re.length)
          let re1 = res.notifs.filter(row => 
            row.type == "supphours"
          )
          console.log(re1)
          setsuppnotifs(re1.length)
          let re2 = res.notifs.filter(row => 
            row.type == "mission"
          )
          setmissionnotifs(re2.length)
          let re3 = res.notifs.filter(row => 
            row.type == "mutation"
          )
          setpromnotifs(re3.length)
        
          let re4 = res.notifs.filter(row => 
            row.type == "promotion" || row.type =="sanction" 
            
            )
            setNews(re4)
         })
      }
      );
  }
  const handleChange = () => {
    setChecked(!checked);
  };
  useEffect(() =>  {
    if(JSON.parse(localStorage.getItem("user-info"))){
      console.log("dd")
      const { user } = JSON.parse(localStorage.getItem("user-info"));
      setUserInfo(user)
      
    }
    getNotifications();
    setVisible(true)

}, []);
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '10vh'
}

  return (
    
    <div className={sideBarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={"http://localhost:9000/public/uploads/"+userInfo.imageProfile} className="sidebarImage" alt="avatar" />
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
        <div className='App' >
      <Popup visible={visible} onClose={() => setVisible(false)}>
        You Have been promoted from {userInfo.service} to {news}
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />             

      </Popup>
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
        <Link to="/Demande">
        <div className="sidebar__link">
          <i className="fa fa-handshake-o"></i>
          <a href="#">Demande administrative</a>
        </div>
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
        <h2>Heure supplimentaire</h2>
        <BrowserRouter forceRefresh={true}>
        <Link to="/SuppHours">
        <div className="sidebar__link" onClick={()=>setActiveComp("suppHours")}>
          <i className="fa fa-wrench"></i>
          <a href="#">Demande</a>

        </div>
        {activeComp==="suppHours" && <SuppHours/>}
         </Link>
          </BrowserRouter>
          <BrowserRouter forceRefresh={true}>
        <Link to="/suppManagement">
        <div className="sidebar__link"  onClick={()=>setActiveComp("suppMng")}>
          <i className="fa fa-book"></i>
          <a href="#">Consulter les demandes</a>
          <i className="bell">{suppNotifications}</i>
        </div>
       </Link>
      </BrowserRouter>



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
          <i className="fa fa-book"></i>
          <a href="#">Consulter les demandes</a>
          <i className="bell">{leaveNotifications}</i>
        </div>
        {activeComp==="ReqLeave" && <ReqLeave/>}
       </Link>
      </BrowserRouter>

      <h2> Mutation</h2>
        <BrowserRouter forceRefresh={true}>
        <Link to="/Mutation">
        <div className="sidebar__link"  onClick={()=>setActiveComp("Mutation")}>
          <i className="fa fa-question"></i>
          <a href="#">Demande</a>
        </div>
        {activeComp==="Mutation" && <Mutation/>}
       </Link>
      </BrowserRouter>
      <BrowserRouter forceRefresh={true}>
        <Link to="/MutationManagement">
        <div className="sidebar__link"  onClick={()=>setActiveComp("Mutation")}>
          <i className="fa fa-book"></i>
          <a href="#">Consulter les demandes</a>
          <i className="bell">{mutationNotifications}</i>
        </div>
        {activeComp==="Mutation" && <MutationManagement/>}
       </Link>
      </BrowserRouter>




        <h2>Missions</h2>
        <BrowserRouter forceRefresh={true}>
        <Link to="/Missions">
        <div className="sidebar__link"  onClick={()=>setActiveComp("Mission")}>
          <i className="fa fa-book"></i>
          <a>Missions</a>
          <i className="bell">{missionNotifications}</i>
        </div>
        {activeComp==="Missions" && <Missions/>}
       </Link>
      </BrowserRouter>
      
       
        
      </div>
    </div>
  );
};

export default SidebarEmployee;
