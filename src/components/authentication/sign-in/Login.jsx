import "antd/dist/antd.css";
import "./login.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Redirect,
} from "react-router-dom";
import { useFormik } from "formik";

function Login() {
  const [errorResponse, setError] = useState("");
  async function login(data) {
    let result = await fetch(
      "http://localhost:9000/Authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let results = await result.json();
    if (results?.success) {
      localStorage.setItem(
        "user-info",
        JSON.stringify(results)
      );
      window.location.href = "/pointage";
    } else {
      setError(results.message);
    }
  }

  function validate(values) {
    const errors = {};

    if (!values.matricule) {
      errors.matricule =
        "* Le champ matricule est obligatoire";
    }
    if (!values.password) {
      errors.password =
        "* Le champ mot de passe est obligatoire";
    }

    setError("");
    return errors;
  }

  const { handleSubmit, handleChange, touched, errors } =
    useFormik({
      initialValues: {
        matricule: "",
        password: "",
      },
      validate,
      onSubmit: (values) => {
        login(values);
      },
    });
  return (
    <div className="cont">
      <div className="login">
        <form>
          <span className="mySpan">Se connecter</span>
          <div className="field">
            <label for="matricule">matricule</label>
            <input
              type="text"
              name="matricule"
              onChange={handleChange}
            />
          </div>
          {touched.matricule && errors.matricule ? (
            <p className="errors">{errors.matricule}</p>
          ) : null}
          <div className="field">
            <div>
              <label for="password">Mot de passe</label>
            </div>
            <input
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          {touched.password && errors.password ? (
            <p className="errors">{errors.password}</p>
          ) : null}
          <div className="field">
            <input
              type="button"
              className="loginButton"
              name="submit"
              value="Continue"
              onClick={handleSubmit}
            />
          </div>
          {errorResponse ? (
            <p className="errors">{errorResponse}</p>
          ) : null}
          <BrowserRouter forceRefresh={true}>
            <Link to="/">
              <input
                type="button"
                className="loginButton2"
                name="submit"
                value="Retour"
              />
            </Link>
          </BrowserRouter>
        </form>
      </div>
    </div>
  );
}

export default Login;
