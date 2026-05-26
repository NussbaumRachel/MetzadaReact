// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import HebrewDate from 'hebrew-date';
// import './Manager.css';

// const Manager = () => {

//     const [date, setDate] = useState(new Date());

//     const orders = [
//         { id: 1, custName: "יוסי כהן", deliveryDate: "2024-07-01" },
//         { id: 2, custName: "שרה לוי", deliveryDate: "2024-07-05" },
//         { id: 3, custName: "דוד ישראלי", deliveryDate: "2024-07-10" },
//     ];

//     const getOrdersByDate = (d) => {
//         return orders.filter(order =>
//             new Date(order.deliveryDate).toDateString() === d.toDateString()
//         );
//     };

//     const getHebrewDate = (d) => {
//         const h = new HebrewDate(d);
//         return `${h.day}`;
//     };

//     const days = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];

//     return (
//         <div className="calendar-layout">

//             {/* צד שמאל - ימי השבוע */}
//             <div className="week-days-column">
//                 {days.map((d, i) => (
//                     <div key={i} className="week-day">{d}</div>
//                 ))}
//             </div>

//             {/* לוח */}
//             <div className="calendar-wrapper custom">

//                 <Calendar
//                     onChange={setDate}
//                     value={date}
//                     calendarType="gregory"

//                     formatDay={(locale, date) => date.getDate()}

//                     tileContent={({ date, view }) => {
//                         if (view !== 'month') return null;

//                         const dailyOrders = getOrdersByDate(date);

//                         return (
//                             <div className="tile-inner">

//                                 <div className="dates">
//                                     <span className="greg">{date.getDate()}</span>
//                                     <span className="heb">{getHebrewDate(date)}</span>
//                                 </div>

//                                 {dailyOrders.length > 0 && (
//                                     <div className="orders">
//                                         {dailyOrders.map(o => (
//                                             <span key={o.id} className="order">
//                                                 #{o.id}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 )}

//                             </div>
//                         );
//                     }}

//                     tileClassName={({ date, view }) => {
//                         if (view !== 'month') return null;
//                         return getOrdersByDate(date).length ? 'delivery' : null;
//                     }}
//                 />

//             </div>
//         </div>
//     );
// };

// export default Manager;
import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";
import Calendar1 from "./Calendar1";
import AllEmployees from "../Employees/AllEmployees";
import AllTasks from "./AllTasks";
import "./Manager.css";

const Manager = () => {
  return (
    <div className="manager-page">
      <style>{`
/* ===== Base ===== */

.manager-page {
    display: flex;
    min-height: 100vh;
    flex-direction: row; /* הפיכה חזרה לכיוון רגיל */
    background: linear-gradient(135deg, #0b1020, #111a2e, #0a0f1a);
    font-family: Arial;
    color: #fff;
}

/* ===== Sidebar Nav ===== */

.manager-nav {
    width: 220px;
    min-height: 100vh;
    padding: 25px 15px;
    display: flex;
    flex-direction: column;
    gap: 14px;

    background: linear-gradient(180deg, #121a2a, #0e1422);

    border-left: 1px solid rgba(0, 229, 255, 0.15);
    border-right: none;

    box-shadow: 10px 0 30px rgba(0,0,0,0.45);
}

/* ===== Links ===== */

.manager-link {
    padding: 14px 16px;
    border-radius: 14px;
    text-decoration: none;
    color: #b8c7e0;
    font-size: 15px;
    font-weight: 600;

    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(0, 229, 255, 0.08);

    transition: 0.25s ease;
    position: relative;
    overflow: hidden;
}

/* hover */
.manager-link:hover {
    background: rgba(0, 229, 255, 0.08);
    transform: translateX(-4px);
    color: #ffffff;
}

/* active */
.manager-link.active {
    background: linear-gradient(135deg, #00c6ff, #0072ff);
    color: #fff;
    box-shadow: 0 8px 20px rgba(0,0,0,0.35);
}

/* shine effect */
.manager-link::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.10);
    transition: 0.5s;
}

.manager-link:hover::before {
    left: 100%;
}

/* ===== Content ===== */

.manager-content {
    flex: 1;
    padding: 30px;
    overflow-x: auto;
}

/* ===== Responsive ===== */

@media (max-width: 900px) {

    .manager-page {
        flex-direction: column;
    }

    .manager-nav {
        width: 100%;
        min-height: auto;
        flex-direction: row;
        overflow-x: auto;
        gap: 10px;
        padding: 15px;

        border-left: none;
    }

    .manager-link {
        white-space: nowrap;
        flex-shrink: 0;
    }
}
`}</style>
<nav className="manager-nav">

  <NavLink
    to="/manager/dashboard"
    className={({ isActive }) =>
      isActive ? "manager-link active" : "manager-link"
    }
  >
    לוח בקרה
  </NavLink>

  <NavLink
    to="/manager/calendar"
    className={({ isActive }) =>
      isActive ? "manager-link active" : "manager-link"
    }
  >
    לוח שנה
  </NavLink>

  <NavLink
    to="/manager/employees"
    className={({ isActive }) =>
      isActive ? "manager-link active" : "manager-link"
    }
  >
    עובדים
  </NavLink>
<NavLink
    to="/manager/Tasks"
    className={({ isActive }) =>
      isActive ? "manager-link active" : "manager-link"
    }
  >
משימות
  </NavLink>
</nav>

      <div className="manager-content">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendar" element={<Calendar1 />} />
          <Route path="employees" element={<AllEmployees />} />
          <Route path="Tasks" element={<AllTasks />} />
        </Routes>
      </div>
    </div>
  );
};

export default Manager;
