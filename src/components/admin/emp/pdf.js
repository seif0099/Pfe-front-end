import jsPDF from "jspdf";
import "jspdf-autotable";
function parseDate(date) {
  let dateObj = new Date(date);
  return dateObj.toLocaleDateString();
}
const generatePDF = (employees) => {
  const doc = new jsPDF();
  var s = "";

  const tableColumn = [
    "Nom",
    "Prenom",
    "Matricule",
    "Etat",
  ];
  const tableRows = [];
  
  
  for(let i = 0;i < employees.length;i++){
    const employeeData = [
      employees[i].nom,
      employees[i].prenom,
      employees[i].matricule,
      employees[i].status
    ];
    tableRows.push(employeeData);
  }
  
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
