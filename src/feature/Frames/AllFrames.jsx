import React from "react";
import { useState } from "react"
import Modal from "../Modals/Modal";
import OrderItem from "../Orders/OrderItem";
import { useSelector, useDispatch } from "react-redux";
import { deleteFrame, getAllFrames } from "./FramesSlice";
import ManagePossibleValuesButton from "../PossibleValues/ManagePossibleValuesButton";
import "../Orders/orders.css";
import GenerateDoor from "../Orders/GenerateDoor";
import OrderItemDetails from "../Orders/OrderItemDetails";

export default function AllFrames() {
  const frames = useSelector(state => state.frames.frames)?.filter(f => f.statusArchive !== true) || [];
  const dispatch = useDispatch();
  const [selectedDoor2, setSelectedDoor2] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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
              <th>סוג משקוף</th>
              <th>תיאור</th>
              <th>פרופיל</th>
              <th>רוחב</th>
              <th>גובה</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
           {/*{ field: "side", hebrow: "צד", type: "text" },
    { field: "width", hebrow: "רוחב", type: "number" },
    { field: "height", hebrow: "גובה", type: "number" },
    { field: "hinges", hebrow: "מספר צירים", type: "number" },
    { field: "perforationTypeForShoeing", hebrow: "סוג ניקוב לפירזול", type: "text" },
    { field: "skylight", hebrow: "צוהר", type: "text" },
    { field: "perforation", hebrow: "ניקוב", type: "text" },
    { field: "shoeingA", hebrow: "פירזול A", type: "text" },
    { field: "shoeingB", hebrow: "פירזול B", type: "text" },
    { field: "shoeingC", hebrow: "פירזול C", type: "text" },
    { field: "finishing", hebrow: "גימור", type: "text" }
        , { field: "type", hebrow: "סוג דלת", type: "text" },
    { field: "opening", hebrow: "פתיחה", type: "text" },
    { field: "color", hebrow: "צבע", type: "text" },
    { field: "leaf", hebrow: "עלים", type: "text" },
    { field: "internalLayoutWidth", hebrow: "רוחב פרופיל פנימי", type: "number" },
    { field: "internalLayoutLength", hebrow: "גובה פרופיל פנימי", type: "number" },
    { field: "externalLayoutWidth", hebrow: "רוחב פרופיל חיצוני", type: "number" },
    { field: "externalLayoutLength", hebrow: "גובה פרופיל חיצוני", type: "number" },
    { field: "price", hebrow: "מחיר", type: "number" } */}
            {frames.map(f => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.type}</td>
                <td>{f.desc}</td>
                <td>{f.profile}</td>
                <td>{f.width}</td>
                <td>{f.height}</td>
                <td> <div className="actions-cell"> <button className="action-btn" onClick={() => openDetails(f)}>פרטים</button>
                  <button className="action-btn" onClick={() => openDelete(f)}>מחיקה</button>
                  <button className="action-btn" onClick={() => openEdit(f)}>עריכה</button> 
                  <button
                                            onClick={() => {
                                        setSelectedDoor2(f);
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
        <ManagePossibleValuesButton type={"2"}/></Modal>)}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)}>
        <div className="modal-header">
          <h2>פרטי משקוף</h2>
        </div>

        {selectedFrame && 
        (
          <div className="modal-body">
            <OrderItemDetails item={selectedFrame} />
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
        <h2>הוספת משקוף</h2>
        <OrderItem
          item={{ itemType: "2" }}
          isOrder={false} 
          isNew={true}
          />
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