import { Icon } from "@iconify/react";
import React from "react";
import { useEffect, useState } from "react";
import generateDemandePDF from "./demandegen";

function DemandesAdministrative() {
  const [userid, setUserid] = useState("");

  var [requests, setRequests] = useState([]);
  var [res, setRes] = useState([{}]);

  function openPDF(demande) {
    generateDemandePDF(demande);
  }

  async function fetcha() {
    let URL = "http://localhost:9000/users";
    let result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let results = await result.json();
    setRes(results);
  }

  async function getRequests() {
    let URL =
      "http://localhost:9000/getDemandesAdministrative";
    let result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let results = await result.json();
    setRequests(results.demandes);
    requests = results;
  }
  useEffect(() => {
    getRequests();
    fetcha();
  }, []);

  return (
    <div className="cont">
      <div className="wrapper wrapper3">
        <div className="inner inner3">
          <form action="submit">
            <h3>Demandes Administratives</h3>

            <div class="form-wrapper">
              <div className="table-responsive">
                <table
                  className="table table-striped table-bordered"
                  id="example"
                >
                  <thead>
                    <tr>
                      <th>Employée</th>
                      <th>Sujet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((row) => (
                      <tr>
                        <td>
                          {row.user.nom} {row.user.prenom}
                        </td>
                        <td className="ops">
                          <Icon
                            icon="icomoon-free:file-pdf"
                            width="25"
                            height="25"
                            hFlip={true}
                            className="edit"
                            onClick={() => openPDF(row)}
                          />
                        </td>
                      </tr>
                    ))}
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
