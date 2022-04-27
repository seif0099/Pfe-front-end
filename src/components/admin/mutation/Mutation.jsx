import React,{useState,useEffect} from 'react'

function Mutation() {
  
  var [res,setRes]=useState([{}]);
  const [userid,setUserid]=useState("");
  const[from,setFrom]=useState("");
  const[to,setTo]=useState("");
  const[raison,setRaison]=useState("");


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
		
		from:from,
		to:to,
		reasonForMutation:raison,
		userid: userid,
	  };
	  console.log(item)
	  const URL = "http://localhost:9000/adminMutation"
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
					<h3>Ordre de mutation</h3>
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
							<label htmlFor="">Ancien Departement</label>
				   	<input type="text" className="form-control"  onChange={(e) => setFrom(e.target.value)} />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
					
						
          
				</div>
				

                <div className="form-row last">
						<div className="form-wrapper" >
							<label htmlFor="">Nouveau Departement</label>
				   	<input type="text" className="form-control"  onChange={(e) => setTo(e.target.value)} />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
					
						
          
				</div>
                <div className="form-row last">
						<div className="form-wrapper" >
							<label htmlFor="">Raison de mutation</label>
				   	<input type="text" className="form-control"  onChange={(e) => setRaison(e.target.value)} />
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

export default Mutation