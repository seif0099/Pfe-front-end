import React,{ useState, useEffect } from "react";

import { Icon } from '@iconify/react';

function SuppHourMng() {
  const [userInfo, setUserInfo] = useState({});
  var [requests, setRequests] = useState([])
  var [requestInfo, setrequestInfo] = useState([])

  
  function setData(pointer){
    console.log("p", pointer)
    var result = []
    requests.map((row, index) => {
      let newRequests = {}
      newRequests.index = index
      newRequests._id = row._id
      newRequests.toDate= row.toDate
      newRequests.fromDate= row.fromDate
      newRequests.typeOfWork= row.typeOfWork
      newRequests.date= row.date
      result.push(newRequests)
    })
    setrequestInfo(result.filter(row => row._id === pointer)[0])
  }
  
  
  async function deleteRequest(id){
    let URL = "http://localhost:9000/deletereqhours?id="+id
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
    let URL = "http://localhost:9000/getreqhours?id="+id
      let result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let results = await result.json();
    setRequests(results)

  }
  useEffect(() => {
    getRequests();
  }, []);
 
  function parseDate(date){
    let dateObj = new Date(date)
    return dateObj.toLocaleDateString()
  }
  
  return (
    <div className="cont" >
        <div className="wrapper">
        <div className="inner inner1">
          <form action="submit">
            <h3>Demande des heures supplémentaires</h3>
        
          
        
                <div class="form-wrapper">
                <div className="table-responsive">
                     <table className="table table-striped table-bordered" id="example" >
                        <thead>
                            <tr>
                            <th>Date d'envoi</th>
                            <th>Date début</th>
                            <th>Date fin</th>
                            <th>type des traveaux</th>
                            <th>Status</th>
                            <th>Opérations</th>
                                </tr>
                                </thead>
                                <tbody>
                        {requests.map(row => 
                        
                            <tr>
                                 <td>{parseDate(row.date)}</td>
                                <td>{row.fromDate}</td>
                                <td>{row.toDate}</td>
                                <td>{row.typeOfWork}</td>
                                <td>{row.status}</td>
                                {row.status === "pending" ? <td className="ops">
                                

                                <Icon icon="bi:trash" width="25" height="25" hFlip={true} className="edit" onClick={() => deleteRequest(row._id)}/>
                                
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
    );
  
}

export default SuppHourMng;
