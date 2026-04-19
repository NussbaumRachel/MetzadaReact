import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addOrder, getOrders ,updateOrder} from "../../Api/OrdersApi";
import { createFrame } from "../Frames/FramesSlice"
import axios from "axios";

import { createDoor } from "../Doors/DoorsSlice"
// יצירת פעולה אסינכרונית להוספת הזמנה
export const createOrder = createAsyncThunk("orders/addOrder", addOrder);
export const getAllOrders = createAsyncThunk("orders/getOrders", getOrders)
export const updateTheOrder = createAsyncThunk("orders/updateOrder", updateOrder)


// מצב התחלתי של הסטייט
const initialState = {
  orders: [],    // מערך ההזמנות
  status: "", // מצב ברירת מחדל (הפעולה לא בוצעה עדיין)
  error: null,   // שגיאות אפשריות
};

export const addNewOrderAsync = createAsyncThunk(
  "orders/addNewOrderAsync",
  async (order,{ dispatch }) => {
    const newOrder = {
      id: order.existingOrder.id || 0,
      custId: "1234",
      custName: order.custName,
      deliveryDate: order.deliveryDate,
      street: "hhh",
      plot: "78",
      buildingNum: 77,
      floor: 4,
      apartmentNum: 20,
      price: 456789,
      notes: "jokoj",
      status: "פתוחה",
      orderItems: []
    };
console.log("vbnmvbn");

    for (let i = 0; i < order.orderItems.length; i++) {
      if (order.orderItems[i].itemType === 1) {
        
        let id = await dispatch(createDoor(order.orderItems[i].doorDetails));
        newOrder.orderItems.push({ id: 0, orderId: order.existingOrder.id || 0, itemType: "1", itemId: id.payload, quantity: order.orderItems[i].quantity });
      }
       else if (order.orderItems[i].itemType === 2) {
        
        let id = await dispatch(createFrame(order.orderItems[i].frameDetails));
        newOrder.orderItems.push({ id: 0, orderId: order.existingOrder.id || 0, itemType: "2", itemId: id.payload, quantity: order.orderItems[i].quantity });
      }
    }
    console.log(newOrder, "before adding order");
    console.log("order.existingOrder",order.existingOrder);
    
   if(!order.existingOrder)
     await dispatch(createOrder(newOrder))
    else 
  await dispatch(updateOrder(newOrder))
  }
);

// יצירת הסלייס לניהול הזמנות
const ordersSlice = createSlice({
  name: "orders", // שם הסלייס
  initialState,   // מצב התחלתי
  reducers: {
    // addNewOrder:(state,action) =>{
    //   debugger
    //   const order = action.payload
    //   for (let i = 0; i < order.orderItems.length; i++) {
    //     if (order.orderItems[i].orderType == "door")
    //     {createDoor(order.orderItems[i].doorDetails)}
    //   }
    // }
    // אפשר להוסיף reducers נוספים בעת הצורך (למשל, להוריד הזמנה או לעדכן סטטוס)
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.status = "loading"; // עדכון הסטטוס ל-"loading"
      })
      // כאשר הבקשה הושלמה בהצלחה
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded"; // עדכון הסטטוס ל-"succeeded"
        state.orders = action.payload; // הוספת הזמנה חדשה למערך ההזמנות
      
      })
      // כאשר הבקשה נכשלה
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = "failed"; // עדכון הסטטוס ל-"failed"
        state.error = action.error.message; // שמירת השגיאה במצב
      })
      // כאשר הבקשה ב-process (המתנה לתשובה)
      .addCase(createOrder.pending, (state) => {
        state.status = "loading"; // עדכון הסטטוס ל-"loading"
      })
      // כאשר הבקשה הושלמה בהצלחה
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded"; // עדכון הסטטוס ל-"succeeded"
        getAllOrders() // הוספת הזמנה חדשה למערך ההזמנות
      debugger
        console.log("state.orders",state.orders);
      
      })
      // כאשר הבקשה נכשלה
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed"; // עדכון הסטטוס ל-"failed"
        state.error = action.error.message; // שמירת השגיאה במצב
      })
      .addCase(addNewOrderAsync.fulfilled, (state, action) => {
                state.status = "succeeded"; // עדכון הסטטוס ל-"succeeded"
        // state.orders.push(action.payload);
      })
      .addCase(updateTheOrder.pending, (state) => {
        state.status = "loading"; // עדכון הסטטוס ל-"loading"
      })
      // כאשר הבקשה הושלמה בהצלחה
      .addCase(updateTheOrder.fulfilled, (state, action) => {
        state.status = "succeeded"; // עדכון הסטטוס ל-"succeeded"
      
      })
      // כאשר הבקשה נכשלה
      .addCase(updateTheOrder.rejected, (state, action) => {
        state.status = "failed"; // עדכון הסטטוס ל-"failed"
        state.error = action.error.message; // שמירת השגיאה במצב
      })
  }

});
export default ordersSlice.reducer;

// ### הסבר על הקוד:

// 1. **`addOrder`** – פעולה אסינכרונית שנועדה לשלוח את פרטי ההזמנה לשרת ולחזור עם התגובה.
// 2. **`initialState`** – מצב התחלתי שמכיל מערך של הזמנות, סטטוס פעולה ושגיאות.
// 3. **`extraReducers`** – חלק מהקוד שמנהל את מצב הסטטוס (ממתין, הושלם, נכשל) על פי תוצאות הקריאה ל-API.
// 4. **`createSlice`** – הפונקציה שיוצרת את הסלייס עם הסטטוס והפונקציות המתאימות לניהול הזמנות.

// אם תרצה להוסיף או לשנות משהו בקוד, אני כאן לעזור!
