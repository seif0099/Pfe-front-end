import React, { useState, useEffect } from "react";
import "./promotion.css";

function Promotion() {
  var [res, setRes] = useState([{}]);
  const [errorResponse, setError] = useState("");
  const [successResponse, setSuccess] = useState("");
  const [userid, setUserid] = useState("");
  const [oldPoste, setOldPoste] = useState("");
  const [newPoste, setNewPoste] = useState("");

  useEffect(() => {
    const fetcha = async () => {
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
    };
    fetcha();
  }, []);
  async function insertion() {
    let item = {
      oldPoste: oldPoste,
      newPoste: newPoste,
      userid: userid,
    };
    const URL = "http://localhost:9000/createprom";
    let result = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    let results = await result.json();
    if (result.status == 200) {
      setSuccess(results.message);
    }
  }
  function handleUserid(e) {
    setUserid(e.target.value);
    setOldPoste(
      res.find((x) => x._id === e.target.value).poste
    );
  }

  return (
    <div className="cont">
      <div className="wrapper wrapper4">
        <div className="inner inner4">
          <form>
            <h3>Promotion</h3>
            <div className="form-row">
              <div className="form-wrapper">
                <select
                  className="form-control"
                  onChange={handleUserid}
                >
                  <option selected value="0">
                    Choisir l'employée
                  </option>
                  {res.map(
                    ({ nom, prenom, _id }, index) => (
                      <option value={_id}>
                        {nom} {prenom}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div className="form-row last">
              <div className="form-wrapper">
                <label htmlFor="">Poste Ancien</label>
                <input
                  type="text"
                  className="form-control"
                  value={oldPoste}
                  disabled
                />
                <i className="zmdi zmdi-chevron-down"></i>
              </div>
            </div>
            <div className="form-row last">
              <div className="form-wrapper">
                <label htmlFor=""> Nouveau Poste </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setNewPoste(e.target.value)
                  }
                />
                <i className="zmdi zmdi-chevron-down"></i>
              </div>
            </div>

            <button
              data-text="Confirmer la présence"
              type="button"
              onClick={insertion}
              className="form-control button1"
            >
              Confirmer la promotion
            </button>
            {successResponse ? (
              <h1 className="serverSuccess">
                {successResponse}
              </h1>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Promotion;
