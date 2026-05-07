
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoor, deleteDoorById, getDoors, updateDoor } from "../../Api/DoorsApi";
import axios from "axios";
import { uploadDoorFile } from "../../Api/DoorsApi";
// יצירת פעולה אסינכרונית להוספת הזמנה
export const createDoor = createAsyncThunk("doors/addDoor", addDoor);
export const getAllDoors = createAsyncThunk("doors/getDoors", getDoors);
export const deleteDoor = createAsyncThunk("doors/deleteDoor", deleteDoorById);
export const updateTheDoor = createAsyncThunk("doors/updateDoor", updateDoor);

export const createDoorWithFile = createAsyncThunk(
  "doors/createDoorWithFile",
  async ({ doorDetails, file }, thunkAPI) => {
    try {
      const newDoorId = await addDoor(doorDetails); // יצירת דלת
      if (file) {
        await uploadDoorFile(newDoorId, file); // העלאת קובץ
      }
      return { ...doorDetails, id: newDoorId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const uploadDoorMachineFile = createAsyncThunk(
  "doors/uploadDoorFile",
     uploadDoorFile
);
// מצב התחלתי של הסטייט
const initialState = {
    doors: [],    // מערך ההזמנות
    status: "", // מצב ברירת מחדל (הפעולה לא בוצעה עדיין)
    error: null,   // שגיאות אפשריות
    doorsFields: [{ field: "side", hebrow: "צד", type: "text" },
    { field: "width", hebrow: "רוחב", type: "number" },
    { field: "height", hebrow: "גובה", type: "number" },
    { field: "hinges", hebrow: "מספר צירים", type: "number" },
    { field: "perforationTypeForShoeing", hebrow: "סוג ניקוב לפירזול", type: "text" },
    { field: "skylight", hebrow: "צוהר", type: "text" },
    { field: "perforation", hebrow: "ניקוב", type: "text" },
    { field: "shoeingA", hebrow: "פירזול A", type: "text" },
    { field: "shoeingB", hebrow: "פירזול B", type: "text" },
    { field: "shoeingC", hebrow: "פירזול C", type: "text" },
    { field: "finishing", hebrow: "גימור", type: "text" }
        , { field: "type", hebrow: "סוג דלת", type: "text" },
    { field: "opening", hebrow: "פתיחה", type: "text" },
    { field: "color", hebrow: "צבע", type: "text" },
    { field: "leaf", hebrow: "עלים", type: "text" },
    { field: "internalLayoutWidth", hebrow: "רוחב פרופיל פנימי", type: "number" },
    { field: "internalLayoutLength", hebrow: "גובה פרופיל פנימי", type: "number" },
    { field: "externalLayoutWidth", hebrow: "רוחב פרופיל חיצוני", type: "number" },
    { field: "externalLayoutLength", hebrow: "גובה פרופיל חיצוני", type: "number" },
    ]
}




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
            .addCase(updateTheDoor.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            })
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(updateTheDoor.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.doors = state.doors.map(d => d.id === action.payload.id ? action.payload : d);
            })
            // כאשר הבקשה נכשלה
            .addCase(updateTheDoor.rejected, (state, action) => {
                state.status = "failed"; // עדכון הסטטוס ל-"failed"
                state.error = action.error.message; // שמירת השגיאה במצב
            })
                .addCase(uploadDoorMachineFile.pending, (state) => {
                state.status = "loading"; // עדכון הסטטוס ל-"loading"
            }
            )
            // כאשר הבקשה הושלמה בהצלחה
            .addCase(uploadDoorMachineFile.fulfilled, (state, action) => {
                state.status = "succeeded";
                const { doorId, fileUrl } = action.payload;
                state.doors = state.doors.map(d => d.id === doorId ? { ...d, machineFileUrl: fileUrl } : d);
            }
            )
            // כאשר הבקשה נכשלה
            .addCase(uploadDoorMachineFile.rejected, (state, action) => {
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
