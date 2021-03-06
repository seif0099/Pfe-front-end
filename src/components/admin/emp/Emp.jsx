import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import generatePDF from "./pdf";

function Emp() {
  var [emp, setEmps] = useState([]);
  const[pDate,setpDate]=useState("");

  var index = [];
  async function openPDF() {
    let URL =
      "http://localhost:9000/getPointageByDate?date=" + pDate;
    console.log(URL);
    let result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let results = await result.json().then(function (result) {
      console.log(emp)
      let newTable = []
      emp.map((row) => {
        let newRow = {}
        newRow.nom = row.nom
        newRow.prenom = row.prenom
        newRow.matricule = row.matricule
        newRow._id = row._id
        let x = result.pointages.filter((row1) => row1.user === newRow._id)
        console.log(x.length)
        newRow.status = x.length > 0 ? "présent" : "absent"
        newTable.push(newRow)
      })
      generatePDF(newTable)
    });
  }

  async function deleteUser(id) {
    let URL =
      "http://localhost:9000/adminDeleteUser?id=" + id;
    let result = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    window.location.reload();
  }
  async function getUsers() {
    let URL = "http://localhost:9000/users";
    let result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let results = await result.json();
    setEmps(results);
    emp = results;
  }

  useEffect(() => {
    getUsers();
    for (var i = 0; i <= emp.length; i++) {
      index[i] = emp[i];
      console.log(index[i], "aa");
    }
    
  }, []);
  async function mapping() {}
  return (
    <div className="cont">
      <div className="wrapper wrapper3">
        <div className="inner inner3">
          <form action="submit">
            <h3>Gestion des employées</h3>

            <div class="form-wrapper">
              <div className="table-responsive">
                <table
                  className="table table-striped table-bordered"
                  id="example"
                >
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Poste</th>
                      <th>Opérations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emp.map((row, i) => (
                      <tr>
                        <td>{row.nom} </td>

                        <td>{row.prenom}</td>

                        <td>{row.poste}</td>
                        <td className="ops">
                          <Icon
                            icon="bi:trash"
                            width="25"
                            height="25"
                            hFlip={true}
                            className="edit"
                            onClick={() =>
                              deleteUser(row._id)
                            }
                          />
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="pdfop">
              <input type="date" name="datePointage" onChange={(e) => setpDate(e.target.value)}/>
              <div className="pdfop1">
                <p>Générer la liste des employées</p>
              </div>
              <div className="pdfop2">
              <Icon
                            icon="icomoon-free:file-pdf"
                            width="25"
                            height="25"
                            hFlip={true}
                            className="edit"
                            onClick={() => openPDF()}
                          />
              </div>
                          
              </div>
          </form>
         
        </div>
      </div>
    </div>
  );
}

export default Emp;
