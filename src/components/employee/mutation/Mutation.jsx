import React, { useState, useEffect } from "react";
import "./mutation.css";
import { useFormik } from "formik";

function Mutation() {
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
    let result = await fetch("http://localhost:9000/demandeMutation", {
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
		if (!values.reasonForMutation) {
		  errors.reasonForMutation = "* Le champ type de mutation est obligatoire";
		}
	
		if(!values.to){
			errors.to = "* Le champ  est obligatoire";
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
			reasonForMutation: "",
			from: "",
			to: ""
		},
		validate,
		onSubmit: (values) => {
			createLeave(values)
		},
	  }); 
  return (
    <div className="cont">
    <div className="wrapper w11">
      <div className="inner inner2">
        <form>
          <h3>Demande de mutation</h3>
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
              <label htmlFor="">Service *</label>
              <input
                type="text"
                className="form-control"
                value={userInfo?.service}
				disabled
              />
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Nouveau Service *</label>
              <input
                type="text"
                className="form-control"
                name="to"
                onChange={handleChange}
              />

              <i className="zmdi zmdi-chevron-down"></i>
              {touched.to && errors.to
        						? <p className="errors">{errors.to}</p>
        						: null}
            </div>
          </div>
          <div className="form-wrapper">
              <label htmlFor="">Raison *</label>
              <input
                type="text"
                className="form-control"
                name="reasonForMutation"
                onChange={handleChange}
              />

              <i className="zmdi zmdi-chevron-down"></i>
              {touched.reasonForMutation && errors.reasonForMutation
        						? <p className="errors">{errors.reasonForMutation}</p>
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
    </div>
  );
}

export default Mutation;
