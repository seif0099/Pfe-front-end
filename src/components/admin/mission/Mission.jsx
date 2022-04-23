import React,{useState,useEffect} from 'react'
import "./mission.css"

function Mission() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userInfo, setUserInfo] = useState({});
  var [res,setRes]=useState([{}]);
  const [userid,setUserid]=useState("");

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
		console.log("ahla")
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
				   	<input type="date" className="form-control"  onChange={(e) => setpDate(e.target.value)} />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
					
						
          
				</div>
				

                <div className="form-row last">
						<div className="form-wrapper" >
							<label htmlFor="">Date de retour</label>
				   	<input type="date" className="form-control"  onChange={(e) => setpDate(e.target.value)} />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
					
						
          
				</div>
                <div className="form-row last">
						<div className="form-wrapper" >
							<label htmlFor="">Destination</label>
				   	<input type="text" className="form-control"  onChange={(e) => setpDate(e.target.value)} />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
					</div>
                        <div className="form-row last">
						<div className="form-wrapper" >
							<label htmlFor="">Objectif</label>
				   	<input type="text" className="form-control"  onChange={(e) => setpDate(e.target.value)} />
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

export default Mission