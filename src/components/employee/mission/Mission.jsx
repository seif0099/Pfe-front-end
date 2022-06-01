import React, { useState, useEffect } from "react";
import "./mission.css";
import { useModal } from "react-hooks-use-modal";
import RapportMission from "./RapportMission";

function Missions() {
  var [missions, setMissions] = useState([]);
  var [missionInfo, setmissioninfo] = useState([]);
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: true,
  });
  async function getMissions() {
    let id = JSON.parse(localStorage.getItem("user-info"))
      .user._id;
    let URL = "http://localhost:9000/getmissions?id=" + id;
    let result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let results = await result.json();
    setMissions(results);
  }
  function setData(pointer) {
    var result = [];
    missions.map((row, index) => {
      let newRequests = {};
      newRequests.index = index;
      newRequests._id = row._id;
      newRequests.dateDepart = row.dateDepart;
      newRequests.dateRetour = row.dateRetour;
      newRequests.objectifMission = row.objectifMission;
      newRequests.destination = row.destination;
      result.push(newRequests);
    });
    setmissioninfo(
      result.filter((row) => row._id === pointer)[0]
    );
  }
  useEffect(() => {
    getMissions();
  }, []);
  function parseDate(date) {
    let dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }

  return (
    <div className="cont">
      <div className="wrapper">
        <div className="inner inner1">
          <form action="submit">
            <h3 classname="title2">Missions</h3>

            <div class="form-wrapper">
              <div className="table-responsive">
                <table
                  className="table table-striped table-bordered"
                  id="example"
                >
                  <thead>
                    <tr>
                      <th>Date départ</th>
                      <th>Date retour</th>
                      <th>Objectif</th>
                      <th>Destination</th>
                      <th>Status</th>
                      <th>Opérations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {missions.map((row) => (
                      <tr>
                        <td>{parseDate(row.dateDepart)}</td>
                        <td>{parseDate(row.dateRetour)}</td>
                        <td>{row.objectifMission}</td>
                        <td>{row.destination}</td>
                        <td>{row.status}</td>
                        {row.status === "en cours" ? (
                          <td className="ops">
                            <i
                              className="fa fa-edit edit"
                              onClick={() => {
                                setData(row._id);
                                open();
                              }}
                            ></i>
                          </td>
                        ) : (
                          <td></td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal>
        <RapportMission
          mission={missionInfo}
        ></RapportMission>
      </Modal>
    </div>
  );
}

export default Missions;
