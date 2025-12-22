import React,{ useState, useMemo } from "react";
import { customers } from "./data/transactions";
import { getTotalRewards } from "./components/RewardLogic";
import CustomerCard from "./components/customerCard";
import Modal from "./components/modal";
import "./styles/app.css";
import Header from "./components/Header";

export default function App() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const isSearching = searchTerm.trim() !== "";

  // Highest reward customer
  const topCustomerId = useMemo(() => {
    let max = 0, topId = null;
    customers.forEach(c => {
      const total = getTotalRewards(c.transactions);
      if (total > max) {
        max = total;
        topId = c.id;
      }
    });
    return topId;
  }, []);

  const cardsPerPage = 5;

  // APPLY SEARCH ONLY WHEN searchTerm CHANGES
  const filteredCustomers = useMemo(() => {
    return customers.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // SORT customers ONLY when not searching
  const sortedCustomers = useMemo(() => {
    const list = [...filteredCustomers];

    if (!isSearching) {
      return list.sort((a, b) => {
        const totalA = getTotalRewards(a.transactions);
        const totalB = getTotalRewards(b.transactions);
        return sortOrder === "desc" ? totalB - totalA : totalA - totalB;
      });
    }
    return list;
  }, [filteredCustomers, sortOrder, isSearching]);

  // PAGINATION
  const totalPages = Math.ceil(sortedCustomers.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const currentCustomers = sortedCustomers.slice(
    indexOfLastCard - cardsPerPage,
    indexOfLastCard
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // SORT toggle
  const toggleSort = () => {
    setSortOrder(prev => (prev === "desc" ? "asc" : "desc"));
    setCurrentPage(1);
  };

  // SEARCH BUTTON CLICK → APPLY FILTER
  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  // RESET SEARCH
  const resetSearch = () => {
    setSearchInput("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="app-container">
      <Header />

      {/* SEARCH BAR */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search customer..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>

        {isSearching && (
          <span
            style={{ cursor: "pointer", fontSize: "20px", marginLeft: "10px" }}
            onClick={resetSearch}
          >
            🔄
          </span>
        )}
      </div>

      {/* SORT BUTTON (HIDDEN WHILE SEARCHING) */}
      {!isSearching && (
        <div className="sort-buttons">
          <button onClick={toggleSort}>
            Sort: {sortOrder === "desc" ? "High → Low" : "Low → High"}
          </button>
        </div>
      )}

      {/* CUSTOMER CARDS */}
      <div className="card-container">
        {currentCustomers.map(customer => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            isTop={customer.id === topCustomerId}
            onView={setSelectedCustomer}
          />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <Modal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
    </div>
  );
}
