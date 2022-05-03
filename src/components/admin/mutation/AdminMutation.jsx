import React,{useState,useEffect} from 'react'

function AdminMutation() {
  
	var [requests, setRequests] = useState([])
 
async function updateMutation(id, status){
	let URL = "http://localhost:9000/updatemutation?id="+id+"&status="+status
	let result = await fetch(URL, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});
	window.location.reload();
}
async function getRequests(){
	let URL = "http://localhost:9000/getmutations"
	let result = await fetch(URL, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});
	let results = await result.json();
	setRequests(results.result)
	requests = results
}
useEffect(() => {
	getRequests();
}, []);

  
	

  return (
	<div>
	<div className="wrapper wrapper3">
		  <div className="inner inner3">
			  <form action="submit">
				  <h3>Confirmation des mutations</h3>
		  
			  
		  
				  <div class="form-wrapper">
				  <div className="table-responsive">
				  <table className="table table-striped table-bordered" id="example" >
			<thead>
			  <tr>
				<th>Employée</th>
				<th>Service</th>
				<th>Nouveau service</th>
				<th>Raison</th>
				<th>Opérations</th>
			  </tr>
			</thead>
			<tbody>
			{console.log(requests)}
			{requests.map(row => 
			
					<tr>
										  

						<td>{row.user.nom} {row.user.prenom}</td>
						<td>{row.from}</td>
						<td>{row.to}</td>
						<td>{row.reasonForMutation}</td>
						<td className="ops">
						<i className="fa fa-check accept" onClick={() => updateMutation(row._id, "accepted")}></i>
						<i className="fa fa-trash trashbin" onClick={() => updateMutation(row._id, "refused")}></i>
						</td>
					</tr>
				)
				}
			
			</tbody>
		  </table>
					  </div>
				  </div>
			  </form>
		  </div>
	  </div>

</div>
  )
}

export default AdminMutation