import React,{ useState, useEffect } from "react";
import { useFormik } from 'formik';
import { useModal } from 'react-hooks-use-modal';

function UpdateMutation(props) {
    const [errorResponse, setError] = useState("");
    const [successResponse, setSuccess] = useState("");
    const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("user-info")).user)
  }, []);
  async function updateMutation(values){
    values.from = userInfo.service
    let URL = "http://localhost:9000/mutationUpdated?id="+props.mutation._id
    
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
        setSuccess("Demande modifié")
        setError("")
    }
    else {
        setSuccess("")
        setError("Echec de modification")
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
        updateMutation(values)
    },
  }); 
   
  return (
    <div className="editModal">
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
                placeholder="Prénom"
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
  )
}

export default UpdateMutation;
