
// import React, { useState } from "react";
// import "./AllDoors.css";
// import { useSelector } from "react-redux";

// const doorsData = [
//   {
//     id: 1,
//     name: "דלת פלדה יוקרתית",
//     type: "פלדה",
//     color: "שחור",
//     price: 3200,
//     img: "/images/door1.jpg",
//     status: "במלאי",
//     isFavorite: false,
//     history: ["המחיר עודכן ל-3200 ₪", "הסטטוס שונה ל'במלאי'"],
//   },
//   {
//     id: 2,
//     name: "דלת פנים לבנה",
//     type: "פנים",
//     color: "לבן",
//     price: 1200,
//     img: "/images/door2.jpg",
//     status: "אזל",
//     isFavorite: true,
//     history: ["הסטטוס שונה ל'אזל'"],
//   },
//   // הוסיפי עוד דלתות כרצונך
// ];
// const doors = useSelector(state => state.doors.doors) || [];
// const types = ["הכול", "פלדה", "פנים", "עץ"];
// const statuses = ["הכול", "במלאי", "אזל", "בייצור"];

// export default function DoorsAdminPage() {
//   const [filterType, setFilterType] = useState("הכול");
//   const [filterStatus, setFilterStatus] = useState("הכול");
//   const [search, setSearch] = useState("");
//   const [lightbox, setLightbox] = useState(null);
//   const [showHistory, setShowHistory] = useState(null);

//   const filteredDoors = doorsData.filter((d) => {
//     const typeMatch = filterType === "הכול" || d.type === filterType;
//     const statusMatch = filterStatus === "הכול" || d.status === filterStatus;
//     const searchMatch =
//       d.name.includes(search) ||
//       d.type.includes(search) ||
//       d.color.includes(search);
//     return typeMatch && statusMatch && searchMatch;
//   });

//   return (
//     <div>
//       <header className="header">
//         <div className="logo-area">
//           <img src="/images/logo.png" alt="לוגו" height="24" />
//           <span>ניהול דלתות</span>
//         </div>
//         <nav>
//           <a href="#doors" className="active">דלתות</a>
//           <a href="#orders">הזמנות</a>
//           <a href="#clients">לקוחות</a>
//         </nav>
//       </header>

//       <main>
//         <h2 className="doors-title">קטלוג דלתות</h2>
//         <section className="filters">
//           <input
//             type="text"
//             placeholder="חיפוש דלת..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             className="search-input"
//           />
//           <select value={filterType} onChange={e => setFilterType(e.target.value)}>
//             {types.map(t => <option key={t}>{t}</option>)}
//           </select>
//           <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
//             {statuses.map(s => <option key={s}>{s}</option>)}
//           </select>
//         </section>

//         <section className="doors-grid">
//           {filteredDoors.map((door) => (
//             <div className="door-card" key={door.id}>
//               <div className="door-img-wrap" onClick={() => setLightbox(door.img)}>
//                 <img src={door.img} alt={door.name} />
//                 <span className={`status-badge ${door.status}`}>{door.status}</span>
//                 {door.isFavorite && <span className="fav-star" title="מועדפת">★</span>}
//               </div>
//               <div className="door-info">
//                 <h3>{door.name}</h3>
//                 <div className="door-meta">
//                   <span>סוג: {door.type}</span>
//                   <span>צבע: {door.color}</span>
//                 </div>
//                 <div className="door-bottom">
//                   <span className="door-price">{door.price} ₪</span>
//                   <button className="history-btn" onClick={() => setShowHistory(door.id)}>
//                     היסטוריה
//                   </button>
//                 </div>
//               </div>
//               {/* היסטוריית שינויים */}
//               {showHistory === door.id && (
//                 <div className="history-popup" onClick={() => setShowHistory(null)}>
//                   <div>
//                     <b>היסטוריית שינויים:</b>
//                     <ul>
//                       {door.history.map((h, i) => <li key={i}>{h}</li>)}
//                     </ul>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </section>
//         {/* Lightbox */}
//         {lightbox && (
//           <div className="lightbox" onClick={() => setLightbox(null)}>
//             <img src={lightbox} alt="תמונה מוגדלת" />
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


// src/feature/Doors/AllDoors.jsx
import React, { use } from "react";
import { useState, useContext, useEffect } from "react"
import Modal from "../Modals/Modal";
import OrderItem from "../Orders/OrderItem";
import { useSelector,useDispatch } from "react-redux";
import Item from "../Modals/Item";
import { deleteDoor, getAllDoors } from "./DoorsSlice";

export default function AllDoors() {
  const doors = useSelector(state => state.doors.doors) || [];
  const dispatch = useDispatch();
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const openDetails = (door) => {
    setSelectedDoor(door);
    setIsDetailsOpen(true);
    };

    /**
     * פתיחת חלונית עריכה
     */
    const openDelete = (door) => {
        setSelectedDoor(door);
        setIsDeleteOpen(true);
    };
    const handleDelete = () => {
        // כאן תוכל להוסיף את הלוגיקה למחיקת ההזמנה (למשל, קריאה ל-API)
        dispatch(deleteDoor(selectedDoor.id));
        console.log("מחיקת הזמנה עם ID:", selectedDoor.id);
        setIsDeleteOpen(false);
    }
  return (
    <main className="orders-page">
      <h1 className="orders-title">דלתות</h1>
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>סוג דלת</th>
              <th>רוחב</th>
              <th>גובה</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {doors.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.type}</td>
                <td>{d.width}</td>
                <td>{d.height}</td>
                <td> <div className="actions-cell"> <button className="action-btn" onClick={() => openDetails(d)}>פרטים</button>
                <button className="action-btn" onClick={() => openDelete(d)}>מחיקה</button> </div> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)}>
            <div className="modal-header">
                <h2>פרטי הזמנה</h2>
            </div>

            {selectedDoor && (
                <div className="modal-body">
                    <div className="details-grid">
                        <div><strong>מספר:</strong> {selectedDoor.id}</div>
                        <div><strong>לקוח:</strong> {selectedDoor.custName}</div>
                        <div><strong>תאריך:</strong> {selectedDoor.deliveryDate}</div>
                        <div><strong>סטטוס:</strong> {selectedDoor.status}</div>
                        <div><strong>מנהל:</strong> {selectedDoor.manager}</div>
                    </div>

                    <h3>פריטי הזמנה</h3>
                    <div className="items-list">
                        {selectedDoor.orderItems?.map((item, i) => (
                            <div key={i} className="item-card">
                                <div>סוג: {item.itemType}</div>
                                <div>כמות: {item.quantity}</div>

                                {item.itemType === "1" && (
                                    <>
                                        <div>רוחב: {item.doorDetails?.width}</div>
                                        <div>גובה: {item.doorDetails?.height}</div>
                                        <div>צבע: {item.doorDetails?.color}</div>
                                    </>
                                )}

                                {item.itemType === "2" && (
                                    <>
                                        <div>רוחב: {item.frameDetails?.width}</div>
                                        <div>גובה: {item.frameDetails?.height}</div>
                                        <div>פרופיל: {item.frameDetails?.profile}</div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Modal>
<Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
            <div className="modal-header">
                <h2>מחיקת הזמנה</h2>
            </div>
            <div className="modal-body">
                <p>האם אתה בטוח שברצונך למחוק את ההזמנה?</p>
            </div>
            <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setIsDeleteOpen(false)}>ביטול</button>
                <button className="btn-danger" onClick={handleDelete}>מחק</button>
            </div>
        </Modal>
    </main>
  );
}