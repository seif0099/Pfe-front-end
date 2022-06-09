import React, { useState, useEffect } from "react";
import "./mission.css";
import { useFormik } from "formik";

function Mission() {
  var [res, setRes] = useState([{}]);
  const [errorResponse, setError] = useState("");
  const [successResponse, setSuccess] = useState("");

  useEffect(() => {
    const fetcha = async () => {
      let URL = "http://localhost:9000/users";
      let result = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      let results = await result.json();
      setRes(results);
    };
    fetcha();
  }, []);
  async function insertion(values) {
    let item = {
      objectifMission: values.objectifMission,
      dateRetour: values.dateRetour,
      dateDepart: values.dateDepart,
      destination: values.destination,
    };
    const URL =
      "http://localhost:9000/createmission?id=" +
      values.userid;
    let result = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });

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
    if (!values.userid) {
      errors.userid = "* Le champ employée est obligatoire";
    }
    if (!values.objectifMission) {
      errors.objectifMission =
        "* Le champ objectif mission est obligatoire";
    }
    if (!values.dateDepart) {
      errors.dateDepart =
        "* Le champ date départ est obligatoire";
    }
    if (!values.dateRetour) {
      errors.dateRetour =
        "* Le champ date retour est obligatoire";
    }
    if (!values.destination) {
      errors.destination =
        "* Le champ destination est obligatoire";
    }
    if (values.dateDepart > values.dateRetour) {
      errors.dateRetour =
        "* Le champ date de retour  est invalide";
    }

    return errors;
  }

  const { handleSubmit, handleChange, touched, errors } =
    useFormik({
      initialValues: {
        userid: "",
        dateRetour: "",
        dateDepart: "",
        objectifMission: "",
        destination: "",
      },
      validate,
      onSubmit: (values) => {
        insertion(values);
      },
    });

  return (
    <div className="cont">
      <div className="wrapper">
        <div className="inner inner1">
          <form>
            <h3>Ordre de mission</h3>
            <div className="form-row">
              <div className="form-wrapper">
                <select
                  className="form-control"
                  name="userid"
                  onChange={handleChange}
                >
                  <option selected value="0">
                    Choisir l'employée
                  </option>
                  {res.map(
                    ({ nom, prenom, _id }, index) => (
                      <option value={_id}>
                        {nom} {prenom}{" "}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            {touched.userid && errors.userid ? (
              <p className="errors">{errors.userid}</p>
            ) : null}
            <div className="form-row last">
              <div className="form-wrapper">
                <label htmlFor="">Date de départ</label>
                <input
                  type="date"
                  className="form-control"
                  name="dateDepart"
                  onChange={handleChange}
                />
                <i className="zmdi zmdi-chevron-down"></i>
              </div>
            </div>

            {touched.dateDepart && errors.dateDepart ? (
              <p className="errors">{errors.dateDepart}</p>
            ) : null}
            <div className="form-row last">
              <div className="form-wrapper">
                <label htmlFor="">Date de retour</label>
                <input
                  type="date"
                  className="form-control"
                  name="dateRetour"
                  onChange={handleChange}
                />
                <i className="zmdi zmdi-chevron-down"></i>
              </div>
            </div>
            {touched.dateRetour && errors.dateRetour ? (
              <p className="errors">{errors.dateRetour}</p>
            ) : null}
            <div className="form-row last">
              <div className="form-wrapper">
                <label htmlFor="">Destination</label>
                <input
                  type="text"
                  className="form-control"
                  name="destination"
                  onChange={handleChange}
                />
                <i className="zmdi zmdi-chevron-down"></i>
              </div>
            </div>
            {touched.destination && errors.destination ? (
              <p className="errors">{errors.destination}</p>
            ) : null}
            <div className="form-row last">
              <div className="form-wrapper">
                <label htmlFor="">Objectif</label>
                <input
                  type="text"
                  className="form-control"
                  name="objectifMission"
                  onChange={handleChange}
                />
                <i className="zmdi zmdi-chevron-down"></i>
              </div>
            </div>
            {touched.objectifMission &&
            errors.objectifMission ? (
              <p className="errors">
                {errors.objectifMission}
              </p>
            ) : null}
            <button
              data-text="Confirmer "
              type="button"
              onClick={handleSubmit}
              className="form-control button1"
            >
              Confirmer
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

export default Mission;
