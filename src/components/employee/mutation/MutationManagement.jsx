import React,{ useState, useEffect } from "react";
import "./mutation.css"
import { useModal } from 'react-hooks-use-modal';
import UpdateMutation from "./updatemutation";
import { Icon } from '@iconify/react';

function MutationManagement() {
  const [userInfo, setUserInfo] = useState({});
  var [requests, setRequests] = useState([])
  var [mutationInfo, setMutationInfo] = useState([])

  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: true
  });
  function setData(pointer){
    console.log("p", pointer)
    var result = []
    requests.map((row, index) => {
      let newRequests = {}
      newRequests.index = index
      newRequests._id = row._id
      newRequests.to= row.to
      newRequests.from= row.from
      newRequests.reasonForMutation= row.reasonForMutation
      result.push(newRequests)
    })
    setMutationInfo(result.filter(row => row._id === pointer)[0])
    console.log(mutationInfo)
  }
  
  async function deleteRequest(id){
    let URL = "http://localhost:9000/deletesMutation?id="+id
    let result = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    window.location.reload();
  }
  async function getMutations(){
    let id = JSON.parse(localStorage.getItem("user-info")).user._id
    let URL = "http://localhost:9000/getmutation?id="+id
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
    getMutations();
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
            <h3>Demande de mutation</h3>
        
          
        
                <div class="form-wrapper">
            <div className="table-responsive">
            <table className="table table-striped table-bordered" id="example" >
                <thead>
                  <tr>
            <th>Service ancien</th>
            <th>Nouveau service</th>
            <th>Raison</th>
            <th>Status</th>
            <th>Opérations</th>
                  </tr>
                </thead>
                <tbody>
          {requests.map(row => 
          
              <tr>
                          
  
                <td>{row.from}</td>
                <td>{(row.to)}</td>
                <td>{row.reasonForMutation}</td>
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
            <UpdateMutation mutation={mutationInfo}></UpdateMutation>
        </Modal>
    </div>
    );
  
}

export default MutationManagement;
