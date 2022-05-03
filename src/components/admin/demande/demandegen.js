import jsPDF from "jspdf";
import "jspdf-autotable";
function parseDate(date){
    let dateObj = new Date(date)
    return dateObj.toLocaleDateString()
  }
const generateDemandePDF  = (demande) =>  {
    const doc = new jsPDF();
    doc.setFont("Arial")

    doc.setFontSize(24)
    doc.text("Demande administrative", 70, 30);
    doc.setFontSize(12)

    doc.setTextColor("#0A84FF")
    doc.text("Employé: " ,5, 60);
    doc.setTextColor("#000000")
    doc.text(demande.user.nom+" "+demande.user.prenom,28, 60)

    doc.setTextColor("#0A84FF")
    doc.text("Sujet: ", 5, 80);
    doc.setTextColor("#000000")
    doc.text(demande.sujet,28,90)

    doc.save(`report.pdf`);
  };
  
  export default generateDemandePDF;