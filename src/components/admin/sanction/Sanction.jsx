import { ConsoleSqlOutlined } from '@ant-design/icons';
import React,{useState,useEffect} from 'react'

function Sanction() {
	var [res,setRes]=useState([{}]);
	const [userid,setUserid]=useState("");
	const obj = new Date()
	const [fromDate,setfromDate]=useState("");
	const [toDate,settoDate]=useState("");
	const [raison,setRaison]=useState("");

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
	function handleUserid(e){
		setUserid(e.target.value)
    }
	async function insertion (){
	
		let item = {
		  userid: userid,
		  reasonForSanction: raison,
		  FromDate: fromDate,
		  ToDate: toDate
		};
		console.log(item)
		const URL = "http://localhost:9000/addsanction"
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
  return (
    <div>
        <div className="wrapper">
			<div className="inner inner1">
				<form action="submit">
					<h3>Sanction</h3>
					<div className="form-row">
						<div className="form-wrapper">
						<select className='form-control' onChange={handleUserid}>
                              <option selected value="0">Choisir l'employée</option>
                              {res.map(({ nom, prenom,_id }, index) => <option value={_id} > {nom} {prenom} </option>)}
                            </select>
						</div>
					
					</div>
                    <div className="form-row">
						<div className="form-wrapper">
							<label htmlFor="">Raison de sanction  *</label>
							<input type="text" className="form-control" placeholder="Raison" onChange={(e) => setRaison(e.target.value)}/>
						</div>
					
					</div>
				
					<div className="form-row last">
						<div className="form-wrapper">
							<label htmlFor="">À partir de  *</label>
				   	<input type="date" className="form-control" onChange={(e) => setfromDate(e.target.value)}/>
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
						<div className="form-wrapper">
							<label htmlFor="">À *</label>
              <input type="date" className="form-control" onChange={(e) => settoDate(e.target.value)}/>

							<i className="zmdi zmdi-chevron-down"></i>
						</div>
          
				</div>
        
					<button data-text="Confirmer" className="form-control button1" type="button" onClick={insertion}>
						Confirmer
					</button>
				</form>
			</div>
		</div>


    </div>
  )
}

export default Sanction