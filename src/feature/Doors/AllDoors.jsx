import "../Orders/orders.css";
import React, { use } from "react";
import { useState } from "react"
import Modal from "../Modals/Modal";
import OrderItem from "../Orders/OrderItem";
import { useSelector, useDispatch } from "react-redux";
import { deleteDoor, getAllDoors } from "./DoorsSlice";
import ManagePossibleValuesButton from "../PossibleValues/ManagePossibleValuesButton";
import OrderItemDetails from "../Orders/OrderItemDetails";
import GenerateDoor from "../Orders/GenerateDoor";

export default function AllDoors() {
    const doorFields = useSelector(state => state.doors.doorsFields) || [];
    const doors = useSelector(state => state.doors.doors)?.filter(d => d.statusArchive !== true) || [];
    const dispatch = useDispatch();
    const [selectedDoor2, setSelectedDoor2] = useState(null);
const [isOpen, setIsOpen] = useState(false);
    const [selectedDoor, setSelectedDoor] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isManagePossibleValuesOpen, setIsManagePossibleValuesOpen] = useState(false);
        const [isAddOpen, setIsAddOpen] = useState(false);
    
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
            <button onClick={() => { setIsAddOpen(true) }} className="btn-primary">
הוספת דלת חדשה      </button>
            <div className="orders-table-wrapper">
                <table className="orders-table">
                    <thead>
                        <tr>

                            <th>ID</th>
                            <th>סוג דלת</th>
                            <th>מחיר</th>
                            <th>רוחב</th>
                            <th>גובה</th>
                            <th>צבע</th>
                            <td>צד</td>
                            <th>פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doors.map(d => (
                            <tr key={d.id}>
                                <td>{d.id}</td>
                                <td>{d.type}</td>
                                <td>{d.price}</td>
                                <td>{d.width}</td>
                                <td>{d.height}</td>
                                <td>{d.color}</td>
                                <td>{d.side}</td>
                                
                               
                                <td> <div className="actions-cell"> <button className="action-btn" onClick={() => openDetails(d)}>פרטים</button>
                                    <button className="action-btn" onClick={() => openDelete(d)}>מחיקה</button>
                                    <button className="action-btn" onClick={() => openEdit(d)}>עריכה</button> 
                                        
                                        <button
                                            onClick={() => {
                                        setSelectedDoor2(d);
                                        setIsOpen(true);
                                    }}
                                    >
                                    יצירת הדמיה
                                    </button></div> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isManagePossibleValuesOpen && (<Modal isOpen={isManagePossibleValuesOpen} onClose={() => setIsManagePossibleValuesOpen(false)}>
                <ManagePossibleValuesButton type={"1"}/></Modal>)}

            <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)}>
                <div className="modal-header">
                    <h2>פרטי דלת</h2>
                </div>

                {selectedDoor && (
                    <div className="modal-body">
                        <OrderItemDetails item={selectedDoor} />
                    </div>
                )}
            </Modal>
            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                <div className="modal-header">
                    <h2>מחיקת דלת</h2>
                </div>
                <div className="modal-body">
                    <p>האם אתה בטוח שברצונך למחוק את הדלת?</p>
                </div>
                <div className="modal-footer">
                    <button className="btn-secondary" onClick={() => setIsDeleteOpen(false)}>ביטול</button>
                    <button className="btn-danger" onClick={handleDelete}>מחק</button>
                </div>
            </Modal>
            <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
                    <h2>הוספת דלת</h2>
                    <OrderItem
                    item={{ itemType: "1" }}
                    isOrder={false} 
                    isNew={true}
                    />
                </Modal>
            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
                <h2>עריכת דלת</h2>
                <OrderItem
                    item={{ doorDetails: selectedDoor, itemType: "1" }}
                    isOrder={false} />
            </Modal>
            {
            isOpen && selectedDoor2 && (
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <GenerateDoor
        door={selectedDoor2}
        onClose={() => setIsOpen(false)}
        />
    </Modal>
    )
}
        </main>
    );
}