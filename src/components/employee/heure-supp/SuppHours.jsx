import React, { useState, useEffect } from "react";

import "./supphours.css"
function SuppHours() {
	const [userInfo, setUserInfo] = useState({});
	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");
	const [typeOfWork, setTypeOfWork] = useState("");
	const[nom,setNom]=useState("");
	const[prenom,setPrenom]=useState("");
  
	useEffect(() => {
		if(JSON.parse(localStorage.getItem("user-info"))){
		  const { user } = JSON.parse(localStorage.getItem("user-info"));
		  setUserInfo(user);
		}
  
	}, []);
	 async function createSuppHours(e) {
	  e.preventDefault();
  
	  let item = {
		fromDate,
		toDate,
		typeOfWork,
		nom: userInfo?.nom,
		prenom: userInfo?.prenom,
		userid: userInfo?._id,
	  };
	  let result = await fetch("http://localhost:9000/requestSuppHours", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  Accept: "application/json",
		},
		body: JSON.stringify(item),
	  });
	  let results = await result.json();
	  localStorage.setItem("user-info",JSON.stringify(results))

	}
	
  return (
    <div>
        
        <div className="wrapper">
			<div className="inner">
				<form action="submit">
					<h3>Demande des heures supplémentaires</h3>
					<div className="form-row">
						<div className="form-wrapper">
							<label htmlFor="">Nom  *</label>
							<input type="text" 
							className="form-control" 
							placeholder="Your Name"   
							value={userInfo?.nom}
							disabled/>
						</div>
						<div className="form-wrapper">
							<label htmlFor="">Prénom *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Prénom"
                value={userInfo.prenom}
				disabled
				/>
						</div>
					</div>
				
					<div className="form-row last">
						<div className="form-wrapper">
							<label htmlFor="">À partir de  *</label>
				   	<input type="date" className="form-control" 
					                   onChange={(e) => setFromDate(e.target.value)}
									   />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
						<div className="form-wrapper">
							<label htmlFor="">À *</label>
              <input type="date" className="form-control"
			                  onChange={(e) => setToDate(e.target.value)}
							  />

							<i className="zmdi zmdi-chevron-down"></i>
						</div>
          
				</div>
        <div className="form-wrapper">
							<label for="">Travail À faire *</label>
                            <input type="text" className="form-control" placeholder=""
							  onChange={(e) => setTypeOfWork(e.target.value)}/>

					</div>
					<button data-text="Confirmer"  onClick={createSuppHours}> 
						<span>confirmer</span>
					</button>
				</form>
			</div>
		</div>

  </div>
    
  )
}

export default SuppHours