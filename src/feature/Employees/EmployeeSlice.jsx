
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addEmployee, getEmployees, loginUser,deleteEmployeeById,putEmployee } from "../../Api/EmployeesApi";
import axios from "axios";
import { log } from "three/src/utils.js";

// יצירת פעולה אסינכרונית להוספת הזמנה
export const createEmployee = createAsyncThunk("Employees/addEmployee", addEmployee);
export const getAllEmployees = createAsyncThunk("Employees/getEmployees", getEmployees);
export const deleteEmployee = createAsyncThunk("Employees/deleteEmployee", deleteEmployeeById);
export const updateEmployee = createAsyncThunk("Employees/updateEmployee", putEmployee);

export const login = createAsyncThunk(
  "auth/login",
  
    // const data = await loginUser(credentials);
    // localStorage.setItem("token", data.token);
    // return data.user; // מחזיר פרטי המשתמש ל-Redux
    loginUser
  
);
// מצב התחלתי של הסטייט
const initialState = {
    employees: [],    // מערך הלקוחות
    status: "", // מצב ברירת מחדל (הפעולה לא בוצעה עדיין)
    error: null,   // שגיאות אפשריות
    user :null
};

// יצירת הסלייס לניהול הלקוחות
const EmployeesSlice = createSlice({
    name: "Employees", // שם הסלייס
    initialState,   // מצב התחלתי
    reducers: {
        getEmployeeById: (state, action) => {
            return state.employees?.find(c => c.id === action.payload)
        }
        // אפשר להוסיף reducers נוספים בעת הצורך (למשל, להוריד הזמנה או לעדכן סטטוס)
    },
    extraReducers: (builder) => {
        builder
            // כאשר הבקשה ב-process (המתנה לתשובה)
            .addCase(createEmployee.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.status = "succeeded"; // עדכון הסטטוס ל-"succeeded"
                state.employees.push(action.payload); // הוספת לקוח חדש למערך הלקוחות
            })
            // כאשר הבקשה נכשלה
            .addCase(createEmployee.rejected, (state, action) => {
                state.status = "failed"; // עדכון הסטטוס ל-"failed"
                state.error = action.error.message; // שמירת השגיאה במצב
            })
            .addCase(getAllEmployees.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(getAllEmployees.fulfilled, (state, action) => {
                state.status = "succeeded"; // עדכון הסטטוס ל-"succeeded"
                state.employees = action.payload
            })
            // כאשר הבקשה נכשלה
            .addCase(getAllEmployees.rejected, (state, action) => {
                state.status = "failed"; // עדכון הסטטוס ל-"failed"
                state.error = action.error.message; // שמירת השגיאה במצב
            })
            .addCase(deleteEmployee.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.employees = state.employees.filter(c => c.id !== action.payload.id);
            })
            // כאשר הבקשה נכשלה
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.status = "failed"; // עדכון הסטטוס ל-"failed"
                state.error = action.error.message; // שמירת השגיאה במצב
            })
            .addCase(updateEmployee.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.status = "succeeded";
                log("updateEmp",action.payload)
                state.employees = state.employees.map(c => c.id === action.payload.id ? action.payload : c);
            })
            // כאשר הבקשה נכשלה
            .addCase(updateEmployee.rejected, (state, action) => {
                state.status = "failed"; // עדכון הסטטוס ל-"failed"
                state.error = action.error.message; // שמירת השגיאה במצב
            })
            .addCase(login.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                log("login",action.payload.user)
                state.user = action.payload.user; // כאן אפשר לשמור את פרטי המשתמש ב-state אם רוצים
            })
            // כאשר הבקשה נכשלה
            .addCase(login.rejected, (state, action) => {
                state.status = "failed"; // עדכון הסטטוס ל-"failed"
                state.error = action.error.message; // שמירת השגיאה במצב
            })
    }

});
export const { getEmployeeById } = EmployeesSlice.actions
export default EmployeesSlice.reducer;
