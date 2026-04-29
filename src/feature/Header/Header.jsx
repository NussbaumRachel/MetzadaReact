// // src/components/Header.jsx
// import React from "react";

// export default function Header({ activePage, setActivePage }) {
//   const pages = [
//     { key: "home", label: "בית" },
//     { key: "orders", label: "הזמנות" },
//     { key: "doors", label: "דלתות" },
//     { key: "frames", label: "משקופים" },
//     { key: "customers", label: "לקוחות" },
//   ];

//   return (
//     <header className="header">
//       <div className="logo-area">
//         <img src={"/pics/logo.png"} className="logo-placeholder" alt="לוגו מצדה" />
//         <div className="site-title">מצדה - ניהול מפעל דלתות</div>
//       </div>
//       <nav className="nav-menu">
//         {pages.map(page => (
//           <div
//             key={page.key}
//             className={`nav-item ${activePage === page.key ? "active" : ""}`}
//             onClick={() => setActivePage(page.key)}
//           >
//             {page.label}
//           </div>
//         ))}
//       </nav>
//     </header>
//   );
// }
// src/components/Header.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const pages = [
    { path: "/home", label: "בית" },
    { path: "/orders", label: "הזמנות" },
    { path: "/doors", label: "דלתות" },
    { path: "/frames", label: "משקופים" },
    { path: "/customers", label: "לקוחות" },
    { path: "/manager", label: "ניהול עובדים" }
  ];

  return (
    <header className="header">
      <div className="logo-area">
        <img src={"/pics/logo.png"} className="logo-placeholder" alt="לוגו מצדה" />
        <div className="site-title">מצדה - ניהול מפעל דלתות</div>
      </div>
      <nav className="nav-menu">
        {pages.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            {page.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}