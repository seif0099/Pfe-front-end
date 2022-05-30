import React, { useState, useEffect } from "react";

function ViewPointage() {
  var [emp, setEmps] = useState([]);
  var [year, setY] = useState();
  var [month, setM] = useState();

  function handleChangeY(event) {
    setY(event.target.value);
  }
  function handleChangeM(event) {
    setM(event.target.value);
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
  }, []);
  async function getPointage() {
    let d = new Date();
    console.log("&&&&&&&&&&&");
    let URL = "http://localhost:9000/getP";
    let result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }
  return (
    <div>
      <table
        className="table table-striped table-bordered"
        id="example"
      >
        <thead>
          <tr>
            <th>Employés</th>
            <th>Matricule</th>
            <th>Etat</th>
          </tr>
        </thead>
        <tbody>
          {emp.map((row) => (
            <tr>
              <td>
                {row.nom} {row.prenom}
              </td>
              <td>{row.matricule}</td>
              {row.state ? (
                <td>present</td>
              ) : (
                <td>absent</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        <div className="monthPicker">
          <select
            id="month"
            name="month"
            className="form-control"
            onChange={handleChangeM}
          >
            <option selected value="">
              --Choisir Mois--
            </option>
            <option value="1">Janaury</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div className="yearPicker">
          <select
            id="year"
            name="year"
            className="form-control"
            onChange={handleChangeY}
          >
            <option selected>--Choisir Année--</option>
            <option value="2011">2022</option>
            <option value="2012">2023</option>
            <option value="2013">2024</option>
            <option value="2014">2025</option>
            <option value="2015">2026</option>
            <option value="2016">2027</option>
            <option value="2017">2029</option>
          </select>
        </div>
        <div className="myButton">
          <input
            type="button"
            className="form-control myB"
            value="Confirmer"
            onClick={getPointage}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewPointage;
