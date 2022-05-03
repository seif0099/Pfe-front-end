import React from "react";
import { useEffect,useState } from 'react';
import generateDemandePDF from "./demandegen";

function DemandesAdministrative() {
	var [requests, setRequests] = useState([])
	function openPDF(demande){
        generateDemandePDF(demande)
      }
	async function getRequests(){
		let URL = "http://localhost:9000/getDemandesAdministrative"
    	let result = await fetch(URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		let results = await result.json();
		setRequests(results.demandes)
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
					<h3>Demandes Administratives</h3>
			
				
			
        			<div class="form-wrapper">
					<div className="table-responsive">
					<table className="table table-striped table-bordered" id="example" >
              <thead>
                <tr>
                  <th>Employée</th>
				  <th>Sujet</th>
                </tr>
              </thead>
              <tbody>
			  {console.log(requests)}
			  {requests.map(row => 
			  
					  <tr>
						  				  

						  <td>{row.user.nom} {row.user.prenom}</td>
						  <td className="ops">
						  <i className="fa fa-eye" onClick={() => openPDF(row)}></i>
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
export default DemandesAdministrative;
