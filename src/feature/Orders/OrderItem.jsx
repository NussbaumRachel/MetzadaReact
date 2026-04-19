
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getDoorById } from "../Doors/DoorsSlice";
// import { getFrameById } from "../Frames/FramesSlice";
// const OrderItem = ({ index, updateItem, item }) => {
//   const doors = useSelector(state => state.doors.doors)
//   const possibleValues = useSelector(state => state.possibleValues.possibleValues)
//   const [orderDetails, setOrderDetails] = useState({
//     orderType: "1",
//     doorDetails: {
//       side: "",
//       width: 0,
//       height: 0,
//       hinges: 0,
//       perforationTypeForShoeing: "",
//       skylight: "",
//       perforation: "",
//       shoeingA: "",
//       shoeingB: "",
//       shoeingC: "",
//       finishing: "",
//       type: "",
//       opening: "",
//       color: "",
//       leaf: "",
//       internalLayoutWidth: 0,
//       internalLayoutLength: 0,
//       externalLayoutWidth: 0,
//       externalLayoutLength: 0,
//       notes: "",
//     },
//     frameDetails: {
//       side: "",
//       desc: "",
//       width: 0,
//       height: 0,
//       hinges: 0,
//       wallFrameThickness: 0,
//       perforationTypeForShoeing: "",
//       opening: "",
//       framesHeightWithShutter: 0,
//       profile: "",
//       color: "",
//       notes: "",
//     },
//     quantity: 1
//   });


// //   const dis = useDispatch()
// //   const getDoorById =(id) => {
          
// //             let d = doors.filter(d => d.id != id)
// //             console.log("d : ", d);
// //             return d
// //         }
// //  useEffect(() => {
 
// //         getDoorById(item.itemId)
// //  }
//     // , []);

// useEffect(() => {
//     if (!item) return;

//     let updated = { ...item };

//     if (doors.length && item.itemId && item.itemType === "1") {
//         const door = doors.find(d => d.id === item.itemId);
//         if (door) {
//             updated = { ...updated, doorDetails: door };
//         }
//     }

//         setOrderDetails(updated);

// }, [item, doors]);

//   // useEffect(() => {
//   //   const start = async () => {
//   //     if (item.quantity) {
//   //       let i
//   //       if (item.itemType == "1") {          
//   //         i = dis(getDoorById(item.itemId))
//   //         item = { ...item, doorDetails: i.payload }
//   //         console.log("doorDetails,i.payload", i.payload);

//   //         console.log("itemווווווווווווווו", item);
//   //       }
//   //       else {
//   //         i =  dis(getFrameById(item.itemId))
//   //         item = { ...item, frameDetails: i.payload }
//   //         console.log("item", item);
//   //       }
//   //       setOrderDetails(item)
//   //     }
//   //   }
//   //   start()
//   // }
//   //   , []);


 
//   const getOptions = (field) => {
//     return possibleValues.find(v => v.field === field)?.limits || [];
//   };

//   const handleDoorFrameChange = (e) => {
//     const { name, value } = e.target;

//     const updated = {
//       ...orderDetails,
//       [name]: value,
//     };

//     setOrderDetails(updated);
//       updateItem(index, updated);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     const [section, field] = name.split(".");

//     const updated = {
//       ...orderDetails,
//       [section]: {
//         ...orderDetails[section],
//         [field]: value,
//       },
//     };

//     setOrderDetails(updated);
//       updateItem(index, updated);
//   };

//   return (
//     <div className="order-item">
//       <div className="form-group">
//         <h3>פרטי פריט {index + 1}</h3>

//         <label>סוג הזמנה</label>
//         <select
//           name="orderType"
//           value={orderDetails.orderType}
//           onChange={handleDoorFrameChange}
//           className="form-select"
//         >
//           <option value="1">דלת</option>
//           <option value="2">משקוף</option>
//         </select>
//       </div>
//       {/* */}
//       {orderDetails.orderType === "1" && (
//         <div className="form-section">
//           <h3>פרטי דלת</h3>

//           {["side", "width", "height", "hinges",
//             "perforationTypeForShoeing", "skylight",
//             "perforation", "shoeingA", "shoeingB",
//             "shoeingC", "finishing", "type", "opening",
//             "color", "leaf", "internalLayoutWidth", "internalLayoutLength", "externalLayoutWidth", "externalLayoutLength", "notes"].map(field => {
//               const options = getOptions(field);
//               console.log(orderDetails, "orderDetails.doorDetails[field]");

//               return (
//                 <div key={field} className="form-group">
//                   <label>{field}</label>

//                   {options.length > 0 ? (
//                     <select
//                       name={`doorDetails.${field}`}
//                       onChange={handleInputChange}
//                       value={orderDetails.doorDetails[field] || ""}
//                       className="form-input"
//                     >
//                       {options.map(option => (
//                         <option key={option.Id} value={option.value}>
//                           {option.value}
//                         </option>
//                       ))}
//                     </select>
//                   ) : (
//                     <input
//                       type="text"
//                       name={`doorDetails.${field}`}
//                       value={orderDetails.doorDetails[field] || ""}
//                       onChange={handleInputChange}
//                       className="form-input"
//                     />
//                   )}
//                 </div>
//               );
//             })}
//         </div>
//       )}

//       {orderDetails.orderType === "2" && (
//         <div className="form-section">
//           <h3>פרטי משקוף</h3>
//           {["desc", "side", "width", "height", "hinges", "wallFrameThickness", "perforation", "profile", "color", "perforationTypeForShoeing", "opening", "framesHeightWithShutter", "notes"].map(field => {
//             const options = getOptions(field);

//             return (
//               <div key={field} className="form-group">
//                 <label>{field}</label>

//                 {options.length > 0 ? (
//                   <select
//                     name={`frameDetails.${field}`}
//                     value={orderDetails.frameDetails[field] || ""}
//                     onChange={handleInputChange}
//                     className="form-input"
//                   >
//                     {options.map(option => (
//                       <option key={option.Id} value={option.value}>
//                         {option.value}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   <input
//                     type="text"
//                     name={`frameDetails.${field}`}
//                     value={orderDetails.frameDetails[field]}
//                     onChange={handleInputChange}
//                     className="form-input"
//                   />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//       <label htmlFor={`quantity`}>כמות</label>
//       <input type="number" name={`quantity`} value={orderDetails.quantity} onChange={handleDoorFrameChange} />
//     </div>
//   );
// };

// export default OrderItem;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/**
 * רכיב OrderItem - מציג ומנהל פריט הזמנה בודד
 *
 * Props:
 * - index: מספר הסידורי של הפריט
 * - item: אובייקט פריט קיים (לעריכה)
 * - updateItem: פונקציה לעדכון הפריט ב-AddOrder
 *
 * State:
 * - orderDetails: אובייקט עם כל פרטי הפריט, כולל פרטי דלת או משקוף
 *
 * פונקציות עיקריות:
 * - handleDoorFrameChange: משנה סוג פריט (דלת / משקוף)
 * - handleInputChange: משנה כל שדה בפרטי הפריט
 * - useEffect: אתחול ה-state מה-props של item והבטחת הצגה נכונה
 */
const OrderItem = ({ index, item, updateItem }) => {
  const doors = useSelector(state => state.doors.doors);
    const frames = useSelector(state => state.frames.frames);

  const possibleValues = useSelector(state => state.possibleValues.possibleValues);

  // state מקומי של פריט ההזמנה
  const [orderDetails, setOrderDetails] = useState({
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
    },
    quantity: 1
  });

  // פונקציה להחזרת אפשרויות מתוך store
  const getOptions = (field) => possibleValues.find(v => v.field === field)?.limits || [];

  // useEffect לאתחול פריט מה-props
  useEffect(() => {
    if (!item) return;

    // יוצרים עותק של הפריט
    let updated = { ...orderDetails, ...item };

    // מוודאים שפרטי דלת קיימים אם הפריט הוא דלת
    // if (item.orderType === "1" && item.doorDetails) {
    //   updated.doorDetails = { ...orderDetails.doorDetails, ...item.doorDetails };
    // }
if (doors.length > 0 && item.itemId !=0 && item.itemType === 1) {
        const door = doors.find(d => d.id === item.itemId);
        if (door) {
            updated = { ...updated, doorDetails: door,quantity:item.quantity,itemType:"1" };
        }
    }
    // מוודאים שפרטי משקוף קיימים אם הפריט הוא משקוף
    if (doors.length > 0 && item.itemId !=0 && item.itemType === 2) {
        const frame = frames.find(d => d.id === item.itemId);
        if (frame) {
            updated = { ...updated, frameDetails: frame ,itemType:"2",quantity:item.quantity};
        }
    }
console.log("updated",updated);

    setOrderDetails(updated);
  }, [item]);

  // שינוי סוג פריט (דלת/משקוף) או כמות
  const handleDoorFrameChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...orderDetails, [name]: value };
    setOrderDetails(updated);
    updateItem(index, updated);
  };

  // שינוי כל שדה בפרטי דלת או משקוף
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");
    const updated = {
      ...orderDetails,
      [section]: { ...orderDetails[section], [field]: value }
    };
    setOrderDetails(updated);
    updateItem(index, updated);
  };
const function1 = () => {
console.log("orders");

}
  return (
    <div className="order-item">
      <div className="form-group">
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
      </div>

      {/* פרטי דלת */}
      {orderDetails.itemType === "1" && (
        <div className="form-section">
          <h3>פרטי דלת</h3>
          {Object.keys(orderDetails.doorDetails).map(field => {
            const options = getOptions(field);
            return (
              <div key={field} className="form-group">
                <label>{field}</label>
                {options.length > 0 ? (
                  <select
                    name={`doorDetails.${field}`}
                    value={orderDetails.doorDetails[field]}
                    onChange={handleInputChange}
                    className="form-input"
                  >
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
                    value={orderDetails.doorDetails[field]}
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
          {Object.keys(orderDetails.frameDetails).map(field => {
            const options = getOptions(field);
            return (
              <div key={field} className="form-group">
                <label>{field}</label>
                {options.length > 0 ? (
                  <select
                    name={`frameDetails.${field}`}
                    value={orderDetails.frameDetails[field]}
                    onChange={handleInputChange}
                    className="form-input"
                  >
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
                    value={orderDetails.frameDetails[field]}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="form-group">
        <label>כמות</label>
        <input
          type="number"
          name="quantity"
          value={orderDetails.quantity}
          onChange={handleDoorFrameChange}
        />
      </div>
    </div>
  );
};

export default OrderItem;











