import React, { useState } from "react";
import "./sidebar.css";
import avatar from "../../../assets/avatar.png";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Icon } from "@iconify/react";

const Sidebar = ({ sideBarOpen, closeSideBar }) => {
  const [userInfo, setUserInfo] = useState({});
  const [leaveNotifications, setleavenotifs] = useState(0);
  const [suppNotifications, setsuppnotifs] = useState(0);
  const [missionNotifications, setmissionnotifs] =
    useState(0);
  const [mutationNotifications, setmutationnotifs] =
    useState(0);
  const [demandesNotifications, setdemandesNotifications] =
    useState(0);
  const [rapportNotifications, setRapportNotifications] =
    useState(0);

  async function getNotifications() {
    let result = await fetch(
      "http://localhost:9000/getAdminNotifications",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then(function (result) {
      result.json().then(function (res) {
        let leaves = [];
        let re = res.notifs.filter(
          (row) => row.type == "leave"
        );
        setleavenotifs(re.length);
        let re1 = res.notifs.filter(
          (row) => row.type == "supphours"
        );
        setsuppnotifs(re1.length);
        let re2 = res.notifs.filter(
          (row) => row.type == "mission"
        );
        setmissionnotifs(re2.length);
        let re3 = res.notifs.filter(
          (row) => row.type == "mutation"
        );
        setmutationnotifs(re3.length);
        let re4 = res.notifs.filter(
          (row) => row.type == "demande"
        );
        setdemandesNotifications(re4.length);
        let re5 = res.notifs.filter(
          (row) => row.type == "accident"
        );
        setRapportNotifications(re5.length);
      });
    });
  }
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("admin-info"))) {
      const { user } = JSON.parse(
        localStorage.getItem("admin-info")
      );
      setUserInfo(user);
    }
    getNotifications();
  }, []);
  return (
    <div
      className={sideBarOpen ? "sidebar_responsive" : ""}
      id="sidebar"
    >
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img
            src={
              "http://localhost:9000/public/uploads/" +
              userInfo.imageProfile
            }
            className="sidebarImage"
            alt="avatar"
          />
        </div>
        <i
          className="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSideBar()}
        ></i>
      </div>
      <div className="sidebar__menu">
        <h2>Admin Management</h2>
        <BrowserRouter forceRefresh={true}>
          <Link to="/admin/GestionEmp">
            <div className="sidebar__link">
              <Icon
                icon="bx:user"
                width="25"
                height="25"
                hFlip={true}
              />
              <a href="#">Employée</a>
            </div>
          </Link>
        </BrowserRouter>
        <BrowserRouter forceRefresh={true}>
          <Link to="/admin/pointage">
            <div className="sidebar__link">
              <Icon
                icon="bx:user"
                width="25"
                height="25"
                hFlip={true}
              />
              <a href="#">Pointage</a>
            </div>
          </Link>
        </BrowserRouter>
        <BrowserRouter forceRefresh={true}>
          <Link to="/admin/promotion">
            <div className="sidebar__link">
              <Icon
                icon="ep:promotion"
                width="25"
                height="25"
              />
              <a href="#">Promotion</a>
            </div>
          </Link>
        </BrowserRouter>

        <BrowserRouter forceRefresh={true}>
          <Link to="/admin/sanction">
            <div className="sidebar__link">
              <Icon
                icon="ci:warning-outline"
                width="25"
                height="25"
              />
              <a href="#">Sanction</a>
            </div>
          </Link>
        </BrowserRouter>
        <BrowserRouter forceRefresh={true}>
          <Link to="/admin/supphours">
            <div className="sidebar__link">
              <Icon
                icon="clarity:hourglass-outline-alerted"
                width="25"
                height="25"
              />
              <a href="#">Heures supplémentaires</a>
              <i className="bell">{suppNotifications}</i>
            </div>
          </Link>
        </BrowserRouter>
        <BrowserRouter forceRefresh={true}>
          <Link to="/admin/demandesadmin">
            <div className="sidebar__link">
              <Icon
                icon="wpf:ask-question"
                width="25"
                height="25"
              />
              <a href="#">Demandes administratives</a>
              <i className="bell">
                {demandesNotifications}
              </i>
            </div>
          </Link>
        </BrowserRouter>
        <BrowserRouter forceRefresh={true}>
          <Link to="/admin/rapport">
            <div className="sidebar__link">
              <Icon
                icon="fa6-solid:truck-medical"
                width="25"
                height="25"
              />
              <a href="#">Rapports des accidents</a>
              <i className="bell">{rapportNotifications}</i>
            </div>
          </Link>
        </BrowserRouter>
        <h2> Congé</h2>
        <BrowserRouter forceRefresh={true}>
          <Link to="/admin/requests">
            <div className="sidebar__link">
              <Icon
                icon="pepicons:leave"
                width="25"
                height="25"
              />
              <a href="#">Demandes congé</a>
              <i className="bell">{leaveNotifications}</i>
            </div>
          </Link>
        </BrowserRouter>

        <h2>Missions</h2>
        <BrowserRouter forceRefresh={true}>
          <Link to="/admin/mission">
            <div className="sidebar__link">
              <Icon
                icon="akar-icons:arrow-back"
                width="25"
                height="25"
                hFlip={true}
              />
              <a href="#">Assigner des missions</a>
            </div>
          </Link>
        </BrowserRouter>
        <BrowserRouter forceRefresh={true}>
          <Link to="/admin/rapportmissions">
            <div className="sidebar__link">
              <Icon
                icon="akar-icons:eye"
                width="25"
                height="25"
                hFlip={true}
              />
              <a>Missions</a>
              <i className="bell">{missionNotifications}</i>
            </div>
          </Link>
        </BrowserRouter>

        <h2>Mutation</h2>
        <BrowserRouter forceRefresh={true}>
          <Link to="/admin/mutation">
            <div className="sidebar__link">
              <Icon
                icon="material-symbols:change-circle-outline-rounded"
                width="25"
                height="25"
                hFlip={true}
              />
              <a href="#">Mutations</a>
              <i className="bell">
                {mutationNotifications}
              </i>
            </div>
          </Link>
        </BrowserRouter>

        <BrowserRouter forceRefresh={true}>
          <Link to="/admin/mutualpaper">
            <div className="sidebar__link">
              <Icon
                icon="material-symbols:change-circle-outline-rounded"
                width="25"
                height="25"
                hFlip={true}
              />
              <a href="#">Feuille mutuelle</a>
            </div>
          </Link>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Sidebar;
