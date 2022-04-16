import React from 'react'
import "./rapport.css"
import { useState } from 'react';
import { useEffect } from 'react';
function Rapport() {
	const [userInfo, setUserInfo] = useState({});
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");

  useEffect(() => {
	  if(JSON.parse(localStorage.getItem("user-info"))){
		const { user } = JSON.parse(localStorage.getItem("user-info"));
		setUserInfo(user);
	  }

  }, []);
  async function createLeave(e) {
    e.preventDefault();

    let item = {
      date,
      place,
      
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
				<form action="submit">
					<h3>Rapport</h3>
					<div className="form-row">
						<div className="form-wrapper">
							<label htmlFor="">Nom  *</label>
							<input type="text" className="form-control" 
							placeholder="Nom"          
						    value={userInfo?.nom}
                            disabled/>
						</div>
						<div className="form-wrapper">
							<label htmlFor="">Prénom *</label>
							<input type="text" className="form-control" placeholder="Prénom"               
						     value={userInfo?.prenom}
                            disabled />
						</div>
					</div>
				
					<div className="form-row last">
						<div className="form-wrapper">
							<label htmlFor="">Date de l'accident *</label>
				   	<input type="date" className="form-control"  onChange={(e) => setDate(e.target.value)} />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
						<div className="form-wrapper">
							<label htmlFor="">Place de l'accident *</label>
                            <input type="text" className="form-control" placeholder="Place de l'accident"  onChange={(e) => setPlace(e.target.value)}/>
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
          
				</div>
     
					<button data-text="Confirmer" type="submit">
						<span>confirmer</span>
					</button>
				</form>
			</div>
		</div>


  )
}

export default Rapport