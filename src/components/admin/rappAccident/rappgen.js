import jsPDF from "jspdf";
import "jspdf-autotable";
function parseDate(date){
    let dateObj = new Date(date)
    return dateObj.toLocaleDateString()
  }
const generatePDF  = (rapport) =>  {
    const doc = new jsPDF();
    doc.setFont("Arial")

    doc.setFontSize(24)
    doc.text("rapport accident", 70, 30);
    doc.setFontSize(12)

    doc.setTextColor("#0A84FF")
    doc.text("Employé: " ,5, 60);
    doc.setTextColor("#000000")
    doc.text(rapport.user.nom+" "+rapport.user.prenom,28, 60)

    doc.setTextColor("#0A84FF")
    doc.text("Date accident: ", 5, 80);
    doc.setTextColor("#000000")
    doc.text(parseDate(rapport.dateAcc),34,80)

    doc.setTextColor("#0A84FF")
    doc.text("Condition: ", 5, 100);
    doc.setTextColor("#000000")
    doc.text(rapport.condition,28,100)

    doc.setTextColor("#0A84FF")
    doc.text("Place : ", 5, 120);
    doc.setTextColor("#000000")
    doc.text(rapport.place,28,120)

    doc.save(`report.pdf`);
  };
  
  export default generatePDF;