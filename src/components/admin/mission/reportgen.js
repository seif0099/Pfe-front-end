import jsPDF from "jspdf";
import "jspdf-autotable";
function parseDate(date){
    let dateObj = new Date(date)
    return dateObj.toLocaleDateString()
  }
const generatePDF  = (mission) =>  {
    const tableColumn = ["Déjuner", "Dîner", "Hébergement", "Transport"];
    const tableRows = [];
    const missionData = [
        mission.coutdejuner,
        mission.coutdiner,
        mission.couthebergement,
        mission.couttransport,
    ]
    let total = 0
    for(let i=0;i < 4; i++){
        total += missionData[i]
    }
    const totalData = [
        null,
        null,
        "Coût total",
        total
    ]
    tableRows.push(missionData)
    tableRows.push(totalData)
    const doc = new jsPDF();
    doc.setFont("Arial")
    doc.autoTable(tableColumn, tableRows, {
         startY: 90 ,
         styles: {
             halign: "center"
         }
    });

    doc.setFontSize(24)
    doc.text("Rapport de mission", 70, 10);
    doc.setFontSize(12)

    doc.setTextColor("#0A84FF")
    doc.text("Employé: " ,5, 20);
    doc.setTextColor("#000000")
    doc.text(mission.user.nom+" "+mission.user.prenom,28, 20)

    doc.setTextColor("#0A84FF")
    doc.text("Objectif: ", 5, 27);
    doc.setTextColor("#000000")
    doc.text(mission.objectifMission, 28, 27);

    doc.setTextColor("#0A84FF")
    doc.text("Destination: ", 5, 34);
    doc.setTextColor("#000000")
    doc.text(mission.destination, 28, 34);

    doc.setTextColor("#0A84FF")
    doc.text("Date départ: ", 5, 41);
    doc.setTextColor("#000000")
    doc.text(parseDate(mission.dateDepart),28,41)

    doc.setTextColor("#0A84FF")
    doc.text("Date retour: ", 5, 48);
    doc.setTextColor("#000000")
    doc.text(parseDate(mission.dateRetour),28,48)

    doc.line(0, 70, 220, 70);

    doc.setTextColor("#0A84FF")
    doc.text("Date de validation: ", 120, 130);
    doc.setTextColor("#000000")
    doc.text(parseDate(mission.dateValidation),160,130)

    doc.save(`report.pdf`);
  };
  
  export default generatePDF;