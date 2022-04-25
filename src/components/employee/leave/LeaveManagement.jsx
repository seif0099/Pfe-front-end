import { Row } from "antd";
import React,{ useState, useEffect } from "react";
import "./leaveManagement.css"
import ReqLeave from './ReqLeave';
import { useFormik } from 'formik';
import { useModal } from 'react-hooks-use-modal';

function LeaveManagement() {
  const [userInfo, setUserInfo] = useState({});
	const [errorResponse, setError] = useState("");
	const [successResponse, setSuccess] = useState("");
  var [requests, setRequests] = useState([])
  var [pointer, setPointer] = useState("");

  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false
  });
  function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

  function setData(){
    console.log("p", pointer)
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
    console.log(result)
    let selectedRow = result.filter(row => row._id === pointer)[0]
    var reasonForLeave = document.getElementById("reasonForLeave");
    let r = reasonForLeave
    reasonForLeave.options[selectedRow.index].selected =true;
    //reasonForLeave.options[r].selected = true;

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
    waitForElm('#reasonForLeave').then((elm) => {
      setData()
  });
  
  }, []);
 

  function parseDate(date){
    let dateObj = new Date(date)
    return dateObj.toLocaleDateString()
  }
  function validate(values) {
		const errors = {};
		if (!values.reasonForLeave) {
		  errors.reasonForLeave = "* Le champ type de congé est obligatoire";
		}
		if(!values.fromDate){
			errors.fromDate = "* Le champ date début est obligatoire";
		}
		if(!values.toDate){
			errors.toDate = "* Le champ date fin est obligatoire";
		}
		return errors;
	  }
	
	  const {
		handleSubmit,
		handleChange,
		touched,
		errors,
	  } = useFormik({
		initialValues: {
			reasonForLeave: "",
			fromDate: "",
			toDate: ""
		},
		validate,
		onSubmit: (values) => {
			console.log(values)
		},
	  });
   
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
          {requests.map(row => 
          
              <tr>
                          
  
                <td>{parseDate(row.fromDate)}</td>
                <td>{parseDate(row.toDate)}</td>
                <td>{row.reasonForLeave}</td>
                <td>{row.status}</td>
                {row.status === "pending" ? <td className="ops">
                  

                <i className="fa fa-edit edit" onClick={() => {setPointer(row._id);open()}}></i>
                <i className="fa fa-trash trashbin" onClick={() => deleteRequest(row._id)}></i>
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
        
      <div className="editModal">
      <form>
          <h3>Modifier la demande</h3>
          
          <div className="form-row last">
            <div className="form-wrapper">
              <label htmlFor="">À partir de *</label>
              <input
                type="date"
                className="form-control"
                name="fromDate"
                onChange={handleChange}
              />
              <i className="zmdi zmdi-chevron-down"></i>
              {touched.fromDate && errors.fromDate
        						? <p className="errors">{errors.fromDate}</p>
        						: null}
            </div>
            <div className="form-wrapper">
              <label htmlFor="">À *</label>
              <input
                type="date"
                className="form-control"
                name="toDate"
                onChange={handleChange}
              />

              <i className="zmdi zmdi-chevron-down"></i>
              {touched.toDate && errors.toDate
        						? <p className="errors">{errors.toDate}</p>
        						: null}
            </div>
          </div>
          <div className="form-wrapper">
            <label for="">Type de congé *</label>
            <select
              className="form-control"
              name="reasonForLeave"
              id = "reasonForLeave"
              onChange={handleChange}
            >
              <option selected value="">Choisir le type de congé</option>
              <option value="Maladie">Maladie</option>
              <option value="Sans solde">Sans solde</option>
              <option value="Maternité">Maternité</option>
            </select>
            {touched.reasonForLeave && errors.reasonForLeave
        						? <p className="errors">{errors.reasonForLeave}</p>
        						: null}
          </div>
          <button data-text="Confirmer" className="form-control button1" type="button" onClick={handleSubmit}>
            confirmer
          </button>
          {successResponse
        						? <h1 className="serverSuccess">{successResponse}</h1>
        						: null}
					{errorResponse
        						? <p className="errors">{errorResponse}</p>
        						: null}
        </form>
      </div>
    </Modal>
    </div>
    );
  
}

export default LeaveManagement;
