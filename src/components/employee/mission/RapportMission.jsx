import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';

function RapportMissions(props) {
    const [errorResponse, setError] = useState("");
	const [successResponse, setSuccess] = useState("");

  useEffect(() => {
    document.querySelector("#objectifMission").value = props.mission.objectifMission;
    document.querySelector('#dateDepart').valueAsDate = new Date(props.mission.dateDepart)
    document.querySelector('#dateRetour').valueAsDate = new Date(props.mission.dateRetour)
    document.querySelector("#destination").value = props.mission.destination;


  }, []);
  async function submitReport(values){
    let URL = "http://localhost:9000/submitReport?id="+props.mission._id
    
    let result = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",


      },
      body:JSON.stringify(values)

    },
    );
    if(result.status === 200){
      setSuccess("Rapport confirmé")
      setError("")
    }
    else {
        setSuccess("")
        setError("Echec de confirmation")
    }
    }
  function validate(values) {
    const errors = {};
    
    return errors;
  }

  const {
    handleSubmit,
    handleChange,
    touched,
    errors,
  } = useFormik({
    initialValues: {
        coutdejuner: 0,
        coutdiner: 0,
        couthebergement: 0,
        couttransport: 0,
    },
    validate,
    onSubmit: (values) => {
        submitReport(values)
    },
  });

  return (
    <div className="editModal">
      <form>
          <h3>Rapport du mission</h3>
          
          <div className="form-row last">
            <div className="form-wrapper">
              <label htmlFor="">Date départ</label>
              <input
                type="date"
                className="form-control"
                name="dateDepart"
                id="dateDepart"
                disabled
              />
              <i className="zmdi zmdi-chevron-down"></i>
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Date retour</label>
              <input
                type="date"
                className="form-control"
                name="dateRetour"
                id="dateRetour"
                disabled
              />

              <i className="zmdi zmdi-chevron-down"></i>

            </div>
            
          </div>
          <div className="divider">
          <div className="form-wrapper lDivider">
              <label htmlFor="">Destination</label>
              <input
                type="text"
                className="form-control"
                name="destination"
                id="destination"
                disabled
              />

              
            </div>
          <div className="form-wrapper rDivider">
              <label htmlFor="">Objectif du mission</label>
              <input
                type="text"
                className="form-control"
                name="objectifMission"
                id="objectifMission"
                disabled
              />

              
            </div>
            </div>
            <hr></hr>
            <div className="divider">
                <div className="form-wrapper lDivider">
                <label htmlFor="">Cout déjuner</label>
                <input
                    type="text"
                    className="form-control"
                    name="coutdejuner"
                    onChange={handleChange}
                />

                
                </div>
                <div className="form-wrapper rDivider">
                <label htmlFor="">Cout dîner</label>
                <input
                    type="text"
                    className="form-control"
                    name="coutdiner"
                    onChange={handleChange}
                />

                
                </div>
            </div>
            <div className="divider">
                <div className="form-wrapper lDivider">
                <label htmlFor="">Cout hébergement</label>
                <input
                    type="text"
                    className="form-control"
                    name="couthebergement"
                    onChange={handleChange}
                />

                
                </div>
                <div className="form-wrapper rDivider">
                <label htmlFor="">Cout transport</label>
                <input
                    type="text"
                    className="form-control"
                    name="couttransport"
                    onChange={handleChange} 
                />

                
                </div>
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
  )
}

export default RapportMissions;
