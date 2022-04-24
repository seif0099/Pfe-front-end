import "antd/dist/antd.css";
import "./login.css";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useFormik } from "formik";

function Login() {
	const [errorResponse, setError] = useState("");
  async function login(data) {
      let result = await fetch("http://localhost:9000/Authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let results = await result.json();
      if (results?.success) {
        localStorage.setItem("user-info", JSON.stringify(results));
        window.location.href = "/pointage"
      }else{
        setError(results.message)
      }

  }

  function validate(values) {
		const errors = {};
		if (!values.email) {
		  errors.typeOfWork = "* Le champ email est obligatoire";
		}
		if(!values.password){
			errors.fromDate = "* Le champ mot de passe est obligatoire";
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
			email: "",
			password: "",
		},
		validate,
		onSubmit: (values) => {
			login(values)
		},
	  });
  return (
      <div className="login">
        <form>
              <span className="mySpan">Se connecter</span>
                <div className="field">
                  <label for="email">Email</label>
                  <input type="email" name="email" onChange={handleChange}/>
                </div>
                <div className="field">
                  <div>
                    <label for="password">Mot de passe</label>
                    
                  </div>
                  <input type="password" name="password" onChange={handleChange}/>
                </div>
                
                <div className="field">
                  <input type="button" name="submit" value="Continue" onClick={handleSubmit}/>
                </div>
                {errorResponse
        						? <p className="errors">{errorResponse}</p>
        						: null}
                </form>
      </div>
  );
}

export default Login;
