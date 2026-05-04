import { useMemo, useState } from "react";
import "./Customers.css";
import CustomerForm from "./CustomerForm";
import Modal from "../Modals/Modal";
// import { customersMock, ordersMock } from "./mockData";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";


// const orders = ordersMock;

function AllCustomers() {
const orders = useSelector(state => state.orders.orders) || [];
const customers = useSelector(state => state.customers.customers) || [];
  const [view, setView] = useState("cards");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [openOrdersFor, setOpenOrdersFor] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getCustomerOrders = (id) =>
    orders.filter(o => o.custId === id);
  const navigate = useNavigate();
  const enrichedCustomers = useMemo(() => {
    return customers.map(c => {
      const custOrders = getCustomerOrders(c.id);

      return {
        ...c,
        totalOrders: custOrders.length,
        isActive: custOrders.length > 0,
        totalRevenue: custOrders.reduce((a, b) => a + (b.price || 0), 0)
      };
    });
  }, []);

  const filteredCustomers = useMemo(() => {
    const q = search.toLowerCase();

    return enrichedCustomers.filter(c => {
      const matchSearch =
        c.name?.toLowerCase().includes(q) ||
        c.phone?.includes(q) ||
        c.email?.toLowerCase().includes(q);

      const matchFilter =
        filter === "all" ||
        (filter === "active" && c.isActive) ||
        (filter === "inactive" && !c.isActive);

      return matchSearch && matchFilter;
    });
  }, [search, filter, enrichedCustomers]);

  const handleDelete = (id) => {
    alert("מחיקה " + id);
  };

  return (
    <div className="customers-page">

      {/* HEADER */}
      <div className="orders-header">
        <h1>👤 לקוחות</h1>

        <div className="orders-actions">
          <button className="btn-primary" onClick={() => setIsFormOpen(true)}>
            ➕ לקוח חדש
          </button>

          <button
            className="btn-secondary"
            onClick={() => setView(view === "cards" ? "table" : "cards")}
          >
            🔁 תצוגה
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="search-wrapper">
        <span className="gold-emoji">🔍</span>
        <input
          className="lux-search"
          placeholder="חיפוש לקוחות..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* FILTER BUTTONS */}
      <div className="orders-filters">
        <button
          className={`filter-pill ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          כל הלקוחות
        </button>

        <button
          className={`filter-pill ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          🟢 פעילים
        </button>

        <button
          className={`filter-pill ${filter === "inactive" ? "active" : ""}`}
          onClick={() => setFilter("inactive")}
        >
          ⚪ לא פעילים
        </button>
      </div>

      {/* STATS */}
      <div className="stats-row">
        {filteredCustomers.slice(0, 3).map(c => (
          <div className="stat-card" key={c.id}>
            <div className="stat-label">
              <span className="gold-emoji">👑</span> {c.name}
            </div>

            <div className="stat-value">💰 {c.totalRevenue}</div>

            <div className="stat-sub">
              📁 {c.totalOrders} הזמנות
            </div>
          </div>
        ))}
      </div>

      {/* CARDS */}
      {view === "cards" ? (
        <div className="cards-container">
          {filteredCustomers.map(c => (
            <div className="customer-card" key={c.id}>

              <h3>
                <span className="gold-emoji">👤</span> {c.name}
              </h3>

              <p>📞 {c.phone}</p>
              <p>📧 {c.email}</p>

              {/* STATUS */}
              <p>
                סטטוס:
                {c.isActive ? (
                  <span >🟢 פעיל</span>
                ) : (
                  <span >⚪ לא פעיל</span>
                )}
              </p>

              {/* ACTIONS */}
              <div className="actions-cell">
                <button
                  onClick={() => {
                    setSelectedCustomer(c);
                    setIsFormOpen(true);
                  }}
                >
                  ✏️ עריכה
                </button>

                <button onClick={() => handleDelete(c.id)}>
                  🗑 מחיקה
                </button>
              </div>

              {/* ORDERS */}
              <div
                className="orders-folder"
                onClick={() =>
                  setOpenOrdersFor(openOrdersFor === c.id ? null : c.id)
                }
              >
                📁 {c.totalOrders} הזמנות
              </div>

              {openOrdersFor === c.id && (
                <div className="orders-list">
                  {getCustomerOrders(c.id).map(o => (
                    <div key={o.id} className="mini-order"  onClick={() => navigate(`/order-details/${o.id}`)} // ניווט לדף פרטי ההזמנה
                                     style={{ cursor: 'pointer', color: '#f5d26a' }} // סגנון עבור הכרטיס של ההזמנה
                    >
                      💎 #{o.id} - {o.status}
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      ) : (
        /* TABLE */
        <table className="orders-table">
          <thead>
            <tr>
              <th>שם</th>
              <th>טלפון</th>
              <th>סטטוס</th>
              <th>הזמנות</th>
              <th>פעולות</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map(c => (
              <tr key={c.id}>

                <td>{c.name}</td>
                <td>{c.phone}</td>

                {/* STATUS */}
                <td>
                  {c.isActive ? "🟢 פעיל" : "⚪ לא פעיל"}
                </td>

                <td><div
                className="orders-folder"
                onClick={() =>
                  setOpenOrdersFor(openOrdersFor === c.id ? null : c.id)
                }
              >
                📁 {c.totalOrders} הזמנות
              </div></td>
                {openOrdersFor === c.id && (
                <div className="orders-list">
                  {getCustomerOrders(c.id).map(o => (
                    <div key={o.id} className="mini-order"  onClick={() => navigate(`/order-details/${o.id}`)} // ניווט לדף פרטי ההזמנה
                                     style={{ cursor: 'pointer', color: '#f5d26a' }} // סגנון עבור הכרטיס של ההזמנה
                    >
                      💎 #{o.id} - {o.status}
                    </div>
                  ))}
                </div>
              )}

                <td className="actions-cell">
                  <button onClick={() => {
                    setSelectedCustomer(c);
                    setIsFormOpen(true);
                  }}>
                    ✏️
                  </button>

                  <button onClick={() => handleDelete(c.id)}>
                    🗑
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAL */}
      <Modal isOpen={isFormOpen} onClose={() => { setIsFormOpen(false); setSelectedCustomer(null); }}>
        <CustomerForm
          existing={selectedCustomer}
          onSave={() => {
            setIsFormOpen(false);
            setSelectedCustomer(null);
          }}
        />
      </Modal>

    </div>
  );
}

export default AllCustomers;