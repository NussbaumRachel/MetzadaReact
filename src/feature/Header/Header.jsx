import React, { Children, use } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Header() {
  const pages = [
    { path: "/home", label: "בית" },
    { path: "/orders", label: "הזמנות" },
    { path: "/doors", label: "דלתות" },
    { path: "/frames", label: "משקופים" },
    { path: "/customers", label: "לקוחות" },
    { path: "/manager", label: "ניהול "  },
    // { path: "/employees", label: "עובדים" },
    // { path: "/measurer", label: "מודד" },
    // { path: "/dashboard", label: "לוח בקרה" },
    // { path: "/calendar", label: "לוח שנה" }
  ];
  const role = useSelector(state => state.employees.user?.role);
  return (
    <header className="header">
      <div className="logo-area">
        <img src={"/pics/logo.png"} className="logo-placeholder" alt="לוגו מצדה" />
        <div className="site-title">מצדה - ניהול מפעל דלתות</div>
      </div>
      <nav className="nav-menu">

        {role != "measurer" ? pages.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            {page.label}
          </NavLink>
        )):   (<NavLink
            key={"/measurer"}
            to={"/measurer"}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            {"מודד"}
          </NavLink>)}
      </nav>
    </header>
  );
}