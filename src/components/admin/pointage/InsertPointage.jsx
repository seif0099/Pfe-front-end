import React,{useState,useEffect} from 'react'
function InsertPointage() {
    const [nom, setNom] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userInfo, setUserInfo] = useState({});
  var [res,setRes]=useState([{}]);

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
    console.log(results)
    res=results 
console.log(res);
    }
    fetcha();
  }, []);
  function insertion (){
}
function looping (){

   
    }

  return (
    <div className="wrapper">
			<div className="inner">
				<form action="submit">
					<h3>Pointage des employees</h3>
					<div className="form-row">
						<div className="form-wrapper">
							
                            <select >
                            {res.map(({ nom, prenom,userid }, index) => <option value={userid} >{nom } {prenom}</option>)}
                            </select>
                           
						</div>
					
					</div>
				
					<div className="form-row last">
						<div className="form-wrapper">
							<label htmlFor="">Temps de debut *</label>
				   	<input type="date" className="form-control"   />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
					
						
          
				</div>
				
     
					<button data-text="Confirmer" type="submit" onClick={insertion} >
						<span>confirmer la présence</span>
					</button>
                 
                    <button data-text="Confirmer" type="submit" >
						<span>confirmer l'absence</span>
					</button>
				</form>
			</div>
		</div>

  )
}

export default InsertPointage