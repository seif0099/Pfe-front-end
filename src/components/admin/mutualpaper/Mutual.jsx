import React,{useState,useEffect} from 'react'
import { useFormik } from 'formik';

function Mutual() {
 
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
	  let item = {
		numPaper:values.numPaper,
		status:values.status,
		
	  };
	  console.log("aaaaaaaa")
	  const URL = "http://localhost:9000/createmutualpaper?id="+values.userid
	  let result = await fetch(URL, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  Accept: "application/json",
		},
		body: JSON.stringify(item),
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
			numPaper: "",
			status: "",
			
		},
		validate,
		onSubmit: (values) => {
			insertion(values)
		},
	  });

  return (
	  <div className='cont'>
    <div className="wrapper">
			<div className="inner inner1">
				<form >
					<h3>Feuille Mutuelle</h3>
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
				
                <div className="form-row last">
						<div className="form-wrapper" >
							<label htmlFor="">Numéro de feuille</label>
				   	<input type="text" className="form-control"  name="numPaper" onChange={handleChange} />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
					
					</div>
					{touched.numPaper && errors.numPaper
        						? <p className="errors">{errors.numPaper}</p>
        						: null}
					
                        <div className="form-row last">
						<div className="form-wrapper" >
                            <select className='form-control' name="status" onChange={handleChange}>
                              <option selected value="0">Etat</option>
                              <option value ='Traité'>Traité</option>
                              <option value ='Non Traité'>Non Traité</option>
                              <option value ='En Attente'>En Attente</option>


                            </select>
                           
							<i className="zmdi zmdi-chevron-down"></i>
							{touched.status && errors.status
        						? <p className="errors">{errors.status}</p>
        						: null}
				
						</div>
					
				</div>
			
					<button data-text="Confirmer la présence" type="button" onClick={handleSubmit} className='form-control button1'>
						Confirmer 
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

export default Mutual