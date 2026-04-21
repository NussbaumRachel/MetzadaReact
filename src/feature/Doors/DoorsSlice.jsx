
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoor, deleteDoorById, getDoors, } from "../../Api/DoorsApi";
import axios from "axios";

// יצירת פעולה אסינכרונית להוספת הזמנה
export const createDoor = createAsyncThunk("doors/addDoor", addDoor);
export const getAllDoors = createAsyncThunk("doors/getDoors", getDoors);
export const deleteDoor = createAsyncThunk("doors/deleteDoor", deleteDoorById);


// מצב התחלתי של הסטייט
const initialState = {
    doors: [],    // מערך ההזמנות
    status: "", // מצב ברירת מחדל (הפעולה לא בוצעה עדיין)
    error: null,   // שגיאות אפשריות
};

// יצירת הסלייס לניהול הזמנות
const doorsSlice = createSlice({
    name: "doors", // שם הסלייס
    initialState,   // מצב התחלתי
    reducers: {
       getDoorById: (state, action) => {
            return state.doors.find(d => d.id === action.payload);
        }

        // אפשר להוסיף reducers נוספים בעת הצורך (למשל, להוריד הזמנה או לעדכן סטטוס)
    },
    extraReducers: (builder) => {
        builder
            // כאשר הבקשה ב-process (המתנה לתשובה)
            .addCase(createDoor.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(createDoor.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.doors.push(action.payload); // עדכון הסטטוס ל-"succeeded"
                // הוספת הזמנה חדשה למערך ההזמנות
            })
            // כאשר הבקשה נכשלה
            .addCase(createDoor.rejected, (state, action) => {
                state.status = "failed"; // עדכון הסטטוס ל-"failed"
                state.error = action.error.message; // שמירת השגיאה במצב
            })
            .addCase(getAllDoors.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(getAllDoors.fulfilled, (state, action) => {
                state.status = "succeeded"; // עדכון הסטטוס ל-"succeeded"
                state.doors = action.payload
            })
            // כאשר הבקשה נכשלה
            .addCase(getAllDoors.rejected, (state, action) => {
                state.status = "failed"; // עדכון הסטטוס ל-"failed"
                state.error = action.error.message; // שמירת השגיאה במצב
            })
            .addCase(deleteDoor.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(deleteDoor.fulfilled, (state, action) => {
                state.status = "succeeded";
                // state.doors = state.doors.filter(d => d.id !== action.payload.id);
            })
            // כאשר הבקשה נכשלה
            .addCase(deleteDoor.rejected, (state, action) => {
                state.status = "failed"; // עדכון הסטטוס ל-"failed"
                state.error = action.error.message; // שמירת השגיאה במצב
            })
    }

});
export const { getDoorById } = doorsSlice.actions
export default doorsSlice.reducer;

// ### הסבר על הקוד:

// 1. **`addOrder`** – פעולה אסינכרונית שנועדה לשלוח את פרטי ההזמנה לשרת ולחזור עם התגובה.
// 2. **`initialState`** – מצב התחלתי שמכיל מערך של הזמנות, סטטוס פעולה ושגיאות.
// 3. **`extraReducers`** – חלק מהקוד שמנהל את מצב הסטטוס (ממתין, הושלם, נכשל) על פי תוצאות הקריאה ל-API.
// 4. **`createSlice`** – הפונקציה שיוצרת את הסלייס עם הסטטוס והפונקציות המתאימות לניהול הזמנות.

// אם תרצה להוסיף או לשנות משהו בקוד, אני כאן לעזור!
