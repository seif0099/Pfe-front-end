import React,{useState,useEffect} from 'react'
import "./promotion.css"

function Promotion() {
    const [nom, setNom] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userInfo, setUserInfo] = useState({});
  var [res,setRes]=useState([{}]);
  const [userid,setUserid]=useState("");
  const[oldPoste,setOldPoste]=useState("");
  const[newPoste,setNewPoste]=useState("");
  const[datePromo,setDatePromo]=useState("");

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
		
		oldPoste:oldPoste,
		newPoste:newPoste,
		datePromo:datePromo,
		userid: userid,
	  };
	  console.log(item)
	  const URL = "http://localhost:9000/updateprom"
	  let result = await fetch(URL, {
		method: "PUT",
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
					<h3>Promotion</h3>
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
							<label htmlFor="">Poste Ancien</label>
				   	<input type="text" className="form-control" value={userInfo?.postEmp} disabled/>
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
					
						
          
				</div>
				<div className="form-row last">
						<div className="form-wrapper" >
							<label htmlFor=""> Nouveau Poste </label>
				   				<input type="text" className="form-control"  onChange={(e) => setNewPoste(e.target.value)} />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
				</div>
				
				<div className="form-row last">
						<div className="form-wrapper" >
							<label htmlFor="">A partir de </label>
				   				<input type="date" className="form-control"  onChange={(e) => setDatePromo(e.target.value)} />
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

export default Promotion