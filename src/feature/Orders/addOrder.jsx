import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addNewOrderAsync } from "./OrdersSlice";
import { fetchLimits } from "../PossibleValues/PossibleValuesSlice";
import OrderItem from "./OrderItem";
import './AddOrder.css';
import { date, z } from "zod";
import { useNavigate } from "react-router-dom";
import { log } from "three/src/utils.js";
import Modal from "../Modals/Modal";
import AddCustomer from "../Customers/CustomerForm"; // או הנתיב הנכון אצלך
// import { useSelector } from "react-redux";
const AddOrder = ({ existingOrder }) => {
  const navigate = useNavigate();

  // const goToAddCustomer = () => {
  //   navigate("/add-customer", {
  //     state: { name: search, setIsFormOpen: true }
  //   });
  // };
 const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const custs = useSelector(state => state.customers.customers) || []
  const [search, setSearch] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(custs);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isChange,setIsChange] = useState(false)
  const [errors, setErrors] = useState({});

const validateOrder = () => {

  const newErrors = {};

  // לקוח
  if (!search.trim()) {
    newErrors.custName = "יש לבחור לקוח";
  }

  // תאריך אספקה
  if (!order.deliveryDate) {
    newErrors.deliveryDate = "יש להזין תאריך אספקה";
  }

  // רחוב
  if (!order.street?.trim()) {
    newErrors.street = "יש להזין רחוב";
  }

  // בניין
  if (!order.buildingNum?.toString().trim()) {
    newErrors.buildingNum = "יש להזין מספר בניין";
  }

  // קומה
  if (
    order.floor &&
    isNaN(order.floor)
  ) {
    newErrors.floor = "קומה חייבת להיות מספר";
  }

  // דירה
  if (
    order.apartmentNum &&
    isNaN(order.apartmentNum)
  ) {
    newErrors.apartmentNum = "מספר דירה לא תקין";
  }

  // מחיר
  if (!order.price) {
    newErrors.price = "יש להזין מחיר";
  }
  else if (Number(order.price) <= 0) {
    newErrors.price = "מחיר חייב להיות גדול מ־0";
  }

  // סטטוס
  if (!order.status) {
    newErrors.status = "יש לבחור סטטוס";
  }

  // // פריטים
  // if (!order.orderItems.length) {
  //   newErrors.orderItems = "יש להוסיף לפחות פריט אחד";
  // }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};



  const goToAddCustomer = () => {
  setIsAddCustomerOpen(true);
};
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
  const toggleItem = (itemId) => {
        // אם הפריט פתוח, נסגור אותו
        setExpandedItems(prev => 
            prev.includes(itemId) 
                ? prev.filter(id => id !== itemId) // אם הפילטר פתוח, נסיר אותו
                : [...prev, itemId]               // נוסיף את המזהה של הפריט הנבחר
        );
    };

  const [order, setOrder] = useState({
    custName: "",
    deliveryDate: "",
    orderItems: [],
    existingOrder: null
  });
  const addressFields = [
    { name: "street", label: "רחוב", type: "text" },
    { name: "plot", label: "מגרש", type: "text" },
    { name: "buildingNum", label: "בניין", type: "text" },
    { name: "floor", label: "קומה", type: "text" },
    { name: "apartmentNum", label: "דירה", type: "text" },
    { name: "price", label: "מחיר", type: "number" }
  ];
  const dis = useDispatch();
  useEffect(() => {
    if (existingOrder) {
      console.log("existing order",existingOrder);
      
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
        status: existingOrder.status || "opening",
        orderItems: [],
        orderDate: existingOrder.orderDate || new Date().toISOString(),
        updateDate: new Date().toISOString(),
        existingOrder: existingOrder,
      });
      log("order",order);
      extendsOrderItems(existingOrder.orderItems);
    }
  }, []);

  const extendsOrderItems = (ois) => {
    console.log(ois);
    let newOis = []
    for (let i = 0; i < ois?.length; i++) {
      newOis.push({ quantity: ois[i].quantity, id: ois[i].id, itemId: ois[i].itemId, orderId: ois[i].orderId, itemType: ois[i].itemType, doorDetails: {}, frameDetails: {} })
    }
    console.log(newOis);
    setOrder(prev => ({ ...prev, orderItems: newOis }))
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
    console.log("newItem", newItem);

    setOrder(prev => {
      const items = [...(prev.orderItems || [])];
      items[index] = newItem;
      console.log("items", items);

      return {
        ...prev,
        orderItems: items,
        updateDate: new Date().toISOString(),
      };
    });
  };


const createOrd = (e) => {

  e.preventDefault();

  if (!validateOrder()) {
    return;
  }

  const finalOrder = {
    ...order,
    orderDate: new Date().toISOString().split('T')[0],
    orderItems: order.orderItems,
    custId: custs.find(c => c.name === order.custName)?.id
  };

  dis(addNewOrderAsync(finalOrder));
};

  return (
    <div className="add-order-container">
      <h2>הוסף הזמנה חדשה</h2>

      <form className="order-form">





{/* /////////////שם לקוח עם אוטוקומפליט וטעינת לקוחות מהסטור + כפתור להוספת לקוח אם לא נמצא + טיפול בשגיאות אם לא נבחר לקוח */}




        <div className="form-group autocomplete">

  <label>שם לקוח</label>
          <div className="input-with-btn">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowDropdown(true);
            
              setErrors(prev => ({
          ...prev,
          custName: ""
        }));
      }}
      onFocus={() => setShowDropdown(true)}
      className={errors.custName ? "input-error" : ""}
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
{errors.custName && (
    <span className="error-text">
      {errors.custName}
    </span>
  )}
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
            className={`form-input ${errors.deliveryDate ? "input-error" : ""}`}
          />
          {errors.deliveryDate && (
  <span className="error-text">
    {errors.deliveryDate}
  </span>
)}
        </div>







<div className="form-grid">
{addressFields.map(f => (

  <div className="form-group" key={f.name}>

    <label>{f.label}</label>

    <input
      type={f.type}
      name={f.name}
      value={order[f.name]}
      onChange={(e) => {

        handleInputChange(e);

        setErrors(prev => ({
          ...prev,
          [f.name]: ""
        }));
      }}

      className={errors[f.name] ? "input-error" : ""}
    />

    {errors[f.name] && (
      <span className="error-text">
        {errors[f.name]}
      </span>
    )}

  </div>

))}

  
          
          <div className="form-group full">
          <label>מחיר כולל</label>
          <input type="number" name="price" value={order.price} onChange={handleInputChange} />
          {errors.price && (
  <span className="error-text">
    {errors.price}
  </span>
)}
        </div>
        {/* כאן יהיה אינפוט מסוג סלקט של סטטוס ההזמנה */}
        <div className="form-group">
          <label>סטטוס הזמנה</label>
          <select
            name="status"
            value={order.status}
            onChange={handleInputChange}
            className={errors.status ? "input-error" : ""}
          >
            <option value="opening">פתוחה</option>
            <option value="closed">סגורה</option>
            <option value="in_progress">בתהליך</option>
            <option value="completed">הושלמה</option>
          </select>
          
          {errors.status && (
            <span className="error-text">
              {errors.status}
            </span>
          )}
        </div>
        </div>

        <div className="form-group full">
          <label>הערות</label>
          <textarea name="notes" value={order.notes} onChange={handleInputChange} />
        </div>
        
        <div>
          {order.orderItems.map((item, index) => (
            <div key={index} onClick={() => toggleItem(index)} className="item-summary" style={{ cursor: "pointer" }}>
              <strong>סוג פריט:</strong> {item.itemType}

              {/* {expandedItems.includes(item.itemId) || item == {} && ( */}
                <OrderItem
                  index={index}
                  item={item}
                  updateItem={updateItem} 
                  isOrder={true}
                  isNew={false}
                />
              {/* )} */}
            </div>
          ))}
          <button type="button" onClick={addOrderItem}>
            הוסף פריט
          </button>
        </div>

        <div className="form-actions">
          <button className="btn-submit" onClick={createOrd} >
            שלח הזמנה
          </button>
        </div>

      </form>
      <style>{`

.input-error{
    border:1px solid #a63d4d !important;

    background:#2a161b !important;

    box-shadow:
        0 0 0 3px rgba(166,61,77,0.15);
}

.error-text{
    color:#ff9cab;

    font-size:12px;

    margin-top:5px;

    display:block;

    font-weight:600;
}

`}</style>
{isAddCustomerOpen && (
  <Modal isOpen={isAddCustomerOpen} onClose={() => setIsAddCustomerOpen(false)}>
    <AddCustomer
      // onSuccess={(newCustomer) => {
      //   setSearch(newCustomer.name);
      //   setIsAddCustomerOpen(false);
      // }}
            onSave={() => setIsAddCustomerOpen(false)}

      onClose={() => setIsAddCustomerOpen(false)}
      defaultName={search}
    />
  </Modal>
)}

    </div>
  );
};

export default AddOrder;

