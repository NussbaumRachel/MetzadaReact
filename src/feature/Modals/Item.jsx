
import '../Orders/orders.css';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Item = ({item,isOrder}) => {
  const doors = useSelector(state => state.doors.doors);
    const frames = useSelector(state => state.frames.frames);
  const possibleValues = useSelector(state => state.possibleValues.possibleValues);

  // state מקומי של פריט ההזמנה
  const [itemDetails, setItemDetails] = useState({
    itemType: "1", // "1" = דלת, "2" = משקוף
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
      notes: "",
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
      notes: "",
    }
    
  });

  // פונקציה להחזרת אפשרויות מתוך store
  const getOptions = (field) => possibleValues.find(v => v.field === field)?.limits || [];

  // useEffect לאתחול פריט מה-props
  useEffect(() => {
    if (!item) return;

    // יוצרים עותק של הפריט
    let updated = { ...itemDetails, ...item };

    // מוודאים שפרטי דלת קיימים אם הפריט הוא דלת
    // if (item.orderType === "1" && item.doorDetails) {
    //   updated.doorDetails = { ...orderDetails.doorDetails, ...item.doorDetails };
    // }
if (doors.length > 0 && item.itemId !=0 && item.itemType === 1) {
        const door = doors.find(d => d.id === item.itemId);
        if (door) {
            updated = { ...updated, doorDetails: door,itemType:"1" };
            ///quantity:item.quantity,
        }
    }
    // מוודאים שפרטי משקוף קיימים אם הפריט הוא משקוף
    if (doors.length > 0 && item.itemId !=0 && item.itemType === 2) {
        const frame = frames.find(d => d.id === item.itemId);
        if (frame) {
            updated = { ...updated, frameDetails: frame ,itemType:"2",quantity:item.quantity};
        }
    }


    setItemDetails(updated);
  }, [item]);


  // שינוי כל שדה בפרטי דלת או משקוף
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");
    const updated = {
      ...itemDetails,
      [section]: { ...itemDetails[section], [field]: value }
    };
    setItemDetails(updated);
    if(isOrder)
        {
            // updateItem(index, updated)
        };
  };


  return (
  <div>
{itemDetails.itemType === "1" && (
        <div className="form-section">
          <h3>פרטי דלת</h3>
          {Object.keys(itemDetails.doorDetails).map(field => {
            const options = getOptions(field);
            return (
              <div key={field} className="form-group">
                <label>{field}</label>
                {options.length > 0 ? (
                  <select
                    name={`doorDetails.${field}`}
                    value={itemDetails.doorDetails[field]}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value={field}>{field}</option>
                    {options.map(opt => (
                      <option key={opt.Id} value={opt.value}>
                        {opt.value}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={`doorDetails.${field}`}
                    value={itemDetails.doorDetails[field]}
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
      {itemDetails.itemType === "2" && (
        <div className="form-section">
          <h3>פרטי משקוף</h3>
          {Object.keys(itemDetails.frameDetails).map(field => {
            const options = getOptions(field);
            return (
              <div key={field} className="form-group">
                <label>{field}</label>
                {options.length > 0 ? (
                  <select
                    name={`frameDetails.${field}`}
                    value={itemDetails.frameDetails[field]}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value={field}>{field}</option>
                    {options.map(opt => (
                      <option key={opt.Id} value={opt.value}>
                        {opt.value}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={`frameDetails.${field}`}
                    value={itemDetails.frameDetails[field]}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

     
    </div>);
};

export default Item;