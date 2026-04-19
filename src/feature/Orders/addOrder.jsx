import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addNewOrderAsync } from "./OrdersSlice";
import { fetchLimits } from "../PossibleValues/PossibleValuesSlice";
import OrderItem from "./OrderItem";
import './AddOrder.css';

const AddOrder = ({ existingOrder }) => {
  
  const [order, setOrder] = useState({
    custName: "",
    deliveryDate: "",
    orderItems: [],
    existingOrder:null
  });

  // const [loading, setLoading] = useState(true);
  const dis = useDispatch();
  

 

  /**
   * טעינת נתונים קיימים לאינפוטים
   */
  useEffect(() => {
    if (existingOrder) {
      setOrder({
        custName: existingOrder.custName || "",
        deliveryDate: existingOrder.deliveryDate || "",
        orderItems:  [],
        existingOrder:existingOrder
      });
      console.log("order",order)
      extendsOrderItems(existingOrder.orderItems)
    }
  }, []);
  const extendsOrderItems = (ois) =>{
    console.log(ois);
    let newOis = []
    for(let i =0;i<ois?.length;i++){
    newOis.push({quantity:ois[i].quantity,id:ois[i].id,itemId:ois[i].itemId,orderId:ois[i].orderId,itemType:ois[i].itemType,doorDetails:{},frameDetails:{}})
    }
    console.log(newOis);
    setOrder(prev => ({...prev,orderItems:newOis}))
    return newOis
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const addOrderItem = () => {
    setOrder(prev => ({
      ...prev,
      orderItems: [...prev.orderItems, {}]
    }));
  };

 const updateItem = (index, newItem) => {
  console.log("newItem",newItem);
  
  setOrder(prev => {
    const items = [...(prev.orderItems || [])];
    items[index] = newItem;
console.log("items",items);

    return {
      ...prev,
      orderItems: items
    };
  });
};



  const createOrd = (e) => {
    console.log("createOrd");
   
    e.preventDefault();
    const finalOrder = {
      ...order,
      orderItems: order.orderItems,
    };
    dis(addNewOrderAsync(finalOrder));
  };

  // if (loading) {
  //   return <div className="loading">מתחיל טעינה...</div>;
  // }

  return (
    <div className="add-order-container">
      <h2>הוסף הזמנה חדשה</h2>

      <form  className="order-form">

        <div className="form-group">
          <label htmlFor="custName">שם הלקוח</label>
          <input
            type="text"
            id="custName"
            name="custName"
            value={order.custName}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="deliveryDate">תאריך אספקה</label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            value={order.deliveryDate}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div>
          {order.orderItems.map((item = {}, index) => (
            <OrderItem
              key={index}
              index={index}
              item={item}
              updateItem={updateItem}
            />
          ))}

          <button type="button" onClick={addOrderItem}>
            הוסף פריט
          </button>
        </div>

        <div className="form-actions">
          <button  className="btn-submit" onClick={createOrd} >
            שלח הזמנה
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddOrder;

