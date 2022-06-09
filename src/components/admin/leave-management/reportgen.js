import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (row) => {
  const doc = new jsPDF();
  doc.setFont("Arial");

  doc.setFontSize(24);
  doc.text("Certificat", 70, 10);
  doc.setFontSize(12);

  doc.setTextColor("#0A84FF");
  doc.text("Objectif: ", 5, 27);
  doc.setTextColor("#000000");
  doc.text(row.certificat, 28, 27);

  doc.save(`report.pdf`);
};

export default generatePDF;
