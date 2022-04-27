import React from "react";
import "./applyleave.css";
import { useEffect,useState } from 'react';

function ApplyLeave() {
	var [requests, setRequests] = useState([])
	async function acceptRequest(id){
		console.log(id)
		let URL = "http://localhost:9000/adminRequestsAccept?id="+id
		let result = await fetch(URL, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		window.location.reload();
	}
	async function refuseRequest(id){
		let URL = "http://localhost:9000/adminRequestsRefuse?id="+id
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
		let URL = "http://localhost:9000/adminRequests"
    	let result = await fetch(URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		let results = await result.json();
		setRequests(results)
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
					<h3>Confirmation de congé</h3>
			
				
			
        			<div class="form-wrapper">
					<div className="table-responsive">
					<table className="table table-striped table-bordered" id="example" >
              <thead>
                <tr>
                  <th>Employée</th>
				  <th>Date début</th>
				  <th>Date fin</th>
				  <th>Raison</th>
				  <th>Opérations</th>
                </tr>
              </thead>
              <tbody>
			  {console.log(requests)}
			  {requests.map(row => 
			  
					  <tr>
						  				  

						  <td>{row.nom} {row.prenom}</td>
						  <td>{row.fromDate}</td>
						  <td>{row.toDate}</td>
						  <td>{row.reasonForLeave}</td>
						  <td className="ops">
						  <i className="fa fa-check accept" onClick={() => acceptRequest(row._id)}></i>
						  <i className="fa fa-trash trashbin" onClick={() => refuseRequest(row._id)}></i>
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
  );
}
export default ApplyLeave;
