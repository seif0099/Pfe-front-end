import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

import "./supphours.css";
function SuppHours() {
  const [userInfo, setUserInfo] = useState({});
  const [errorResponse, setError] = useState("");
  const [successResponse, setSuccess] = useState("");
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user-info"))) {
      const { user } = JSON.parse(
        localStorage.getItem("user-info")
      );
      setUserInfo(user);
    }
  }, []);
  async function createSuppHours(data) {
    data.userid = userInfo._id;
    let result = await fetch(
      "http://localhost:9000/requestSuppHours",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (result.status == 200) {
      setSuccess("Demande envoyé avec succés");
      setError(null);
    } else {
      setSuccess(null);
      setError(result);
    }
  }
  function validate(values) {
    const errors = {};
    if (!values.typeOfWork) {
      errors.typeOfWork =
        "* Le champ travail est obligatoire";
    }
    if (!values.fromDate) {
      errors.fromDate =
        "* Le champ heure début est obligatoire";
    }
    if (!values.toDate) {
      errors.toDate =
        "* Le champ heure fin est obligatoire";
    }
    if (!values.date) {
      errors.date = "* Le champ date  est obligatoire";
    }
    if (values.fromDate > values.toDate) {
      errors.toDate = "* Le champ   est invalide";
    }
    return errors;
  }

  const { handleSubmit, handleChange, touched, errors } =
    useFormik({
      initialValues: {
        typeOfWork: "",
        fromDate: "",
        toDate: "",
        date: "",
      },
      validate,
      onSubmit: (values) => {
        createSuppHours(values);
      },
    });
  return (
    <div className="cont">
      <div className="wrapper">
        <div className="inner inner1">
          <form>
            <h3 classname="title2">
              Demande des heures supplémentaires
            </h3>
            <div className="form-row">
              <div className="form-wrapper">
                <label htmlFor="">Nom *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
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
                  value={userInfo.prenom}
                  disabled
                />
              </div>
            </div>

            <div className="form-row last">
              <div className="form-wrapper">
                <label htmlFor="">À partir de *</label>
                <input
                  type="time"
                  className="form-control"
                  name="fromDate"
                  onChange={handleChange}
                />
                <i className="zmdi zmdi-chevron-down"></i>
                {touched.fromDate && errors.fromDate ? (
                  <p className="errors">
                    {errors.fromDate}
                  </p>
                ) : null}
              </div>
              <div className="form-wrapper">
                <label htmlFor="">À *</label>
                <input
                  type="time"
                  className="form-control"
                  name="toDate"
                  onChange={handleChange}
                />

                <i className="zmdi zmdi-chevron-down"></i>
                {touched.toDate && errors.toDate ? (
                  <p className="errors">{errors.toDate}</p>
                ) : null}
              </div>
            </div>
            <div className="form-wrapper">
              <label for="">Date de travail</label>
              <input
                name="date"
                type="date"
                className="form-control"
                placeholder=""
                onChange={handleChange}
              />
              {touched.date && errors.date ? (
                <p className="errors">{errors.date}</p>
              ) : null}
            </div>
            <div className="form-wrapper">
              <label for="">Travail À faire *</label>
              <input
                name="typeOfWork"
                type="text"
                className="form-control"
                placeholder=""
                onChange={handleChange}
              />
              {touched.typeOfWork && errors.typeOfWork ? (
                <p className="errors">
                  {errors.typeOfWork}
                </p>
              ) : null}
            </div>
            <button
              data-text="Confirmer"
              type="button"
              className="form-control button1"
              onClick={handleSubmit}
            >
              confirmer
            </button>
            {successResponse ? (
              <h1 className="serverSuccess">
                {successResponse}
              </h1>
            ) : null}
            {errorResponse ? (
              <p className="errors">{errorResponse}</p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SuppHours;
