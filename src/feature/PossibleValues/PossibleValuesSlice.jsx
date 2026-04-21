import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addOrder, checkValueLimitations, getOrders, getLimits, DeleteLimit, addCheck } from "../../Api/PossibleValuesApi";
import { createFrame } from "../Frames/FramesSlice";
import axios from "axios";
import { createDoor } from "../Doors/DoorsSlice"
import { useDispatch } from "react-redux";
// יצירת פעולה אסינכרונית להוספת הזמנה
export const checkValueLimits = createAsyncThunk("possibleValues/checkValueLimitations", checkValueLimitations)
export const checkAllLimits = createAsyncThunk("possibleValues/checkAllLimits", getLimits)
export const DeleteOneLimit = createAsyncThunk("possibleValues/DeleteOneLimit", DeleteLimit)
export const CreateLimit = createAsyncThunk("possibleValues/CreateLimit", addCheck)

const initialState = {
  fields: ["Desc", "side", "width", "height", "hinges", "perforation", "type", "leaf", "color", "FramesHeightWithShutter",
    "wallFrameThickness", "profile", "opening", "finishing", "perforationTypeForShoeing", "skylight",
    "shoeingA", "shoeingB", "shoeingC", "internalLayoutWidth", "internalLayoutLength", "externalLayoutWidth", "externalLayoutLength", "notes"], // כל השדות שצריך לבדוק

  possibleValues: [],    // מערך ההזמנות
  status: "", // מצב ברירת מחדל (הפעולה לא בוצעה עדיין)
  error: null,   // שגיאות אפשריות
};

const PossibleValuesSlice = createSlice({
  name: "PossibleValues", // שם הסלייס
  initialState,   // מצב התחלתי
  reducers: {

  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(checkValueLimits.pending, (state) => {
  //         state.status = "loading"; // עדכון הסטטוס ל-"loading"
  //       })
  //       // כאשר הבקשה הושלמה בהצלחה
  //       .addCase(checkValueLimits.fulfilled, (state, action) => {
  //         state.status = "succeeded"; 
  //         state.possibleValues = action.payload
  //         // עדכון הסטטוס ל-"succeeded"
  //       })
  //       // כאשר הבקשה נכשלה
  //       .addCase(checkValueLimits.rejected, (state, action) => {
  //         state.status = "failed"; // עדכון הסטטוס ל-"failed"
  //         state.error = action.error.message; // שמירת השגיאה במצב
  //       })
  //   }
  extraReducers: (builder) => {
    builder
      // fetchLimits
      // .addCase(fetchLimits.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchLimits.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.possibleValues = action.payload;
      // })
      // .addCase(fetchLimits.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })

      // checkValueLimits (אם עדיין צריך)
      .addCase(checkValueLimits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkValueLimits.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(checkValueLimits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(checkAllLimits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAllLimits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.possibleValues = action.payload;
      })
      .addCase(checkAllLimits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(DeleteOneLimit.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteOneLimit.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(DeleteOneLimit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(CreateLimit.pending, (state) => {
        state.status = "loading"; // עדכון הסטטוס ל-"loading"
      })
      // כאשר הבקשה הושלמה בהצלחה
      .addCase(CreateLimit.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.doors.push(action.payload); // עדכון הסטטוס ל-"succeeded"
        // הוספת הזמנה חדשה למערך ההזמנות
      })
      // כאשר הבקשה נכשלה
      .addCase(CreateLimit.rejected, (state, action) => {
        state.status = "failed"; // עדכון הסטטוס ל-"failed"
        state.error = action.error.message; // שמירת השגיאה במצב
      })
  }
});
export default PossibleValuesSlice.reducer;

// ### הסבר על הקוד:

// 1. **`addOrder`** – פעולה אסינכרונית שנועדה לשלוח את פרטי ההזמנה לשרת ולחזור עם התגובה.
// 2. **`initialState`** – מצב התחלתי שמכיל מערך של הזמנות, סטטוס פעולה ושגיאות.
// 3. **`extraReducers`** – חלק מהקוד שמנהל את מצב הסטטוס (ממתין, הושלם, נכשל) על פי תוצאות הקריאה ל-API.
// 4. **`createSlice`** – הפונקציה שיוצרת את הסלייס עם הסטטוס והפונקציות המתאימות לניהול הזמנות.

// אם תרצה להוסיף או לשנות משהו בקוד, אני כאן לעזור!
