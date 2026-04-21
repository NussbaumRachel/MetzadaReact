
import React, { use } from "react";
import { useState } from "react"
import Modal from "../Modals/Modal";
import OrderItem from "../Orders/OrderItem";
import { useSelector, useDispatch } from "react-redux";
import { deleteDoor, getAllDoors } from "./DoorsSlice";
import ManagePossibleValuesButton from "../PossibleValues/ManagePossibleValuesButton";


export default function AllDoors() {
    const doors = useSelector(state => state.doors.doors) || [];
    const dispatch = useDispatch();
    const [selectedDoor, setSelectedDoor] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isManagePossibleValuesOpen, setIsManagePossibleValuesOpen] = useState(false);

    const openDetails = (door) => {
        setSelectedDoor(door);
        setIsDetailsOpen(true);
    };
    const openEdit = (door) => {
        setSelectedDoor(door);
        setIsEditOpen(true);
    };
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
            <button onClick={() => { setIsManagePossibleValuesOpen(true) }} className="btn-primary">
                ניהול ערכים מוגבלים
            </button>
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
                                    <button className="action-btn" onClick={() => openDelete(d)}>מחיקה</button>
                                    <button className="action-btn" onClick={() => openEdit(d)}>עריכה</button> </div> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isManagePossibleValuesOpen && (<Modal isOpen={isManagePossibleValuesOpen} onClose={() => setIsManagePossibleValuesOpen(false)}>
                <ManagePossibleValuesButton /></Modal>)}

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
            {/* <Modal isEditOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
            <div className="modal-header">
                <h2>עריכת הזמנה</h2>
            </div>
            <div className="modal-body">
                <p>האם אתה בטוח שברצונך למחוק את ההזמנה?</p>
            </div>
            <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setIsDeleteOpen(false)}>ביטול</button>
                <button className="btn-danger" onClick={handleDelete}>מחק</button>
            </div>
        </Modal> */}
            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
                <h2>עריכת דלת</h2>
                <OrderItem
                    item={{ doorDetails: selectedDoor, itemType: "1" }}
                    isOrder={false} />
            </Modal>
        </main>
    );
}