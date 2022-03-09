import React from "react";
import "./mainEmployee.css";
import avatar from "../../../assets/avatar.png";
import MainContainer from "./MainContainer";
import LeaveManagement from './../leave/LeaveManagement';
const MainEmployee = () => {
  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <img src={avatar} alt="avatar" />
          <div className="main__greeting">
            <h1>hello employee</h1>
            <p>welcome to employee dashboard</p>
          </div>
        </div>
    <LeaveManagement/>
      </div>
    </main>
  );
};

export default MainEmployee;
