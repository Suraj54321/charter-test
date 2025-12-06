import { calculateReward } from "./RewardLogic";
import "./../styles/card.css";

export default function Modal({ customer, onClose }) {
  if (!customer) return null;

  return (
    <div className="modal-bg">
      <div className="modal">
        <h2>{customer.name}</h2>
        <p>ID: {customer.id}</p>

        <table>
          <thead>
            <tr>
              <th>Txn ID</th>
              <th>Amount ($)</th>
              <th>Reward Points</th>
            </tr>
          </thead>

          <tbody>
            {customer.transactions.map(txn => (
              <tr key={txn.id}>
                <td>{txn.id}</td>
                <td>${txn.amount}</td>
                <td>{calculateReward(txn.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
