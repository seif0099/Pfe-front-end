import React,{useState,useEffect} from 'react'
import "./InsertPointage.css"

function InsertPointage() {
    const [nom, setNom] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userInfo, setUserInfo] = useState({});
  var [res,setRes]=useState([{}]);
  const [userid,setUserid]=useState("");
  const[pDate,setpDate]=useState("");
  const [successResponse, setSuccess] = useState("");
  const [errorResponse, setError] = useState("");



  useEffect(() => {
    const fetcha = async () => {
	  if(JSON.parse(localStorage.getItem("user-info"))){
		const { user } = JSON.parse(localStorage.getItem("user-info"));
		setUserInfo(user);
	  }
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
 async function insertion (){
	  let item = {
		
		pDate:pDate,
		userid: userid,
	  };
	  const URL = "http://localhost:9000/adminPointage"
	  let result = await fetch(URL, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  Accept: "application/json",
		},
		body: JSON.stringify(item),
	  });
	  if(result.status == 200){
		setSuccess("Employé Pointé avec succés")
	  setError(null)
	}
	else{
	  setSuccess(null)
	  setError(result)
	}
	}
    function handleUserid(e){
setUserid(e.target.value)
    }



  return (
	  <div className='cont'>
    <div className="wrapper wrapper4">
			<div className="inner inner4">
				<form>
					<h3>Pointage des employees</h3>
					<div className="form-row">
						<div className="form-wrapper">
							
                            <select className='form-control' onChange={handleUserid}>
                              <option selected value="0">Choisir l'employée</option>
                              {res.map(({ nom, prenom,_id }, index) => <option value={_id} > {nom} {prenom} </option>)}
                            </select>
                           
						</div>
					
					</div>
				
					<div className="form-row last">
						<div className="form-wrapper" >
							<label htmlFor="">Date de pointage</label>
				   	<input type="date" className="form-control"  onChange={(e) => setpDate(e.target.value)} />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
					
						
          
				</div>
				
     
					<button data-text="Confirmer la présence" type="button"  onClick={insertion} className='form-control button1'>
						Confirmer la présence
					</button>
					{successResponse
        						? <h1 className="serverSuccess">{successResponse}</h1>
        						: null}
				</form>
			</div>
		</div>
</div>
  )
}

export default InsertPointage