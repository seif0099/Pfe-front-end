import React, { useState, useEffect } from "react";
import "./sidebarEmployee.css";

function News(props) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [reasonForSanction, setRes] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user-info"))) {
      const { user } = JSON.parse(localStorage.getItem("user-info"));
      if (props.news.type === "promotion") {
        let x = props.news.promotion[0];
        setTo(x.newPoste);
        setFrom(user.poste);
      } else {
        let x = props.news.sanction[0];
        setToDate(x.toDate);
        setFromDate(x.fromDate);
        setRes(x.reasonForSanction);
      }
    }
  }, []);
  function parseDate(date) {
    let dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }
  async function setNotVisible() {
    console.log("x");
    if (props.news.type === "promotion") {
      document.getElementById(props.news.promotion[0]._id).style.visibility = "hidden";
    } else {
      document.getElementById(props.news.sanction[0]._id).style.visibility = "hidden";
    }
    let result = await fetch("http://localhost:9000/markAsSeen?id=" + props.news._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }
  return (
    <div>
      {props.news.type === "promotion" ? (
        <div onClick={(e) => setNotVisible()} className="promotion" id={props.news.promotion[0]._id}>
          Félécitation!! Vous avez été promu de {from} à {to}
        </div>
      ) : (
        <div onClick={(e) => setNotVisible()} className="sanction" id={props.news.sanction[0]._id}>
          Vous avez recu une sanction dans {parseDate(fromDate)} avec la nature {reasonForSanction}
        </div>
      )}
    </div>
  );
}

export default News;
