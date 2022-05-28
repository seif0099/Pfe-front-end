import React, { useState, useEffect, useRef } from "react";
import "./leaveManagement.css";
import { useFormik } from "formik";

function ReqLeave() {
  const axios = require("axios");

  const [userInfo, setUserInfo] = useState({});
  const [errorResponse, setError] = useState("");
  const [successResponse, setSuccess] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [myUser, setMyUser] = useState({});
  const { user } = JSON.parse(localStorage.getItem("user-info"));
  async function createLeave(data) {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("data", JSON.stringify(data));
    formData.append("myImage", selectedImage);
    data.userid = user?._id;

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    let result = await axios
      .post("http://localhost:9000/requestleave", formData, config)
      .then((response) => {
        localStorage.setItem("user-info", JSON.stringify(response.data));
      })
      .catch((error) => {});

    if (result.status == 200) {
      setSuccess("Demande envoyé avec succés");
      setError(null);
    } else {
      setSuccess(null);
      setError(result);
    }
  }
  function validate(values) {
    const d = new Date();
    const errors = {};
    if (!values.reasonForLeave) {
      errors.reasonForLeave = "* Le champ type de congé est obligatoire";
    }
    if (!values.fromDate) {
      errors.fromDate = "* Le champ date début est obligatoire";
    }
    if (!values.toDate) {
      errors.toDate = "* Le champ date fin est obligatoire";
    }
    if (values.fromDate > values.toDate) {
      errors.toDate = "* Le champ   est invalide";
      errors.fromDate = "* Le champ   est invalide";
    }

    return errors;
  }

  const { handleSubmit, handleChange, touched, errors } = useFormik({
    initialValues: {
      reasonForLeave: "",
      fromDate: "",
      toDate: "",
    },
    validate,
    onSubmit: (values) => {
      createLeave(values);
    },
  });

  function handleChangeImage(event) {
    event.preventDefault();
    if (event.target.files.length !== 0) {
      setSelectedImage(event.target.files[0]);
    }
  }
  console.log("render");
  return (
    <div className="cont">
      <div className="wrapper w11">
        <div className="inner inner2">
          <form>
            <h3>Demande congé</h3>
            <div className="form-row">
              <div className="form-wrapper">
                <label htmlFor="">Nom *</label>
                <input type="text" className="form-control" placeholder="Nom" defaultValue={user?.nom} disabled />
              </div>
              <div className="form-wrapper">
                <label htmlFor="">Prénom *</label>
                <input type="text" className="form-control" placeholder="Prénom" defaultValue={user?.prenom} disabled />
              </div>
            </div>

            <div className="form-row last">
              <div className="form-wrapper">
                <label htmlFor="">À partir de *</label>
                <input type="date" className="form-control" name="fromDate" onChange={handleChange} />
                <i className="zmdi zmdi-chevron-down"></i>
                {touched.fromDate && errors.fromDate ? <p className="errors">{errors.fromDate}</p> : null}
              </div>
              <div className="form-wrapper">
                <label htmlFor="">À *</label>
                <input type="date" className="form-control" name="toDate" onChange={handleChange} />

                <i className="zmdi zmdi-chevron-down"></i>
                {touched.toDate && errors.toDate ? <p className="errors">{errors.toDate}</p> : null}
              </div>
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Type de congé *</label>
              <select className="form-control" name="reasonForLeave" onChange={handleChange}>
                <option selected>Choisir le type de congé</option>
                <option value="Maladie">Maladie</option>
                <option value="Sans solde">Sans solde</option>
                <option value="Maternité">Maternité</option>
              </select>
              {touched.reasonForLeave && errors.reasonForLeave ? <p className="errors">{errors.reasonForLeave}</p> : null}
            </div>
            <div className="rDivider divImg">
              <input type="file" id="file" onChange={handleChangeImage} />
            </div>
            <button data-text="Confirmer" className="form-control button1" type="button" onClick={handleSubmit}>
              confirmer
            </button>
            {successResponse ? <h1 className="serverSuccess">{successResponse}</h1> : null}
            {errorResponse ? <p className="errors">{errorResponse}</p> : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReqLeave;
