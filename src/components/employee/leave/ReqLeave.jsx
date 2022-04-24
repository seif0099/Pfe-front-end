import React, { useState, useEffect } from "react";
import "./leaveManagement.css";
import { useFormik } from "formik";

function ReqLeave() {
  const [userInfo, setUserInfo] = useState({});
	const [errorResponse, setError] = useState("");
	const [successResponse, setSuccess] = useState("");

  useEffect(() => {
	  if(JSON.parse(localStorage.getItem("user-info"))){
		const { user } = JSON.parse(localStorage.getItem("user-info"));
		setUserInfo(user);
	  }

  }, []);
  async function createLeave(data) {

    data.userid = userInfo?._id
    let result = await fetch("http://localhost:9000/requestleave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    if(result.status == 200){
	  	setSuccess("Demande envoyé avec succés")
		setError(null)
	  }
	  else{
		setSuccess(null)
		setError(result)
	  }
  }
  function validate(values) {
		const errors = {};
		if (!values.reasonForLeave) {
		  errors.reasonForLeave = "* Le champ type de congé est obligatoire";
		}
		if(!values.fromDate){
			errors.fromDate = "* Le champ date début est obligatoire";
		}
		if(!values.toDate){
			errors.toDate = "* Le champ date fin est obligatoire";
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
			reasonForLeave: "",
			fromDate: "",
			toDate: ""
		},
		validate,
		onSubmit: (values) => {
			createLeave(values)
		},
	  }); 
  return (
    <div className="wrapper w11">
      <div className="inner inner2">
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
                name="fromDate"
                onChange={handleChange}
              />
              <i className="zmdi zmdi-chevron-down"></i>
              {touched.fromDate && errors.fromDate
        						? <p className="errors">{errors.fromDate}</p>
        						: null}
            </div>
            <div className="form-wrapper">
              <label htmlFor="">À *</label>
              <input
                type="date"
                className="form-control"
                name="toDate"
                onChange={handleChange}
              />

              <i className="zmdi zmdi-chevron-down"></i>
              {touched.toDate && errors.toDate
        						? <p className="errors">{errors.toDate}</p>
        						: null}
            </div>
          </div>
          <div className="form-wrapper">
            <label for="">Type de congé *</label>
            <select
              className="form-control"
              name="reasonForLeave"
              onChange={handleChange}
            >
              <option selected value="">Choisir le type de congé</option>
              <option value="Maladie">Maladie</option>
              <option value="Sans solde">Sans solde</option>
              <option value="Maternité">Maternité</option>
            </select>
            {touched.reasonForLeave && errors.reasonForLeave
        						? <p className="errors">{errors.reasonForLeave}</p>
        						: null}
          </div>
          <button data-text="Confirmer" className="form-control button1" type="button" onClick={handleSubmit}>
            confirmer
          </button>
          {successResponse
        						? <h1 className="serverSuccess">{successResponse}</h1>
        						: null}
					{errorResponse
        						? <p className="errors">{errorResponse}</p>
        						: null}
        </form>
      </div>
    </div>
  );
}

export default ReqLeave;
