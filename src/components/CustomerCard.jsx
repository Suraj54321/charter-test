import "./../styles/card.css";
import { getTotalRewards } from "./RewardLogic";

export default function CustomerCard({ customer, isTop, onView }) {
  const totalRewards = getTotalRewards(customer.transactions);

  return (
    <div className="card">
      <img src={customer.avatar} className="avatar" />

      <div className="details">
        <h3>{customer.name}</h3>

        {isTop && <span className="trophy">🏆</span>}

        <p>Total Transactions: {customer.transactions.length}</p>
        <p>Total Reward Points: <b>{totalRewards}</b></p>

        <button className="view-btn" onClick={() => onView(customer)}>
          👁 View
        </button>
      </div>
    </div>
  );
}
