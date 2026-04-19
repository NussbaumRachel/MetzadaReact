
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addFrame, getFrames } from "../../Api/FramesApi";
import axios from "axios";

// יצירת פעולה אסינכרונית להוספת הזמנה
export const createFrame = createAsyncThunk("frames/addFrame", addFrame);
export const getAllFrames = createAsyncThunk("frames/getFrames", getFrames);


// מצב התחלתי של הסטייט
const initialState = {
    frames: [],    // מערך ההזמנות
    status: "", // מצב ברירת מחדל (הפעולה לא בוצעה עדיין)
    error: null,   // שגיאות אפשריות
};

// יצירת הסלייס לניהול הזמנות
const framesSlice = createSlice({
    name: "frames", // שם הסלייס
    initialState,   // מצב התחלתי
    reducers: {
        getFrameById: (state, action) => {
            return state.frames?.find(f => f.id === action.payload)
        }
        // אפשר להוסיף reducers נוספים בעת הצורך (למשל, להוריד הזמנה או לעדכן סטטוס)
    },
    extraReducers: (builder) => {
        builder
            // כאשר הבקשה ב-process (המתנה לתשובה)
            .addCase(createFrame.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(createFrame.fulfilled, (state, action) => {
                state.status = "succeeded"; // עדכון הסטטוס ל-"succeeded"
                state.frames.push(action.payload); // הוספת הזמנה חדשה למערך ההזמנות
            })
            // כאשר הבקשה נכשלה
            .addCase(createFrame.rejected, (state, action) => {
                state.status = "failed"; // עדכון הסטטוס ל-"failed"
                state.error = action.error.message; // שמירת השגיאה במצב
            })
            .addCase(getAllFrames.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(getAllFrames.fulfilled, (state, action) => {
                state.status = "succeeded"; // עדכון הסטטוס ל-"succeeded"
                state.frames = action.payload
            })
            // כאשר הבקשה נכשלה
            .addCase(getAllFrames.rejected, (state, action) => {
                state.status = "failed"; // עדכון הסטטוס ל-"failed"
                state.error = action.error.message; // שמירת השגיאה במצב
            })
    }

});
export const { getFrameById } = framesSlice.actions
export default framesSlice.reducer;

// ### הסבר על הקוד:

// 1. **`addOrder`** – פעולה אסינכרונית שנועדה לשלוח את פרטי ההזמנה לשרת ולחזור עם התגובה.
// 2. **`initialState`** – מצב התחלתי שמכיל מערך של הזמנות, סטטוס פעולה ושגיאות.
// 3. **`extraReducers`** – חלק מהקוד שמנהל את מצב הסטטוס (ממתין, הושלם, נכשל) על פי תוצאות הקריאה ל-API.
// 4. **`createSlice`** – הפונקציה שיוצרת את הסלייס עם הסטטוס והפונקציות המתאימות לניהול הזמנות.

// אם תרצה להוסיף או לשנות משהו בקוד, אני כאן לעזור!
