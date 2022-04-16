import React, { useState, useEffect } from "react";
import "./leaveManagement.css";
import History from "../../authentication/sign-up/History";
function ReqLeave() {
  const [userInfo, setUserInfo] = useState({});
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reasonForLeave, setReasonForLeave] = useState("");

  useEffect(() => {
	  if(JSON.parse(localStorage.getItem("user-info"))){
		const { user } = JSON.parse(localStorage.getItem("user-info"));
		setUserInfo(user);
	  }

  }, []);
  async function createLeave(e) {
    e.preventDefault();

    let item = {
      fromDate,
      toDate,
      reasonForLeave,
      nom: userInfo?.nom,
      prenom: userInfo?.prenom,
      userid: userInfo?._id,
    };
    let result = await fetch("http://localhost:9000/requestleave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    let results = await result.json();
  }

  return (
    <div className="wrapper">
      <div className="inner">
        <form>
          <h3>Demande congé</h3>
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
              <label htmlFor="">À partir de *</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setFromDate(e.target.value)}
              />
              <i className="zmdi zmdi-chevron-down"></i>
            </div>
            <div className="form-wrapper">
              <label htmlFor="">À *</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setToDate(e.target.value)}
              />

              <i className="zmdi zmdi-chevron-down"></i>
            </div>
          </div>
          <div className="form-wrapper">
            <label for="">Type de congé *</label>
            <select
              name=""
              id=""
              className="form-control"
              onChange={(e) => setReasonForLeave(e.target.value)}
            >
              <option value="1">Maladie</option>
              <option value="2">Sans solde</option>
              <option value="3">Maternité</option>
            </select>
          </div>
          <button data-text="Confirmer" onClick={createLeave}>
            <span>confirmer</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReqLeave;
