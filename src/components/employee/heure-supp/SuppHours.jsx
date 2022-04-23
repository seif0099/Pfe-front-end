import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

import "./supphours.css"
function SuppHours() {
	const [userInfo, setUserInfo] = useState({});
  
	useEffect(() => {
		if(JSON.parse(localStorage.getItem("user-info"))){
		  const { user } = JSON.parse(localStorage.getItem("user-info"));
		  setUserInfo(user);
		}
  
	}, []);
	 async function createSuppHours(data) {
  
	  data.userid = userInfo._id
	  console.log(data)
	  let result = await fetch("http://localhost:9000/requestSuppHours", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  Accept: "application/json",
		},
		body: JSON.stringify(data),
	  });
	  let results = await result.json();

	}
	function validate(values) {
		const errors = {};
		if (!values.travail) {
		  errors.travail = "Required";
		}
		if(!values.fromDate){
			errors.fromDate = "Required";
		}
		if(!values.toDate){
			errors.toDate = "Required";
		}
		return errors;
	  }
	
	  const {
		handleSubmit,
		handleChange,
		touched,
		errors,
	  } = useFormik({
		initialValues: {
			travail: "",
			fromDate: "",
			toDate: ""
		},
		validate,
		onSubmit: (values) => {
			createSuppHours(values)
		  console.log(JSON.stringify(values));
		},
	  });
  return (
    <div>
        
        <div className="wrapper">
			<div className="inner">
				<form>
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
				   	<input type="date" className="form-control" name="fromDate"
					                   onChange={handleChange}
									   />
							<i className="zmdi zmdi-chevron-down"></i>
							{touched.fromDate && errors.fromDate
        						? <div>{errors.fromDate}</div>
        						: null}
						</div>
						<div className="form-wrapper">
							<label htmlFor="">À *</label>
              <input type="date" className="form-control"
			                  name="toDate"
							  onChange={handleChange}
							  />

							<i className="zmdi zmdi-chevron-down"></i>
							{touched.toDate && errors.toDate
        						? <div>{errors.toDate}</div>
        						: null}
						</div>
          
				</div>
        <div className="form-wrapper">
							<label for="">Travail À faire *</label>
                            <input name="travail" type="text" className="form-control" placeholder=""
							   onChange={handleChange}/>
							   {touched.travail && errors.travail
        						? <div>{errors.travail}</div>
        						: null}

					</div>
					<button data-text="Confirmer" type="button"  onClick={handleSubmit}> 
						<span>confirmer</span>
					</button>
				</form>
			</div>
		</div>

  </div>
    
  )
}

export default SuppHours