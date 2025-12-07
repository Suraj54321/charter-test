import "./../styles/card.css";
import { getTotalRewards } from "./RewardLogic";
import PdfGenerator from "./PdfGenerator";

export default function CustomerCard({ customer, isTop, onView }) {
  const totalRewards = getTotalRewards(customer.transactions);
  const downloadPDF = PdfGenerator({ customer });

  return (
    <div className="card">
      <img src={customer.avatar} className="avatar" />

      <div className="details">
        <h3>{customer.name}</h3>
        {isTop && <span className="trophy">🏆</span>}

        <p>Total Transactions: {customer.transactions.length}</p>
        <p>Total Reward Points: <b>{totalRewards}</b></p>

        <div className="button-row">
          <button className="view-btn" onClick={() => onView(customer)}>
            View
          </button>

          <button className="download-btn" onClick={downloadPDF}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

