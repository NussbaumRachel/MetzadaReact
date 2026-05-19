import { useState, useContext, useEffect } from "react"
import ExportOrdersExcel from "./ExportOrdersExcel";
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
import { getAllEmployees } from "../Employees/EmployeeSlice";
function AllOrders() {
    const navigate = useNavigate();
    const customers = useSelector(state => state.customers.customers)
    const orders = useSelector(state => state.orders.orders)
    const statusO = useSelector(state => state.orders.status)
    const statusD = useSelector(state => state.doors.status)
    const statusL = useSelector(state => state.possibleValues.status)
    const statusC = useSelector(state => state.customers.status)
    const statusF = useSelector(state => state.frames.status)
    const statusE = useSelector(state => state.employees.status)
    const [active, setActive] = useState("הזמנות");
    const [filter, setFilter] = useState("הכול");
    const menuItems = ["הזמנות", "דלתות", "משקופים", "לקוחות"];
    const [customerSearch, setCustomerSearch] = useState("");
//     const filteredByCustomer = filteredOrders.filter(order =>
//     order.custName.toLowerCase().includes(customerSearch.toLowerCase())
// );
    // הוסף ל-state
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const role = useSelector(state => state.employees.user?.role);
    // const filteredOrders = filter === "הכול" ? orders : orders.filter((o) => o.status === filter);
    const filteredOrders = orders
    .filter(order => role === "measurer" ? order.status === "פתוחה" : true)
    .filter(order => filter === "הכול" ? true : order.status === filter)
    .filter(order => order.custName.toLowerCase().includes(customerSearch.toLowerCase()));
    const userRole = useSelector(state => state.employees.user?.role);

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
    useEffect(() => {
        const load = async () => {
            await dis(getAllDoors());
            await dis(checkAllLimits());
            await dis(getAllOrders());
            await dis(getAllFrames());
            await dis(getAllCustomers())
            await dis(getAllEmployees())
        };

        load();
    }, []);

    useEffect(() => {
        if (
            statusO === "succeeded" &&
            statusD === "succeeded" &&
            statusL === "succeeded" &&
            statusF === "succeeded" &&
            statusC === "succeeded" &&
            statusE === "succeeded"

        ) {
            setLoading(false);
        }
    }, [statusO, statusD, statusL, statusF, statusC, statusE]);
    const openDetails = (order) => {
        setSelectedOrder(order);
        navigate(`/order-details/${order.id}`);

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

    if (loading) {
        return <div className="loading">מתחיל טעינה...</div>;
    }
    return (<div>
        <main className="orders-page">
            <div className="orders-header">
                <div className="orders-title-block">
                    <h1 className="orders-title">הזמנות</h1>

                    <p className="orders-subtitle"> ניהול מרכזי של כל הזמנות המפעל – סטטוס ייצור, לקוחות, כמויות ותאריכי אספקה. </p>
                </div>
                <div className="orders-actions">
                    <button className="btn-primary" onClick={() => setActive("הזמנה חדשה")}>הזמנה חדשה</button>
                    <ExportOrdersExcel />
                </div>
            </div>
            {/* <div className="customer-search">
                <label>חיפוש לפי לקוח:</label>
                <input
                    type="text"
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    placeholder="הקלד שם לקוח"
                />
            </div> */}
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
                            <th>תאריך עדכון אחרון</th>
                            <th>תאריך אספקה</th>
                            <th>סטטוס</th>
                            <th>איש קשר</th>
                            <th>הערות</th>
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
                                <td>{order.updateDate}</td>
                                <td>{order.deliveryDate}</td>
                                <td>{renderStatusPill(order.status)}</td>
                                <td>{getContactName(order.custId)}</td>
                                <td>{order.notes}</td>
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