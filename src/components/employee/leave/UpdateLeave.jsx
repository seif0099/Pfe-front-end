import React,{ useState, useEffect } from "react";
import { useFormik } from 'formik';
import { useModal } from 'react-hooks-use-modal';

function UpdateLeave(props) {
  const [errorResponse, setError] = useState("");
	const [successResponse, setSuccess] = useState("");
 
  useEffect(() => {
    document.querySelector('#reasonForLeave option[value="'+props.request.reasonForLeave+'"]').selected = true;
    document.querySelector('#fromDate').valueAsDate = new Date(props.request.fromDate)
    document.querySelector('#toDate').valueAsDate = new Date(props.request.toDate)
  }, []);
  async function updateRequest(values){
    let URL = "http://localhost:9000/leaveupdated?id="+props.request._id
    
    let result = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",


      },
      body:JSON.stringify(values)

    },
    );
    //window.location.reload();
  }
  function validate(values) {
		const errors = {};
		if (!values.reasonForLeave) {
		  errors.reasonForLeave = "* Le champ type de congé est obligatoire";
		}
		if(!values.fromDate){
			errors.fromDate = "* Le champ date début est obligatoire";
		}
		if(!values.toDate){
			errors.toDate = "* Le champ date fin est obligatoire";
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
			reasonForLeave: props.request.reasonForLeave,
			fromDate: props.request.fromDate,
			toDate: props.request.toDate
		},
		validate,
		onSubmit: (values) => {
      updateRequest(values)
			console.log("aaaa",values)
		},
	  });
   
  return (
    <div className="editModal">
      <form>
          <h3>Modifier la demande</h3>
          
          <div className="form-row last">
            <div className="form-wrapper">
              <label htmlFor="">À partir de *</label>
              <input
                type="date"
                className="form-control"
                name="fromDate"
                onChange={handleChange}
                id="fromDate"
              />
              <i className="zmdi zmdi-chevron-down"></i>
              {touched.fromDate && errors.fromDate
        						? <p className="errors">{errors.fromDate}</p>
        						: null}
            </div>
            <div className="form-wrapper">
              <label htmlFor="">À *</label>
              <input
                type="date"
                className="form-control"
                name="toDate"
                id="toDate"

                onChange={handleChange}
              />

              <i className="zmdi zmdi-chevron-down"></i>
              {touched.toDate && errors.toDate
        						? <p className="errors">{errors.toDate}</p>
        						: null}
            </div>
          </div>
          <div className="form-wrapper">
            <label for="">Type de congé *</label>
            <select
              className="form-control"
              name="reasonForLeave"
              id = "reasonForLeave"
              onChange={handleChange}
            >
              <option selected value="">Choisir le type de congé</option>
              <option value="Maladie">Maladie</option>
              <option value="Sans solde">Sans solde</option>
              <option value="Maternité">Maternité</option>
            </select>
            {touched.reasonForLeave && errors.reasonForLeave
        						? <p className="errors">{errors.reasonForLeave}</p>
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

export default UpdateLeave;
