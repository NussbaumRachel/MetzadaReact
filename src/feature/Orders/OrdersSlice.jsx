import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addOrder, deleteOrderItem, getOrders ,updateOrder} from "../../Api/OrdersApi";
import { createFrame } from "../Frames/FramesSlice"
import axios from "axios";

import { createDoor } from "../Doors/DoorsSlice"
import { date } from "zod";
import { log } from "three/src/utils.js";
// יצירת פעולה אסינכרונית להוספת הזמנה
export const createOrder = createAsyncThunk("orders/addOrder", addOrder);
export const getAllOrders = createAsyncThunk("orders/getOrders", getOrders)
export const updateTheOrder = createAsyncThunk("orders/updateOrder", updateOrder)
export const deleteItemFromOrder = createAsyncThunk("orders/deleteOrderItem", deleteOrderItem)

// מצב התחלתי של הסטייט
const initialState = {
  orders: [],    // מערך ההזמנות
  status: "", // מצב ברירת מחדל (הפעולה לא בוצעה עדיין)
  error: null,   // שגיאות אפשריות
};

export const addNewOrderAsync = createAsyncThunk(
  "orders/addNewOrderAsync",
  async (order,{ dispatch }) => {
const isChange = order?.isChange

  const newOrder = {
      id: order.existingOrder?.id || 0,
      custId: order.custId,
      custName: order.custName,
      deliveryDate: order.deliveryDate,
      street: order.street,
      plot: order.plot,
      buildingNum: order.buildingNum,
      floor: order.floor,
      apartmentNum: order.apartmentNum,
      price: order.price,
      notes: order.notes,
      status: order.status,
      orderItems: [],
      orderDate: order.existingOrder?.orderDate || new Date().toISOString(),
      updateDate: isChange || !order.existingOrder? new Date().toISOString() : order.existingOrder.updateDate 
    };

    for (let i = 0; i < order.orderItems.length; i++) {
      if (order.orderItems[i].itemType === 1 ||order.orderItems[i].itemType === "1") {
        
        let id = await dispatch(createDoor(order.orderItems[i].doorDetails));
        newOrder.orderItems.push({ id: 0, orderId: order.existingOrder?.id || 0, itemType: "1", itemId: id.payload, quantity: order.orderItems[i].quantity ,status:order.orderItems[i].status || 'opening',orderItemDate:order.orderItems[i].orderItemDate || new Date().toISOString(),updateDate: new Date().toISOString()});
      }
        else if (order.orderItems[i].itemType === 2 || order.orderItems[i].itemType === "2") {
        
        let id = await dispatch(createFrame(order.orderItems[i].frameDetails));
        newOrder.orderItems.push({ id: 0, orderId: order.existingOrder?.id || 0, itemType: "2", itemId: id.payload, quantity: order.orderItems[i].quantity,status:order.orderItems[i].status || 'opening',orderItemDate:order.orderItems[i].orderItemDate || new Date().toISOString(),updateDate: new Date().toISOString() });
      }
    }
    console.log(newOrder, "before adding order");
    console.log("order.existingOrder",order.existingOrder);
      if(order.existingOrder==null)
      {await dispatch(createOrder(newOrder))}
    else {
      await dispatch(updateOrder(newOrder))}
  }
);

// יצירת הסלייס לניהול הזמנות
const ordersSlice = createSlice({
  name: "orders", // שם הסלייס
  initialState,   // מצב התחלתי
  reducers: {
   // כאן ניתן להוסיף רידוסרים נוספים אם יש צורך
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
      .addCase(deleteItemFromOrder.pending, (state) => {
        state.status = "loading"; // עדכון הסטטוס ל-"loading"
      })
      // כאשר הבקשה הושלמה בהצלחה
      .addCase(deleteItemFromOrder.fulfilled, (state, action) => {
        state.status = "succeeded"; // עדכון הסטטוס ל-"succeeded"
        state.orders = state.orders.filter(item => item.orderItems.filter(orderItem => orderItem.id !== action.payload.id));
      })
      // כאשר הבקשה נכשלה
      .addCase(deleteItemFromOrder.rejected, (state, action) => {
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
