import { Icon } from "@iconify/react";
import React from "react";
import { useEffect,useState } from 'react';
import generateDemandePDF from "./rappgen";

function RappAccidentAdmin() {
	var [requests, setRequests] = useState([])
	function openPDF(demande){
        generateDemandePDF(demande)
      }
	async function getRequests(){
		let URL = "http://localhost:9000/getrapportaccident"
    	let result = await fetch(URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		let results = await result.json();
		setRequests(results.rapport)
		requests = results
	}
	useEffect(() => {
		getRequests();
	}, []);
  return (
    <div className="cont">
      <div className="wrapper wrapper3">
			<div className="inner inner3">
				<form action="submit">
					<h3>Rapport des Accidents</h3>
			
				
			
        			<div class="form-wrapper">
					<div className="table-responsive">
					<table className="table table-striped table-bordered" id="example" >
              <thead>
                <tr>
                  <th>Employée</th>
				  <th>Details d'accident</th>
                </tr>
              </thead>
              <tbody>
			  {console.log(requests)}
			  {requests.map(row => 
			  
					  <tr>
						  				  

						  <td>{row.user.nom} {row.user.prenom}</td>
						  <td className="ops">
						  <Icon icon="icomoon-free:file-pdf" width="25" height="25" hFlip={true} className="edit" onClick={() => openPDF(row)}/>
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
export default RappAccidentAdmin;
