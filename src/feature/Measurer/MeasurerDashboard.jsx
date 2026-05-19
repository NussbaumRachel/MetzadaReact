import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../Orders/OrdersSlice";
import { getAllCustomers } from "../Customers/CustomerSlice";
import Modal from "../Modals/Modal";
import OrderItem from "../Orders/OrderItem";
import AddOrder from "../Orders/addOrder";
/**
 * קומפוננטת ממשק מודד
 * מציגה הזמנות פתוחות בלבד, מאפשרת חיפוש לפי לקוח/מגרש
 * ומספקת אפשרות להוספה ועריכה של פריטי הזמנה.
 */
function MeasurerDashboard() {
    const dispatch = useDispatch();

    // Redux state
    const orders = useSelector(state => state.orders.orders);
    const customers = useSelector(state => state.customers.customers);
    const ordersStatus = useSelector(state => state.orders.status);
    const customersStatus = useSelector(state => state.customers.status);

    // State מקומי
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isAddItemOpen, setIsAddItemOpen] = useState(false);

    // טעינת נתונים
    useEffect(() => {
        const loadData = async () => {
            await dispatch(getAllOrders());
            await dispatch(getAllCustomers());
        };
        loadData();
    }, [dispatch]);

    // עצירת מצב טעינה כאשר הנתונים זמינים
    useEffect(() => {
        if (ordersStatus === "succeeded" && customersStatus === "succeeded") {
            setLoading(false);
        }
    }, [ordersStatus, customersStatus]);

    // סינון הזמנות פתוחות לפי חיפוש
    const filteredOrders = orders
        .filter(order => order.status === "פתוחה") // רק הזמנות פתוחות
        .filter(order => {
            const searchLower = search.toLowerCase();
            const customerName = order.custName.toLowerCase();
            const siteName = order.site?.toLowerCase() || "";
            return customerName.includes(searchLower) || siteName.includes(searchLower);
        });

    // קבלת שם איש קשר
    const getContactName = (custId) => {
        const customer = customers.find(c => c.id === custId);
        return customer ? customer.contactPersonName : "לא נמצא";
    };

    if (loading) return <div className="loading">טוען נתונים...</div>;

    return (
        <div className="measurer-orders-page">
            <h1>ממשק מודד</h1>

            {/* חיפוש לפי לקוח/מגרש */}
            <div className="search-bar">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="חיפוש לפי לקוח או מגרש..."
                />
            </div>

            {/* רשימת הזמנות */}
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>מס' הזמנה</th>
                        <th>לקוח</th>
                        <th>תאריך הזמנה</th>
                        <th>סטטוס</th>
                        <th>איש קשר</th>
                        <th>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.custName}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.status}</td>
                            <td>{getContactName(order.custId)}</td>
                            <td>
                                <button onClick={() => {
                                    setSelectedOrder(order);
                                    setIsAddItemOpen(true);
                                }}>הוסף/ערוך פריטים</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* מודל הוספה/עריכה של פריטים */}
            <Modal isOpen={isAddItemOpen} onClose={() => setIsAddItemOpen(false)}>
                {selectedOrder && (
                    <div>
                        <h2>הזמנה #{selectedOrder.id}</h2>
                        <h3>פריטי הזמנה</h3>
                        <div className="items-list">
                            {selectedOrder.orderItems?.map((item, index) => (
                                <OrderItem
                                    key={index}
                                    item={item}
                                    index={index}
                                    isOrder={true}
                                    isNew={false}
                                    setIsChange={() => {}}
                                    updateItem={() => {}}
                                    canEditExistingItems={true} // נעדכן לפי הרשאות בהמשך
                                />
                            ))}
                        </div>

                        <h3>הוסף פריט חדש</h3>
                        <AddOrder existingOrder={selectedOrder} />
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default MeasurerDashboard;