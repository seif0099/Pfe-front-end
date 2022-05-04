import React,{ useState, useEffect } from "react";
import "./leaveManagement.css"
import UpdateLeave from './UpdateLeave';
import { useModal } from 'react-hooks-use-modal';
import { Icon } from '@iconify/react';

function LeaveManagement() {
  const [userInfo, setUserInfo] = useState({});
  var [requests, setRequests] = useState([])
  var [requestInfo, setrequestInfo] = useState([])

  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: true
  });
  function setData(pointer){
    var result = []
    requests.map((row, index) => {
      let newRequests = {}
      newRequests.index = index
      newRequests._id = row._id
      newRequests.toDate= row.toDate
      newRequests.fromDate= row.fromDate
      newRequests.reasonForLeave= row.reasonForLeave
      result.push(newRequests)
    })
    setrequestInfo(result.filter(row => row._id === pointer)[0])
  }
  async function updateRequest(id){
    let URL = "http://localhost:9000/leaveupdated?id="+id
    let result = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      
    },
    open()
    );
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

  }
  useEffect(() => {
    getRequests();
  }, []);
 
  function parseDate(date){
    let dateObj = new Date(date)
    return dateObj.toLocaleDateString()
  }
  
  return (

   
    
      <div className="cont">
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
          {requests.map(row => 
          
              <tr>
                          
  
                <td>{parseDate(row.fromDate)}</td>
                <td>{parseDate(row.toDate)}</td>
                <td>{row.reasonForLeave}</td>
                <td>{row.status}</td>
                {row.status === "pending" ? <td className="ops">
                  

                <Icon icon="bx:edit" width="25" height="25" hFlip={true} className="edit"  onClick={() => {setData(row._id);open()}}/>
                <Icon icon="bi:trash" width="25" height="25" hFlip={true} className="edit"  onClick={() => deleteRequest(row._id)}/>
                
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
        <Modal>
            <UpdateLeave request={requestInfo}></UpdateLeave>
        </Modal>
    </div>
    );
  
}

export default LeaveManagement;
