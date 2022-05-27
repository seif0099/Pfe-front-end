import React,{useEffect, useState} from "react";
import "./sidebarEmployee.css";
import avatar from "../../../assets/avatar.png";
import { Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Pointage from './../pointage/Pointage';
import SuppHours from './../heure-supp/SuppHours';
import ReqLeave from './../leave/ReqLeave';
import Mutation from '../../admin/mutation/AdminMutation';
import MutationManagement from './../mutation/MutationManagement';
import Missions from "../mission/Mission";
import News from "./news";
import { Icon } from '@iconify/react';
import MutualPaper from "../mutualpaper/MutualPaper";
const SidebarEmployee = ({ sideBarOpen, closeSideBar }) => {
  let user = JSON.parse(localStorage.getItem('user-info'));
  const [myUser, setMyUser] = useState({});
  const [image, setImage] = useState(avatar);
  const [leaveNotifications, setleavenotifs] = useState(0)
  const [suppNotifications, setsuppnotifs] = useState(0)
  const [missionNotifications, setmissionnotifs] = useState(0)
  const [mutationNotifications, setmutationnotifs] = useState(0)
  const [prom, setpromnotifs] = useState(0)
  const [mutualNotifications, setmut] = useState(0)


  const [userInfo, setUserInfo] = useState({});
  const [activeComp,setActiveComp] = useState(""); 
  const [visible, setVisible] = useState([])
  const [checked, setChecked] = useState(false);

const[news,setNews]=useState([]);
  function setNewsVisible(id, status){
    visible[id] = false
  }
  async function getNotifications(){
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

          let mut = []
          let re6 = res.notifs.filter(row => 
            row.type == "mutual"
          )
          setmut(re6.length)
          
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
            let newNews = []
            for(let i=0;i<re4.length;i++){
              newNews.push(true)
             }
            setVisible(newNews)
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

}, []);
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '10vh'
}
  return (
    
    <div className={sideBarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sideBarContent">
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
        
        <div>
      {news.map((row,index) =>
       <News news={row}/>
      )}
     </div>

        <h2>Management</h2>
      <BrowserRouter forceRefresh={true}>
       <Link to="/Pointage">
        <div className="sidebar__link" onClick={()=>setActiveComp("pointage")}>
        <a><Icon icon="ant-design:calendar-twotone" hFlip={true} /></a>
        <a href="#">Pointage</a>

        </div>
        {activeComp==="pointage" && <Pointage/>}

        </Link>
        </BrowserRouter>
        <BrowserRouter forceRefresh={true}>
        <Link to="/Demande">
        <div className="sidebar__link">
          <a><Icon icon="carbon:request-quote" hFlip={true} /></a>
          <a href="#">Demande administrative</a>
        </div>
        </Link>
        </BrowserRouter>

       <BrowserRouter forceRefresh={true}>
       <Link to="/Rapport">
        <div className="sidebar__link"  onClick={()=>setActiveComp("rapport")}>
        <a><Icon icon="fa6-solid:truck-medical" hFlip={true} /></a>
        <a href="#">Rapport</a>
        </div>
        </Link>
        </BrowserRouter>
        <h2>Heure supplimentaire</h2>
        <BrowserRouter forceRefresh={true}>
        <Link to="/SuppHours">
        <div className="sidebar__link" onClick={()=>setActiveComp("suppHours")}>
          <a><Icon icon="ant-design:plus-circle-filled" hFlip={true} /></a>
          <a href="#">Demande</a>

        </div>
        {activeComp==="suppHours" && <SuppHours/>}
         </Link>
          </BrowserRouter>
          <BrowserRouter forceRefresh={true}>
        <Link to="/suppManagement">
        <div className="sidebar__link"  onClick={()=>setActiveComp("suppMng")}>
          <a><Icon icon="carbon:view-filled" hFlip={true} /></a>
          <a href="#">Consulter les demandes</a>
          <i className="bell">{suppNotifications}</i>
        </div>
       </Link>
      </BrowserRouter>



        <h2> Congé</h2>
        <BrowserRouter forceRefresh={true}>
        <Link to="/ReqLeave">
        <div className="sidebar__link"  onClick={()=>setActiveComp("ReqLeave")}>
        <a><Icon icon="ant-design:plus-circle-filled" hFlip={true} /></a>
          <a href="#">Demande</a>
        </div>
        {activeComp==="ReqLeave" && <ReqLeave/>}
       </Link>
      </BrowserRouter>
      <BrowserRouter forceRefresh={true}>
        <Link to="/LeaveManagement">
        <div className="sidebar__link"  onClick={()=>setActiveComp("ReqLeave")}>
        <a><Icon icon="carbon:view-filled" hFlip={true} /></a>
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
        <a><Icon icon="ant-design:plus-circle-filled" hFlip={true} /></a>
          <a href="#">Demande</a>
        </div>
        {activeComp==="Mutation" && <Mutation/>}
       </Link>
      </BrowserRouter>
      <BrowserRouter forceRefresh={true}>
        <Link to="/MutationManagement">
        <div className="sidebar__link"  onClick={()=>setActiveComp("Mutation")}>
        <a><Icon icon="carbon:view-filled" hFlip={true} /></a>
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
          <a><Icon icon="fa-solid:truck-moving" hFlip={true} /></a>
          <a>Missions</a>
          <i className="bell">{missionNotifications}</i>
        </div>
        {activeComp==="Missions" && <Missions/>}
       </Link>
      </BrowserRouter>



      <h2>Feuille mutuelle</h2>
        <BrowserRouter forceRefresh={true}>
        <Link to="/mutual">
        <div className="sidebar__link"  onClick={()=>setActiveComp("MutualPaper")}>
          <a><Icon icon="fa-solid:truck-moving" hFlip={true} /></a>
          <a>Feuille mutuelle</a>
          <i className="bell">{mutualNotifications}</i>
        </div>
        {activeComp==="MutualPaper" && <MutualPaper/>}
       </Link>
      </BrowserRouter>
      
       
        </div>
      </div>
    </div>
  );
};

export default SidebarEmployee;
