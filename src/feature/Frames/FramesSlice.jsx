
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addFrame, getFrames, deleteFrameById,updateFrame } from "../../Api/FramesApi";
import axios from "axios";

// יצירת פעולה אסינכרונית להוספת הזמנה
export const createFrame = createAsyncThunk("frames/addFrame", addFrame);
export const getAllFrames = createAsyncThunk("frames/getFrames", getFrames);
export const deleteFrame = createAsyncThunk("frames/deleteFrame", deleteFrameById);
export const updateTheFrame = createAsyncThunk("frames/updateFrame", updateFrame);


// מצב התחלתי של הסטייט
const initialState = {
    frames: [],    // מערך ההזמנות
    status: "", // מצב ברירת מחדל (הפעולה לא בוצעה עדיין)
    error: null,   // שגיאות אפשריות
    framesFields: [{ field: "side", hebrow: "צד", type: "text" },
    { field: "desc", hebrow: "תיאור", type: "text" },
    { field: "width", hebrow: "רוחב", type: "number" },
    { field: "height", hebrow: "גובה", type: "number" },
    { field: "hinges", hebrow: "מספר צירים", type: "number" },
    { field: "wallFrameThickness", hebrow: "עובי משקוף לקיר", type: "number" },
    { field: "perforationTypeForShoeing", hebrow: "סוג ניקוב לפירזול", type: "text" },
    { field: "opening", hebrow: "פתיחה", type: "text" },
    { field: "framesHeightWithShutter", hebrow: "גובה משקוף עם תריס", type: "number" },
    { field: "profile", hebrow: "פרופיל", type: "text" },
    { field: "perforation", hebrow: "ניקוב", type: "text" },
    { field: "color", hebrow: "צבע", type: "text" }]
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
            .addCase(deleteFrame.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(deleteFrame.fulfilled, (state, action) => {
                state.status = "succeeded";
                // state.doors = state.frames.filter(d => d.id !== action.payload.id);
            })
            // כאשר הבקשה נכשלה
            .addCase(deleteFrame.rejected, (state, action) => {
                state.status = "failed"; // עדכון הסטטוס ל-"failed"
                state.error = action.error.message; // שמירת השגיאה במצב
            })
            .addCase(updateTheFrame.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(updateTheFrame.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.frames = state.frames.map(f => f.id === action.payload.id ? action.payload : f);
            })
            // כאשר הבקשה נכשלה
            .addCase(updateTheFrame.rejected, (state, action) => {
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
