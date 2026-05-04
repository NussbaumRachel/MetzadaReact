// import React, { use, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import OrderItemDetails from "./OrderItemDetails"; // יבוא הקומפוננטה
// import { log } from "three/src/utils.js";

// const OrderDetails = () => {
//     const { orderId } = useParams(); // קבלת הפרמטרים מה-URL
//     const orders = useSelector(state => state.orders.orders);
//     const [orderDetails, setOrderDetails] = useState(null);

//     useEffect(() => {
//         const order = orders.find(order => order.id === parseInt(orderId));
//         if (order) {
//             setOrderDetails(order);
//         }
//     }, [orderId, orders]);
//     useEffect(() => {
//         log("orderDetails in OrderDetails", orderDetails);
//     }, [orderDetails]);
//     if (!orderDetails) {
//         return <div>לא נמצאה הזמנה</div>; // הודעה במקרה שאין נתונים
//     }
    
//     return (
//         <div className="order-details">
//             <h2>פרטי הזמנה #{orderDetails.id}</h2>
//             <p>שם לקוח: {orderDetails.custName}</p>
//             <p>תאריך אספקה: {new Date(orderDetails.deliveryDate).toLocaleDateString('he-IL')}</p>
//             <p>כתובת: {orderDetails.street}, {orderDetails.plot}, {orderDetails.buildingNum}, {orderDetails.floor}, {orderDetails.apartmentNum}</p>
//             <p>הערות: {orderDetails.notes}</p>

//             <h3>פרטי פריטים</h3>
//             {orderDetails.orderItems.map((item, index) => (
//                 <OrderItemDetails
//                     key={index}
//                     item={item}
//                 />
//             ))}
//         </div>
//     );
// };

// export default OrderDetails;
// OrderDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderItemDetails from "./OrderItemDetails";

const OrderDetails = () => {
    const { orderId } = useParams();
    const orders = useSelector(s => s.orders.orders);
    const [order, setOrder] = useState(null);

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
                {order.orderItems.map((item, i) => (
                    <OrderItemDetails key={i} item={item} />
                ))}
            </div>
        </div>
    );
};

export default OrderDetails;