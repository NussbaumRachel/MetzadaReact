import React from "react";
import { useState } from "react"
import Modal from "../Modals/Modal";
import OrderItem from "../Orders/OrderItem";
import { useSelector, useDispatch } from "react-redux";
import { deleteFrame, getAllFrames } from "./FramesSlice";
import ManagePossibleValuesButton from "../PossibleValues/ManagePossibleValuesButton";
import "../Orders/orders.css";

export default function AllFrames() {
  const frames = useSelector(state => state.frames.frames) || [];
  const dispatch = useDispatch();
  const [selectedFrame, setselectedFrame] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);

  const [isManagePossibleValuesOpen, setIsManagePossibleValuesOpen] = useState(false);
  const openDetails = (frame) => {
    setselectedFrame(frame);
    setIsDetailsOpen(true);
  };
  const openEdit = (frame) => {
    setselectedFrame(frame);
    setIsEditOpen(true);
  };
  const openDelete = (frame) => {
    setselectedFrame(frame);
    setIsDeleteOpen(true);
  };
  const handleDelete = () => {
    dispatch(deleteFrame(selectedFrame.id));
    console.log("מחיקת הזמנה עם ID:", selectedFrame.id);
    setIsDeleteOpen(false);
  }
  return (
    <main className="orders-page">
      <h1 className="orders-title">משקופים</h1>
      <button onClick={() => { setIsManagePossibleValuesOpen(true) }} className="btn-primary">
        ניהול ערכים מוגבלים
      </button>
      <button onClick={() => { setIsAddOpen(true) }} className="btn-primary">
הוספת משקוף חדש      </button>
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>פרופיל</th>
              <th>רוחב</th>
              <th>גובה</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {frames.map(f => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.profile}</td>
                <td>{f.width}</td>
                <td>{f.height}</td>
                <td> <div className="actions-cell"> <button className="action-btn" onClick={() => openDetails(f)}>פרטים</button>
                  <button className="action-btn" onClick={() => openDelete(f)}>מחיקה</button>
                  <button className="action-btn" onClick={() => openEdit(f)}>עריכה</button> </div> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isManagePossibleValuesOpen && (<Modal isOpen={isManagePossibleValuesOpen} onClose={() => setIsManagePossibleValuesOpen(false)}>
        <ManagePossibleValuesButton type={"2"}/></Modal>)}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)}>
        <div className="modal-header">
          <h2>פרטי הזמנה</h2>
        </div>

        {selectedFrame && (
          <div className="modal-body">
            <div className="details-grid">
              <div><strong>מספר:</strong> {selectedFrame.id}</div>
              <div><strong>לקוח:</strong> {selectedFrame.custName}</div>
              <div><strong>תאריך:</strong> {selectedFrame.deliveryDate}</div>
              <div><strong>סטטוס:</strong> {selectedFrame.status}</div>
              <div><strong>מנהל:</strong> {selectedFrame.manager}</div>
            </div>

            <h3>פריטי הזמנה</h3>
            <div className="items-list">
              {selectedFrame.orderItems?.map((item, i) => (
                <div key={i} className="item-card">
                  <div>סוג: {item.itemType}</div>
                  <div>כמות: {item.quantity}</div>

                  {item.itemType === "1" && (
                    <>
                      <div>רוחב: {item.frameDetails?.width}</div>
                      <div>גובה: {item.frameDetails?.height}</div>
                      <div>צבע: {item.frameDetails?.color}</div>
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
          <h2>מחיקת משקוף</h2>
        </div>
        <div className="modal-body">
          <p>האם אתה בטוח שברצונך למחוק את המשקוף?</p>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={() => setIsDeleteOpen(false)}>ביטול</button>
          <button className="btn-danger" onClick={handleDelete}>מחק</button>
        </div>
      </Modal>
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <h2>עריכת משקוף</h2>
        <OrderItem
          item={{ frameDetails: selectedFrame, itemType: "2" }}
          isOrder={false} 
          />
      </Modal>
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <h2>עריכת משקוף</h2>
        <OrderItem
          item={{ itemType: "2" }}
          isOrder={false} 
          isNew={true}
          />
      </Modal>
    </main>
  );
}