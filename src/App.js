import { useState } from "react";
import "./index.css";

import Signup from "./components/authentication/sign-up/Signup";
import ApplyLeave from "./components/admin/leave-management/ApplyLeave";
import MainContainer from "./components/MainContainer";
import Home from "./components/home/Home";

const App = () => {
  return (
    <div className="app__container">
     
      <MainContainer />
    </div>
  );
};

export default App;
