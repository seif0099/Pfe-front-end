import React from 'react'
import "./rapport.css"
import { useState } from 'react';
import { useEffect } from 'react';
import { useFormik } from "formik";

function Rapport() {
	const [userInfo, setUserInfo] = useState({});
  const [dateAcc, setDateAcc] = useState("");
  const [place, setPlace] = useState("");
  const [condition, setCondition] = useState("");
  useEffect(() => {
	  if(JSON.parse(localStorage.getItem("user-info"))){
		const { user } = JSON.parse(localStorage.getItem("user-info"));
		setUserInfo(user);
	  }

  }, []);
  async function reqRapport(values) {
    let result = await fetch("http://localhost:9000/requestRapport?id="+userInfo._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    });
    let results = await result.json();
  }
  function validate(values) {
	const errors = {};
	if (!values.dateAcc) {
	  errors.dateAcc = "* Le champ date accident est obligatoire";
	}
	if(!values.condition){
		errors.condition = "* Le champ condition est obligatoire";
	}
	if(!values.place){
		errors.place = "* Le champ place accident est obligatoire";
	}
	return errors;
  }

  const {
	handleSubmit,
	handleChange,
	touched,
	errors,
values
  } = useFormik({
	initialValues: {
		dateAcc: "",
		condition: "",
		place: "",
	},
	validate,
	onSubmit: (values) => {
		reqRapport(values)
	},
  }); 
  return (
   
          <div className="wrapper">
			<div className="inner inner2">
				<form action="submit">
					<h3>Rapport Accident</h3>
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
				   	<input type="date" className="form-control" name="dateAcc"  onChange={handleChange} />
							<i className="zmdi zmdi-chevron-down"></i>
							{touched.dateAcc && errors.dateAcc
        						? <p className="errors">{errors.dateAcc}</p>
        						: null}
						</div>
						<div className="form-wrapper">
							<label htmlFor="">Place de l'accident *</label>
                            <input type="text" className="form-control" placeholder="Place de l'accident"   name="place"  onChange={handleChange}/>
							<i className="zmdi zmdi-chevron-down"></i>
							{touched.place && errors.place
        						? <p className="errors">{errors.place}</p>
        						: null}
						</div>
          
				</div>
				<div className="form-wrapper">
							<label htmlFor="">Condition de l'accident *</label>
                            <input type="text" className="form-control" placeholder="Condition de l'accident"  name="condition"  onChange={handleChange}/>
							<i className="zmdi zmdi-chevron-down"></i>
							{touched.condition && errors.condition
        						? <p className="errors">{errors.condition}</p>
        						: null}
						</div>
     
					<button data-text="Confirmer" type="submit" className='form-control button1' onClick={handleSubmit}>
						confirmer
					</button>
				</form>
			</div>
		</div>


  )
}

export default Rapport