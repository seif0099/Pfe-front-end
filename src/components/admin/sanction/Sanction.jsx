import React,{useState,useEffect} from 'react'
import { useFormik } from 'formik';

function Sanction() {
	var [res,setRes]=useState([{}]);
	const [errorResponse, setError] = useState("");
	const [successResponse, setSuccess] = useState("");

	useEffect(() => {
		const fetcha = async () => {
		 
		let URL = "http://localhost:9000/users"
		let result = await fetch(URL, {
		  method: "GET",
		  headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		  },
		});
		let results = await result.json();
		setRes(results);
		}
		fetcha();
	  }, []);

	async function insertion (values){
	
		
		const URL = "http://localhost:9000/addsanction"
		let result = await fetch(URL, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		  },
		  body: JSON.stringify(values),
		});
		if(result.status == 200){
			setSuccess("Demande envoyé avec succés")
		  setError(null)
		}
		else{
		  setSuccess(null)
		  setError(result)
		}
  
	  }
	  function validate(values) {
		const errors = {};
		if (!values.userid) {
		  errors.userid = "* Le champ employée est obligatoire";
		}
		if(!values.fromDate){
			errors.fromDate = "* Le champ heure début est obligatoire";
		}
		if(!values.toDate){
			errors.toDate = "* Le champ heure fin est obligatoire";
		}
		if(!values.reasonForSanction){
			errors.reasonForSanction = "* Le champ raison est obligatoire";
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
			userid: "",
			fromDate: "",
			toDate: "",
			reasonForSanction: ""
		},
		validate,
		onSubmit: (values) => {
			insertion(values)
		},
	  });
  return (
    <div className='cont'>
        <div className="wrapper wrapper4">
			<div className="inner inner4">
				<form action="submit">
					<h3>Sanction</h3>
					<div className="form-row">
						<div className="form-wrapper">
						<select className='form-control' name="userid" onChange={handleChange}>
                              <option selected value="0">Choisir l'employée</option>
                              {res.map(({ nom, prenom,_id }, index) => <option value={_id} > {nom} {prenom} </option>)}
                            </select>
						</div>
					
					</div>
					{touched.userid && errors.userid
        						? <p className="errors">{errors.userid}</p>
        						: null}
					
                    <div className="form-row">
						<div className="form-wrapper">
							<label htmlFor="">Raison de sanction  *</label>
							<input type="text" className="form-control" placeholder="Raison" name="reasonForSanction" onChange={handleChange}/>
						</div>
						
					</div>
					{touched.reasonForSanction && errors.reasonForSanction
        						? <p className="errors">{errors.reasonForSanction}</p>
        						: null}
					<div className="form-row last">
						<div className="form-wrapper">
							<label htmlFor="">Date de conseil  *</label>
				   	<input type="date" className="form-control" name="fromDate" onChange={handleChange}/>
							<i className="zmdi zmdi-chevron-down"></i>
							{touched.fromDate && errors.fromDate
        						? <p className="errors">{errors.fromDate}</p>
        						: null}
						</div>
				
          
				</div>
        
					<button data-text="Confirmer" className="form-control button1" type="button" onClick={handleSubmit}>
						Confirmer la sanction
					</button>
					{successResponse
        						? <h1 className="serverSuccess">{successResponse}</h1>
        						: null}
					{errorResponse
        						? <p className="errors">{errorResponse}</p>
        						: null}
				</form>
			</div>
		</div>


    </div>
  )
}

export default Sanction