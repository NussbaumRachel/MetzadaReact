import { useState, useContext, useEffect } from "react"
import * as XLSX from "xlsx";
import axios from 'axios'
import AddOrder from "./addOrder";
import './orders.css'
import Modal from "../Modals/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoors } from "../Doors/DoorsSlice";
import { getAllOrders } from "../Orders/OrdersSlice"
import { getAllFrames } from "../Frames/FramesSlice";
import { checkAllLimits } from "../PossibleValues/PossibleValuesSlice";
import { getAllCustomers } from "../Customers/CustomerSlice"
import OrderDetails from "./OrderDetails";
import { useNavigate } from "react-router-dom";
function AllOrders() {   
    const navigate = useNavigate();
    const customers = useSelector(state => state.customers.customers)
    const orders = useSelector(state => state.orders.orders)
    const statusO = useSelector(state => state.orders.status)
    const statusD = useSelector(state => state.doors.status)
    const statusL = useSelector(state => state.possibleValues.status)
    const statusF = useSelector(state => state.frames.status)
    const [active, setActive] = useState("הזמנות");
    const [filter, setFilter] = useState("הכול");
    const menuItems = ["הזמנות", "דלתות", "משקופים", "לקוחות"];
    // הוסף ל-state
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const filteredOrders = filter === "הכול" ? orders : orders.filter((o) => o.status === filter);

    const renderStatusPill = (status) => {
        if (status === "פתוחה") {
            return (
                <span className="status-pill status-open"> <span className="status-dot" /> פתוחה </span>);
        }
        if (status === "בתהליך") { return (<span className="status-pill status-in-progress"> <span className="status-dot" /> בתהליך ייצור </span>); }
        return (<span className="status-pill status-done"> <span className="status-dot" /> הושלמה </span>);
    };
    const dis = useDispatch()
    const [loading, setLoading] = useState(true);
    //     useEffect(
    //         () => {
    //             if (status == "") {
    //                 console.log("status", status);
    //                 dis(getAllOrders());
    //                 dis(fetchLimits());
    //                 setLoading(false);
    //             }
    //         }
    //         , [status, dis]
    //     )

    //     /**
    //  * פתיחת חלונית פרטים
    //  */
    //     // useEffect(() => {       
    //     //    dis(fetchLimits());
    //     // }, [])
    useEffect(() => {
        const load = async () => {
            await dis(getAllDoors());
            await dis(checkAllLimits());
            await dis(getAllOrders());
            await dis(getAllFrames());
            await dis(getAllCustomers())
        };

        load();
    }, []);

    useEffect(() => {
        if (
            statusO === "succeeded" &&
            statusD === "succeeded" &&
            statusL === "succeeded" &&
            statusF === "succeeded"
        ) {
            setLoading(false);
        }
    }, [statusO, statusD, statusL, statusF]);
    const openDetails = (order) => {
        setSelectedOrder(order);
        navigate(`/order-details/${order.id}`);
        // setIsDetailsOpen(true);
    };

    /**
     * פתיחת חלונית עריכה
     */
    const openEdit = (order) => {
        setSelectedOrder(order);
        setIsEditOpen(true);
    };
    const getContactName = (custId) => {
 
        const customer = customers.find(c => c.id === custId);
        return customer ? customer.contactPersonName : "לא נמצא";
    }
    const exportToExcel = () => {
        // יצירת WorkBook
        const ws = XLSX.utils.json_to_sheet(orders); // המרת נתונים מהמערך ל-sheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "orders"); // הוספת ה-sheet ל-workbook

        // יצירת קובץ Excel להורדה
        XLSX.writeFile(wb, "orders.xlsx");
    };
    if (loading) {
        return <div className="loading">מתחיל טעינה...</div>;
    }
    return (<div>
        {/* <header className="header">
            <div className="logo-area">
                <div className="logo-placeholder"> לוגו<br />מצדה
                </div>
                <div className="site-title">מצדה - ניהול מפעל דלתות</div>
            </div>
            <nav className="nav-menu">
                {menuItems.map((item) => (<div key={item} className={`nav-item ${active === item ? "active" : ""}`} onClick={() => setActive(item)} > {item} </div>))}
            </nav>
        </header> */}
        <main className="orders-page">
            <div className="orders-header">
                <div className="orders-title-block">
                    <h1 className="orders-title">הזמנות</h1>
                    {/* <section className="dashboard-graph">
                        <h2 className="graph-title">סטטוס הזמנות במפעל</h2>
                        <p className="graph-subtitle"> תמונת מצב מהירה של כל ההזמנות לפי סטטוס. </p>
                        <div className="graph-wrapper">
                            {[{ label: "פתוחות", value: 24, className: "open" },
                            { label: "בתהליך", value: 16, className: "in-progress" },
                            { label: "הושלמו", value: 8, className: "done" },
                            { label: "ביטול / חריגים", value: 2, className: "cancelled" }].map((item) => (<div key={item.label} className="graph-column">
                                <div className={`graph-bar ${item.className}`} style={{ "--bar-value": item.value }} > <span className="graph-value">{item.value}</span>
                                </div> <div className="graph-label">{item.label}</div> </div>))} <div className="graph-glow" />
                        </div>
                    </section> */}
                    <p className="orders-subtitle"> ניהול מרכזי של כל הזמנות המפעל – סטטוס ייצור, לקוחות, כמויות ותאריכי אספקה. </p>
                </div>
                <div className="orders-actions">
                    <button className="btn-primary" onClick={() => setActive("הזמנה חדשה")}>הזמנה חדשה</button>
                    <button className="btn-secondary" onClick={exportToExcel}>ייצוא לאקסל</button>
                </div>
            </div>
            <div className="orders-filters">
                <span>סינון לפי סטטוס:</span>
                {["הכול", "פתוחה", "בתהליך", "הושלמה"].map((f) => (
                    <button key={f} className={`filter-pill ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)} > {f} </button>))}
            </div>
            <div className="orders-table-wrapper">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>מס' הזמנה</th>
                            <th>לקוח</th>
                            <th>תאריך הזמנה</th>
                            <th>תאריך אספקה</th>
                            <th>סטטוס</th>
                            <th>איש קשר</th>
                            <th>פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*  id*/}
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.custName}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.deliveryDate}</td>
                                <td>{renderStatusPill(order.status)}</td>
                                <td>{getContactName(order.custId)}</td>
                                <td> <div className="actions-cell"> <button className="action-btn" onClick={() => openDetails(order)}>פרטים</button>
                                    <button className="action-btn" onClick={() => openEdit(order)}>עריכה</button> </div> </td></tr>))} </tbody> </table> </div> </main>
        {active === "הזמנה חדשה" ? (
            <Modal isOpen={true} onClose={() => setActive("הזמנות")}>
            <AddOrder />
            </Modal>
        ) : (
            <div>
                {/* הצגת רשימת הזמנות */}
            </div>
        )}


        <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)}>
            <div className="modal-header">
                <h2>פרטי הזמנה</h2>
            </div>

            {selectedOrder && (
                <div className="modal-body">
                    <div className="details-grid">
                        <div><strong>מספר:</strong> {selectedOrder.id}</div>
                        <div><strong>לקוח:</strong> {selectedOrder.custName}</div>
                        <div><strong>תאריך:</strong> {selectedOrder.deliveryDate}</div>
                        <div><strong>סטטוס:</strong> {selectedOrder.status}</div>
                        <div><strong>מנהל:</strong> {selectedOrder.manager}</div>
                    </div>

                    <h3>פריטי הזמנה</h3>
                    <div className="items-list">
                        {selectedOrder.orderItems?.map((item, i) => (
                            <div key={i} className="item-card">
                                <div>סוג: {item.itemType}</div>
                                <div>Id: {item.itemId}</div>
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

        <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
            <h2>עריכת הזמנה</h2>
            {selectedOrder && (
                <AddOrder existingOrder={selectedOrder} />
            )}
        </Modal>
    </div>);
}
export default AllOrders
