import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PropTypes from "prop-types";

const MIN = 0;
const MID = 50;
const MAX = 100;
const ONE = 1;
const TWO = 2;
export default function PdfGenerator({ customer }) {
  // Reward calculation per transaction
  const calculateReward = (amount) => {
    let points = MIN;
    if (amount > MAX) {
      points += (amount - MAX) * TWO + MID; // 50 points for $50-$100
    } else if (amount > MID) {
      points += amount - MID;
    }
    return points;
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.toLocaleString("default", { month: "short" }); // Jan, Feb, ...
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Customer Reward Report", 14, 15);

    // Customer Details
    doc.setFontSize(12);
    doc.text(`Customer Name: ${customer.name}`, 14, 30);
    doc.text(`Customer ID: ${customer.id}`, 14, 38);
    doc.text(`Total Transactions: ${customer.transactions.length}`, 14, 46);

    // Table Data
    const rows = customer.transactions.map(transaction => [
      transaction.id,
      customer.name,
      `$${transaction.amount}`,
      calculateReward(transaction.amount),
      transaction.date ? formatDate(transaction.date) : "-" // formatted date
    ]);

    // Totals
    const totalAmount = customer.transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    const totalRewardPoints = customer.transactions.reduce(
      (sum, transaction) => sum + calculateReward(transaction.amount),
      0
    );

    // Generate Table
    autoTable(doc, {
      startY: 65,
      head: [["Transaction ID", "Customer", "Value ($)", "Reward", "Date"]],
      body: rows
    });

    // Footer Totals
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Total Transaction Value: $${totalAmount}`, 14, finalY);
    doc.text(`Total Reward Points: ${totalRewardPoints}`, 14, finalY + 10);

    // Save PDF
    doc.save(`${customer.name}_reward_report.pdf`);
  };

  return generatePDF;
}


PdfGenerator.propTypes = {
  customer : PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        amount: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired
      })
    ).isRequired
  }),
  onClose: PropTypes.func.isRequired
};
