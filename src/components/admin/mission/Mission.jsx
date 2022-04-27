import React,{useState,useEffect} from 'react'
import "./mission.css"

function Mission() {
 
  var [res,setRes]=useState([{}]);
  const [userid,setUserid]=useState("");
  const[destination,setDest]=useState("");
  const[dateDepart,setDateDep]=useState("");
  const[dateRetour,setDateRet]=useState("");
const[objectif,setObjectif]=useState("");


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
 async function insertion (){
	  let item = {
		
		objetctMission:objectif,
		dateRetour:dateRetour,
		dateDepart:dateDepart,
		destination:destination,
		userid: userid,
	  };
	  console.log(item)
	  const URL = "http://localhost:9000/createmission"
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
			<div className="inner inner1">
				<form >
					<h3>Ordre de mission</h3>
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
							<label htmlFor="">Date de départ</label>
				   	<input type="date" className="form-control"  onChange={(e) => setDateDep(e.target.value)} />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
					
						
          
				</div>
				

                <div className="form-row last">
						<div className="form-wrapper" >
							<label htmlFor="">Date de retour</label>
				   	<input type="date" className="form-control"  onChange={(e) => setDateRet(e.target.value)} />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
					
						
          
				</div>
                <div className="form-row last">
						<div className="form-wrapper" >
							<label htmlFor="">Destination</label>
				   	<input type="text" className="form-control"  onChange={(e) => setDest(e.target.value)} />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
					</div>
                        <div className="form-row last">
						<div className="form-wrapper" >
							<label htmlFor="">Objectif</label>
				   	<input type="text" className="form-control"  onChange={(e) => setObjectif(e.target.value)} />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
				</div>
     
					<button data-text="Confirmer la présence" type="button" onClick={insertion} className='form-control button1'>
						Confirmer 
					</button>
                 
				</form>
			</div>
		</div>

  )
}

export default Mission