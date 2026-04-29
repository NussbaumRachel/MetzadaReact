
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCustomer, getCustomers, deleteCustomerById } from "../../Api/CustomersApi";
import axios from "axios";

// יצירת פעולה אסינכרונית להוספת הזמנה
export const createCustomer = createAsyncThunk("customers/addCustomer", addCustomer);
export const getAllCustomers = createAsyncThunk("customers/getCustomers", getCustomers);
export const deleteCustomer = createAsyncThunk("customers/deleteCustomer", deleteCustomerById);


// מצב התחלתי של הסטייט
const initialState = {
    customers: [],    // מערך הלקוחות
    status: "", // מצב ברירת מחדל (הפעולה לא בוצעה עדיין)
    error: null,   // שגיאות אפשריות
};

// יצירת הסלייס לניהול הלקוחות
const customersSlice = createSlice({
    name: "customers", // שם הסלייס
    initialState,   // מצב התחלתי
    reducers: {
        getCustomerById: (state, action) => {
            return state.customers?.find(c => c.id === action.payload)
        }
        // אפשר להוסיף reducers נוספים בעת הצורך (למשל, להוריד הזמנה או לעדכן סטטוס)
    },
    extraReducers: (builder) => {
        builder
            // כאשר הבקשה ב-process (המתנה לתשובה)
            .addCase(createCustomer.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.status = "succeeded"; // עדכון הסטטוס ל-"succeeded"
                state.customers.push(action.payload); // הוספת לקוח חדש למערך הלקוחות
            })
            // כאשר הבקשה נכשלה
            .addCase(createCustomer.rejected, (state, action) => {
                state.status = "failed"; // עדכון הסטטוס ל-"failed"
                state.error = action.error.message; // שמירת השגיאה במצב
            })
            .addCase(getAllCustomers.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.status = "succeeded"; // עדכון הסטטוס ל-"succeeded"
                state.customers = action.payload
            })
            // כאשר הבקשה נכשלה
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.status = "failed"; // עדכון הסטטוס ל-"failed"
                state.error = action.error.message; // שמירת השגיאה במצב
            })
            .addCase(deleteCustomer.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.customers = state.customers.filter(c => c.id !== action.payload.id);
            })
            // כאשר הבקשה נכשלה
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.status = "failed"; // עדכון הסטטוס ל-"failed"
                state.error = action.error.message; // שמירת השגיאה במצב
            })
    }

});
export const { getCustomerById } = customersSlice.actions
export default customersSlice.reducer;
