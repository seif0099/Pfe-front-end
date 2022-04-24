import React,{ useState, useEffect } from "react";
import "./leaveManagement.css"
import ReqLeave from './ReqLeave';

function LeaveManagement() {
  var [requests, setRequests] = useState([])
  async function updateRequest(id){
    let URL = "http://localhost:9000/leaveupdated?id="+id
    let result = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    window.location.reload();
  }
  async function deleteRequest(id){
    let URL = "http://localhost:9000/deleteleave?id="+id
    let result = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    window.location.reload();
  }
  async function getRequests(){
    let id = JSON.parse(localStorage.getItem("user-info")).user._id
    let URL = "http://localhost:9000/getrequest?id="+id
      let result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let results = await result.json();
    setRequests(results)
    console.log(requests)
  }
  useEffect(() => {
    
    getRequests();
  }, []);
  function parseDate(date){
    let dateObj = new Date(date)
    return dateObj.toLocaleDateString()
  }
  return (

   
    
      <div>
        <div className="wrapper">
        <div className="inner inner1">
          <form action="submit">
            <h3>Demande de congé</h3>
        
          
        
                <div class="form-wrapper">
            <div className="table-responsive">
            <table className="table table-striped table-bordered" id="example" >
                <thead>
                  <tr>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Raison</th>
            <th>Status</th>
            <th>Opérations</th>
                  </tr>
                </thead>
                <tbody>
          {console.log(requests)}
          {requests.map(row => 
          
              <tr>
                          
  
                  <td>{parseDate(row.fromDate)}</td>
                <td>{parseDate(row.toDate)}</td>
                <td>{row.reasonForLeave}</td>
                <td>{row.status}</td>
                <td className="ops">
                <i className="fa fa-edit edit" onClick={() => updateRequest(row._id)}></i>
                <i className="fa fa-trash trashbin" onClick={() => deleteRequest(row._id)}></i>
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

export default LeaveManagement;
