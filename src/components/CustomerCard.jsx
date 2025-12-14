import "./../styles/card.css";
import { getTotalRewards } from "./RewardLogic";
import PdfGenerator from "./PdfGenerator";
import PropTypes from "prop-types";

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

CustomerCard.propTypes = {
  customer : PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.isRequired,
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        amount: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  isTop: PropTypes.bool,
  onView: PropTypes.func.isRequired
}

