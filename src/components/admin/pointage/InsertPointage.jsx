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

  useEffect(() => {
    const fetcha = async () => {
	  if(JSON.parse(localStorage.getItem("user-info"))){
		const { user } = JSON.parse(localStorage.getItem("user-info"));
		setUserInfo(user);
	  }
    let URL = "http://localhost:9000/users"
    console.log(URL)
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
	  console.log(item)
	  const URL = "http://localhost:9000/adminPointage"
	  let result = await fetch(URL, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  Accept: "application/json",
		},
		body: JSON.stringify(item),
	  });
	  let results = await result.json();

	}
    function handleUserid(e){
setUserid(e.target.value)
console.log(e.target.value);
    }



  return (
    <div className="wrapper">
			<div className="inner">
				<form onSubmit={insertion}>
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
				
     
					<button data-text="Confirmer la présence" type="submit" className='form-control'>
						<span>Confirmer la présence</span>
					</button>
                 
				</form>
			</div>
		</div>

  )
}

export default InsertPointage