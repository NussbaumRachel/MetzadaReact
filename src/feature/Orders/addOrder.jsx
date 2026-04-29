import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addNewOrderAsync } from "./OrdersSlice";
import { fetchLimits } from "../PossibleValues/PossibleValuesSlice";
import OrderItem from "./OrderItem";
import './AddOrder.css';
import { z } from "zod";
import { useNavigate } from "react-router-dom";


const AddOrder = ({ existingOrder }) => {
 const navigate = useNavigate();
  
const goToAddCustomer = () => {
  navigate("/add-customer", {
    state: { name: search }
  });
};



// export const orderSchema = z.object({
//   custName: z.string().min(1, "חובה להזין שם לקוח"),
//   deliveryDate: z.string().min(1, "חובה לבחור תאריך"),

//   street: z.string().min(1),
//   plot: z.string().optional(),
//   buildingNum: z.string().optional(),
//   floor: z.string().optional(),
//   apartmentNum: z.string().optional(),

//   price: z.number().min(0, "מחיר לא תקין").optional(),
//   notes: z.string().optional()
// });









const custs = useSelector(state => state.customers.customers) || []
const [search, setSearch] = useState("");
const [filteredCustomers, setFilteredCustomers] = useState(custs);
const [showDropdown, setShowDropdown] = useState(false);

useEffect(() => {
  if (!search) {
    setFilteredCustomers([]);
    return;
  }

  const filtered = custs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  setFilteredCustomers(filtered);
}, [search, custs]);

const selectCustomer = (customer) => {
  setOrder(prev => ({
    ...prev,
    custName: customer.name,
    custId: customer.id
  }));

  setSearch(customer.name);
  setShowDropdown(false);
};









  const [order, setOrder] = useState({
    custName: "",
    deliveryDate: "",
    orderItems: [],
    existingOrder:null
  });
const addressFields = [
  { name: "street", label: "רחוב", type: "text" },
  { name: "plot", label: "מגרש", type: "text" },
  { name: "buildingNum", label: "בניין", type: "text" },
  { name: "floor", label: "קומה", type: "text" },
  { name: "apartmentNum", label: "דירה", type: "text" },
  { name: "price", label: "מחיר", type: "number" }
];
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
        street: existingOrder.street || "",
        plot: existingOrder.plot || "",
        buildingNum: existingOrder.buildingNum || "",
        floor: existingOrder.floor || "",
        apartmentNum: existingOrder.apartmentNum || "",
        price: existingOrder.price || "",
        notes: existingOrder.notes || "",
      orderItems: [],
      existingOrder: existingOrder
    });

    extendsOrderItems(existingOrder.orderItems);
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
      orderDate: new Date().toISOString().split('T')[0], // תאריך הזמנה הוא היום
      orderItems: order.orderItems,
      custId:custs.find(c => c.name == order.custName)?.id
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

       <div className="form-group autocomplete">
  <label>שם לקוח</label>

  <div className="input-with-btn">
    <input
      type="text"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setShowDropdown(true);
      }}
      onFocus={() => setShowDropdown(true)}
    />

    {search && filteredCustomers.length === 0 && (
      <button
        type="button"
        className="add-btn"
        onClick={goToAddCustomer}
      >
        לא נמצא, הוסף לקוח חדש
      </button>
    )}
  </div>

  {showDropdown && filteredCustomers.length > 0 && (
    <ul className="dropdown">
      {filteredCustomers.map(c => (
        <li key={c.id} onClick={() => selectCustomer(c)}>
          {c.name}
        </li>
      ))}
    </ul>
  )}
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
<div className="form-grid">
  {addressFields.map(f => (
    <div className="form-group" key={f.name}>
      <label>{f.label}</label>
      <input
        type={f.type}
        name={f.name}
        value={order[f.name]}
        onChange={handleInputChange}
      />
    </div>
  ))}
</div>

<div className="form-group full">
  <label>הערות</label>
  <textarea name="notes" value={order.notes} onChange={handleInputChange} />
</div>
        <div>
          {order.orderItems.map((item = {}, index) => (
            <OrderItem
              key={index}
              index={index}
              item={item}
              updateItem={updateItem}
              isOrder={true}
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

