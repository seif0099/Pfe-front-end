import { Icon } from '@iconify/react';
import React,{useState,useEffect} from 'react'
import "./mission.css"
import generatePDF from "./reportgen";
function RapportMissionsAdmin() {
  
    var [missions, setMissions] = useState([])
    function openPDF(mission){
      generatePDF(mission)
    }
    async function getMissions(){
        let URL = "http://localhost:9000/getallmissions"
        let result = await fetch(URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        });
        let results = await result.json();
        setMissions(results)
    }
  useEffect(() => {
    getMissions()
  }, []);

  function parseDate(date){
    let dateObj = new Date(date)
    return dateObj.toLocaleDateString()
  }

  return (
    <div className='cont'>
    <div className="wrapper">
    <div className="inner inner1">
      <form action="submit">
        <h3>Missions</h3>
    
      
    
            <div class="form-wrapper">
        <div className="table-responsive">
        <table className="table table-striped table-bordered" id="example" >
            <thead>
              <tr>
        <th>Date départ</th>
        <th>Date retour</th>
        <th>Objectif</th>
        <th>Destination</th>
        <th>Status</th>
        <th>Date validation</th>
        <th>Opérations</th>
              </tr>
            </thead>
            <tbody>
      {missions.map(row => 
      
          <tr>
                      

            <td>{parseDate(row.dateDepart)}</td>
            <td>{parseDate(row.dateRetour)}</td>
            <td>{row.objectifMission}</td>
            <td>{row.destination}</td>
            <td>{row.status}</td>
            {parseDate(row.dateValidation) != "Invalid Date" ? <td>{parseDate(row.dateValidation)}</td> : <td></td>}
            {row.status === "terminée" ? <td className="ops">
              

            <Icon icon="icomoon-free:file-pdf" width="25" height="25" hFlip={true} className="edit" onClick={() => openPDF(row)}/>
            </td> : <td></td>}
            
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

export default RapportMissionsAdmin