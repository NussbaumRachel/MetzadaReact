// src/components/Header.jsx
import React from "react";

export default function Header({ activePage, setActivePage }) {
  const pages = [
    { key: "home", label: "בית" },
    { key: "orders", label: "הזמנות" },
    { key: "doors", label: "דלתות" },
    { key: "frames", label: "משקופים" },
    { key: "customers", label: "לקוחות" },
  ];

  return (
    <header className="header">
      <div className="logo-area">
        <img src={"/pics/logo.png"} className="logo-placeholder" alt="לוגו מצדה" />
        <div className="site-title">מצדה - ניהול מפעל דלתות</div>
      </div>
      <nav className="nav-menu">
        {pages.map(page => (
          <div
            key={page.key}
            className={`nav-item ${activePage === page.key ? "active" : ""}`}
            onClick={() => setActivePage(page.key)}
          >
            {page.label}
          </div>
        ))}
      </nav>
    </header>
  );
}