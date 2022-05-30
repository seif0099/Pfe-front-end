import jsPDF from "jspdf";
import "jspdf-autotable";
function parseDate(date) {
  let dateObj = new Date(date);
  return dateObj.toLocaleDateString();
}
const generatePDF = (rapport) => {
  const doc = new jsPDF();
  var s = "";

  const tableColumn = [
    "Nom",
    "Prenom",
    "Matricule",
    "Etat",
  ];
  const tableRows = [];
  if (rapport.state === "true") {
    s = "Présent";
  } else {
    s = "Absent";
  }
  const missionData = [
    rapport.nom,
    rapport.prenom,
    rapport.matricule,
    s,
  ];

  // rgba(10, 132, 255, 1)
  tableRows.push(missionData);
  doc.setFont("Arial");
  doc.autoTable(tableColumn, tableRows, {
    startY: 90,
    styles: {
      halign: "center",
    },
  });

  doc.save(`report.pdf`);
};

export default generatePDF;
