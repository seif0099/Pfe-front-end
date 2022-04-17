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
  
   <div className="limiter" >
       <div className="wrapper">
      <div className="inner" >
        <form>
          <h3>pointage</h3>
          <div className="form-row">
            <div className="form-wrapper">
              <label htmlFor="">Nom *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nom"
                value={userInfo?.nom}
				disabled
              />
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Prénom *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Prénom"
                value={userInfo?.prenom}
				disabled
              />
            </div>
          </div>

          <div className="form-row last">
            <div className="form-wrapper">
              <label htmlFor="">Date d'entrée*</label>
              <input
                type="time"
                className="form-control"
                onChange={(e) => setFromDate(e.target.value)}
              />
              <i className="zmdi zmdi-chevron-down"></i>
            </div>
            <div className="form-wrapper">
              <label htmlFor="">À *</label>
              <input
                type="time"
                className="form-control"
                onChange={(e) => setToDate(e.target.value)}
              />

              <i className="zmdi zmdi-chevron-down"></i>
            </div>
          </div>
          <div className="form-wrapper">
         
          </div>
          <button data-text="Confirmer" onClick={makePresence}>
            <span>confirmer</span>
          </button>
        </form>
      </div>
    </div>

</div>

  )
}

export default Pointage