import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../Api/OrdersApi";
import { createDoor } from "../Doors/DoorsSlice";
import { createFrame } from "../Frames/FramesSlice";
const OrderItem = ({ index, item, updateItem, isOrder, isNew }) => {
  const doors = useSelector(state => state.doors.doors);
  const frames = useSelector(state => state.frames.frames);
  const dispatch = useDispatch();

  const possibleValues = useSelector(state => state.possibleValues.possibleValues);

  // state מקומי של פריט ההזמנה
  const [orderDetails, setOrderDetails] = useState({
    itemType: "1", //  "2" = דלת ="1" , משקוף
    doorDetails: {
      side: "",
      width: 0,
      height: 0,
      hinges: 0,
      perforationTypeForShoeing: "",
      skylight: "",
      perforation: "",
      shoeingA: "",
      shoeingB: "",
      shoeingC: "",
      finishing: "",
      type: "",
      opening: "",
      color: "",
      leaf: "",
      internalLayoutWidth: 0,
      internalLayoutLength: 0,
      externalLayoutWidth: 0,
      externalLayoutLength: 0,
    },
    frameDetails: {
      side: "",
      desc: "",
      width: 0,
      height: 0,
      hinges: 0,
      wallFrameThickness: 0,
      perforationTypeForShoeing: "",
      opening: "",
      framesHeightWithShutter: 0,
      profile: "",
      perforation: "",
      color: "",
    },
    quantity: 1
  });
  const doorsFields = useSelector(state => state.doors.doorsFields);
  const framesFields = useSelector(state => state.frames.framesFields);
  // פונקציה להחזרת אפשרויות מתוך store
  const getOptions = (field) => {
    return possibleValues.find(v => v.key === field)?.values || []
  };

  // useEffect לאתחול פריט מה-props
  useEffect(() => {
    if (!item) return;
    if(!isNew){
    let updated = { ...orderDetails, ...item };
    if (doors.length > 0 && item.itemId != 0 && item.itemType === 1) {
      const door = doors.find(d => d.id === item.itemId);
      if (door) {
        updated = { ...updated, doorDetails: door, frameDetails: orderDetails.frameDetails, itemType: "1" };
        if (isOrder) {
          updated = { ...updated, quantity: item.quantity };
          updateItem(index, updated);
        }
      }
    }
    // מוודאים שפרטי משקוף קיימים אם הפריט הוא משקוף
    if (frames.length > 0 && item.itemId != 0 && item.itemType === 2) {
      const frame = frames.find(d => d.id === item.itemId);
      if (frame) {
        updated = { ...updated, frameDetails: frame, doorDetails: orderDetails.doorDetails, itemType: "2" };
        if (isOrder) {
          updated = { ...updated, quantity: item.quantity };
          updateItem(index, updated);
        }
      }
    }
    console.log("updated", updated);
    setOrderDetails(updated);}
    else{
      if(item.itemType === "1"){
        let updated = { ...orderDetails, doorDetails: orderDetails.doorDetails, itemType: "1" };
        setOrderDetails(updated);
      }
      else if(item.itemType === "2"){
        let updated = { ...orderDetails, frameDetails: orderDetails.frameDetails, itemType: "2" };
        setOrderDetails(updated);
      }
    }
  }, []);

  // שינוי סוג פריט (דלת/משקוף) או כמות
  const handleDoorFrameChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const updated = { ...orderDetails, [name]: value };
    console.log("updated", updated);

    setOrderDetails(updated);
    updateItem(index, updated);
  };

  // שינוי כל שדה בפרטי דלת או משקוף
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const [section, field] = name.split(".");
    const updated = {
      ...orderDetails,
      [section]: { ...orderDetails[section], [field]: value }
    };
    console.log("updated", updated);

    setOrderDetails(updated);
    if (isOrder)
      updateItem(index, updated);
  };
  const addItem = () => {
    if(orderDetails.itemType == "1")
      dispatch(createDoor(orderDetails.doorDetails))
    else{
      dispatch(createFrame(orderDetails.frameDetails))
    }
  }
  return (
    <div className="order-item">
      <div className="form-group">
        {isOrder && (<div>
          <h3>פרטי פריט {index + 1}</h3>

          <label>סוג הזמנה</label>
          <select
            name="itemType"
            value={orderDetails.itemType}
            onChange={handleDoorFrameChange}
            className="form-select"
          >
            <option value="1">דלת</option>
            <option value="2">משקוף</option>
          </select>
        </div>)}
      </div>

      {/* פרטי דלת */}
      {orderDetails.itemType === "1" && (
        <div className="form-section">
          <h3>פרטי דלת</h3>
          {doorsFields.map(field => {
            const options = getOptions(field.field);
            return (
              <div key={field.field} className="form-group">
                <label>{field.hebrow}</label>
                {options.length > 0 ? (
                  <select
                    name={`doorDetails.${field.field}`}
                    value={orderDetails.doorDetails[field.field]}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="">בחר אפשרות</option>
                    {options.map(opt => (
                      <option value={opt.value}>
                        {opt.value}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={`doorDetails.${field.field}`}
                    value={orderDetails.doorDetails[field.field] || ""}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* פרטי משקוף */}
      {orderDetails.itemType === "2" && (
        <div className="form-section">
          <h3>פרטי משקוף</h3>
          {framesFields.map(field => {
            const options = getOptions(field.field);
            return (
              <div key={field.field} className="form-group">
                <label>{field.hebrow}</label>
                {options.length > 0 ? (
                  <select
                    name={`frameDetails.${field.field}`}
                    value={orderDetails.frameDetails[field.field]}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="">בחר אפשרות</option>
                    {options.map(opt => (
                      <option key={opt.Id} value={opt.value}>
                        {opt.value}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={`frameDetails.${field.field}`}
                    value={orderDetails.frameDetails[field.field] || ""}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
      {isOrder && (
        <div className="form-group">
          <label>כמות</label>
          <input
            type="number"
            name="quantity"
            value={orderDetails.quantity}
            onChange={handleDoorFrameChange}
          />
        </div>)}
        {isNew && <button onClick={() => {orderDetails.itemType == "1" ?addItem(orderDetails.doorDetails) :addItem(orderDetails.frameDetails) }}>הוסף פריט</button>}
    </div>
  );
};

export default OrderItem;











