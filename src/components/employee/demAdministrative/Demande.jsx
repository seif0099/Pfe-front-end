import React, { useState, useEffect } from "react";
import "./demande.css";
import { useFormik } from "formik";

function Demande() {
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
  async function reqDemande(data) {
    data.userid = userInfo?._id;
    let result = await fetch(
      "http://localhost:9000/demandeAdministrative",
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
    if (!values.sujet) {
      errors.sujet = " Le champ sujet est obligatoire";
    }

    return errors;
  }

  const { handleSubmit, handleChange, touched, errors } =
    useFormik({
      initialValues: {
        sujet: "",
      },
      validate,
      onSubmit: (values) => {
        reqDemande(values);
      },
    });
  return (
    <div className="cont">
      <div className="wrapper w11">
        <div className="inner inner2">
          <form>
            <h3 classname="title2">
              Demande Administrative
            </h3>
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

            <div className="form-wrapper">
              <label htmlFor="">Sujet *</label>
              <textarea
                className="form-control"
                placeholder="Sujet"
                name="sujet"
                onChange={handleChange}
              ></textarea>
            </div>
            {touched.sujet && errors.sujet ? (
              <p className="errors">{errors.sujet}</p>
            ) : null}
            <button
              data-text="Confirmer"
              className="form-control button1"
              type="button"
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

export default Demande;
