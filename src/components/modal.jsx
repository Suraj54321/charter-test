import React, { useState } from "react";
import "./../styles/modal.css";
import { calculateMonthlyRewards, formatMonth } from "./RewardLogic";
import PropTypes from "prop-types";

export default function Modal({ customer, onClose }) {
  const [activeTab, setActiveTab] = useState("transactions");
  // For sorting
  const [sortConfig, setSortConfig] = useState({
    key: "month",
    direction: "asc",
  });

  if (!customer) return null;
  const monthlyRewards = calculateMonthlyRewards(customer.transactions);
  // Convert monthlyRewards object → array
  const monthlyArray = Object.entries(monthlyRewards).map(([month, points]) => ({
    month,
    points,
  }));

// Sorting logic
  const sortedMonthlyRewards = [...monthlyArray].sort((a, b) => {
    if (sortConfig.key === "month") {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);

      return sortConfig.direction === "asc"
        ? dateA - dateB
        : dateB - dateA;
    }

    if (sortConfig.key === "points") {
      return sortConfig.direction === "asc"
        ? a.points - b.points
        : b.points - a.points;
    }
  });

  // Toggle sort
  const toggleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Sort icons
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{customer.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Tabs */}
        <div className="tab-header">
          <button 
            className={activeTab === "transactions" ? "active" : ""} 
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </button>

          <button 
            className={activeTab === "monthly" ? "active" : ""} 
            onClick={() => setActiveTab("monthly")}
          >
            Monthly Rewards
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "transactions" && (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Amount ($)</th>
                  <th>Month</th>
                </tr>
              </thead>
              <tbody>
                {customer.transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>${transaction.amount}</td>
                    <td>{formatMonth(transaction.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "monthly" && (
            <table className="styled-table">
              <thead>
                <tr>
                  <th onClick={() => toggleSort("month")}>
                    Month {getSortIcon("month")}
                  </th>
                  <th onClick={() => toggleSort("points")}>
                    Reward Points {getSortIcon("points")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedMonthlyRewards.map((item, index) => (
                  <tr key={index}>
                    <td>{item.month}</td>
                    <td><strong>{item.points}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
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
