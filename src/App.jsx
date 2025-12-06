import { useState, useMemo } from "react";
import { customers } from "./data/transactions";
import { getTotalRewards } from "./components/RewardLogic";
import CustomerCard from "./components/customerCard";
import Modal from "./components/Modal";
import "./styles/app.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Find highest reward point customer
  const topCustomerId = useMemo(() => {
    let max = 0;
    let topId = null;

    customers.forEach(c => {
      const total = getTotalRewards(c.transactions);
      if (total > max) {
        max = total;
        topId = c.id;
      }
    });
    return topId;
  }, []);

  return (
    <div className="container">
      <Header />

      <div className="card-container">
        {customers.map(c => (
          <CustomerCard
            key={c.id}
            customer={c}
            isTop={c.id === topCustomerId}
            onView={setSelectedCustomer}
          />
        ))}
      </div>

      <Modal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
        <Footer />
    </div>
  );
}
