import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderItemDetails from "./OrderItemDetails";
import { de } from "zod/v4/locales";

const OrderDetails = () => {
    const { orderId } = useParams();
    const orders = useSelector(s => s.orders.orders);
    const doors = useSelector(s => s.doors.doors);
    const doorsframes = useSelector(s => s.frames.frames);
    const [order, setOrder] = useState(null);
    const [expandedItems, setExpandedItems] = useState([]); // שמירה על פריטים פתוחים

        const toggleItem = (itemId) => {
        // אם הפריט פתוח, נסגור אותו
        setExpandedItems(prev => 
            prev.includes(itemId) 
                ? prev.filter(id => id !== itemId) // אם הפילטר פתוח, נסיר אותו
                : [...prev, itemId]               // נוסיף את המזהה של הפריט הנבחר
        );
    };
    
const calcPrice = (item) => {
    debugger;
    if(item.itemType === 1) {
        const door = doors.find(d => d.id === item.itemId);
        if (!door) return "--";
        return parseFloat(door.price).toLocaleString("he-IL") * item.quantity;
    }
    const frame = doorsframes.find(f => f.id === item.itemId);
    if (!frame) return "--";
    return parseFloat(frame.price).toLocaleString("he-IL") * item.quantity;
};

    useEffect(() => {
        setOrder(orders.find(o => o.id === +orderId));
    }, [orderId, orders]);

    if (!order) return <div className="lux-empty">לא נמצאה הזמנה</div>;

    return (
        <div className="lux-container">
            <div className="lux-card">
                <div className="lux-header">
                    <h2>הזמנה #{order.id}</h2>
                    <div className="lux-status">פעיל</div>
                </div>

                <div className="lux-info-grid">
                    <div><b>לקוח:</b> {order.custName}</div>
                    <div><b>תאריך:</b> {new Date(order.deliveryDate).toLocaleDateString("he-IL")}</div>
                    <div><b>כתובת:</b> {order.street} {order.buildingNum}</div>
                    <div><b>הערות:</b> {order.notes || "--"}</div>
                </div>
            </div>
            <div className="lux-items">
            {console.log("order.orderItems",order.orderItems)}

    {order.orderItems.map((item, i) => (
        <div
            key={i}
            className="lux-item-card"
            onClick={() => toggleItem(item.itemId)}
        >
            <div className="lux-item-header">
                <span className="lux-badge">{item.itemType}</span>
                <span className="lux-qty">כמות: {item.quantity}</span>
            </div>

            <div className="lux-grid">
                <div className="lux-field">
                    <span className="lux-label">מחיר</span>
                    <span className="lux-value">{calcPrice(item)} ₪</span>
                </div>

                <div className="lux-field">
                    <span className="lux-label">סטטוס</span>
                    <span className="lux-value">{item.status}</span>
                </div>
            </div>

            {expandedItems.includes(item.itemId) && (
                <div style={{ marginTop: "12px" }}>
                    <OrderItemDetails item={item} />
                </div>
            )}
        </div>
    ))}
</div>
        </div>
    );
};

export default OrderDetails;