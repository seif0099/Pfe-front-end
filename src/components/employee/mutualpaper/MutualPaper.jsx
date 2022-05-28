import React, { useState, useEffect } from "react";
import { useModal } from "react-hooks-use-modal";
import { Icon } from "@iconify/react";

function MutualPaper() {
  const [userInfo, setUserInfo] = useState({});
  var [requests, setRequests] = useState([]);
  var [requestInfo, setrequestInfo] = useState([]);

  async function getRequests() {
    let id = JSON.parse(localStorage.getItem("user-info"))
      .user._id;
    let URL = "http://localhost:9000/getmutuals?id=" + id;
    let result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let results = await result.json();
    setRequests(results);
  }
  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="cont">
      <div className="wrapper">
        <div
          className={`inner  ${
            requests.length ? "inner1" : "no-data"
          }`}
        >
          <form action="submit">
            <h3>Feuille mutuelle</h3>
            {(requests.length && (
              <div class="form-wrapper">
                <div className="table-responsive">
                  <table
                    className="table table-striped table-bordered"
                    id="example"
                  >
                    <thead>
                      <tr>
                        <th>Numéro de feuille</th>
                        <th>Etat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((row) => (
                        <tr>
                          <td>{row.numPaper}</td>

                          <td>{row.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )) || (
              <div className="no-data-msg">
                Vous N'avez Aucune Feuille mutuelle{" "}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default MutualPaper;
