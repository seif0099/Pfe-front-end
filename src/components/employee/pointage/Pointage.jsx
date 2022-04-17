import React from 'react'
import "./pointage.css"
import { useEffect,useState } from 'react';


function Pointage() {
    const [userInfo, setUserInfo] = useState({});
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
	  if(JSON.parse(localStorage.getItem("user-info"))){
		const { user } = JSON.parse(localStorage.getItem("user-info"));
		setUserInfo(user);
	  }

  }, []);
  async function makePresence(e) {
    e.preventDefault();

    let item = {
      fromDate,
      toDate,
      nom: userInfo?.nom,
      prenom: userInfo?.prenom,
      userid: userInfo?._id,
    };
    let result = await fetch("http://localhost:9000/pointage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    let results = await result.json();
  }
    function fullDate() {
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        const currDate = date;
        return (
          <p>{currDate}</p>
        );
      }
  return (
  
    <div class="center">
    <h1>Pointage</h1>
    <form>
      <div class="inputbox">
        <input type="text" required="required"/>
        <span>Email</span>
      </div>
      <div class="inputbox">
        <input type="text" required="required"/>
        <span>Password</span>
      </div>
      <div class="inputbox">
        <input type="button" value="submit"/>
      </div>
    </form>
  </div>

  )
}

export default Pointage