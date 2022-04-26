import "./admin-signin.css";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

function AdminSignin() {

  const [errorResponse, setError] = useState("");

  async function login(data) {
      let result = await fetch("http://localhost:9000/admin-signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let results = await result.json();
      if (results?.success) {
        localStorage.setItem("admin-info", JSON.stringify(results));
        window.location.href = "/admin"


      }else{
        setError(results.message)
      }
    

  }

  function validate(values) {
		const errors = {};

		if (!values.email) {
		  errors.email = "* Le champ email est obligatoire";
		}
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
 
      errors.email = "le format de l'email est invalide"
 
    }
		if(!values.password){
			errors.password = "* Le champ mot de passe est obligatoire";
		}
    
    setError("")
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
            {touched.email && errors.email
                ? <p className="errors">{errors.email}</p>
                : null}
            <div className="field">
              <div>
                <label for="password">Mot de passe</label>
                
              </div>
              <input type="password" name="password" onChange={handleChange}/>
            </div>
            {touched.password && errors.password
                ? <p className="errors">{errors.password}</p>
                : null}
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

export default AdminSignin
