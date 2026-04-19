import axios from 'axios'
const fetchWithRetry = async (fn, retries = 3, delay = 500) => {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;
    await new Promise(res => setTimeout(res, delay));
    return fetchWithRetry(fn, retries - 1, delay * 2);
  }
};
export const addDoor = async (newDoor) => {
    // try {
      // שליחת בקשה ל-API להוסיף הזמנה חדשה
       return fetchWithRetry(() =>
         axios.post("https://localhost:7253/api/Door/Add", newDoor)    
         .then(res => res.data)
  );
     
      
      // מחזירים את התגובה מהשרת
    // } catch (error) {
      // טיפול בשגיאות והחזרת שגיאה מתאימה אם קרתה בעיה
    //   throw new Error(error.response ? error.response.data : "Error adding order");
    // }
  }
//   export const getDoors = async () => {
//     // try {
//       // שליחת בקשה ל-API להוסיף הזמנה חדשה
      
//       const response = await axios.get("https://localhost:7253/api/Door/GetAll");
//       debugger
//       // מחזירים את התגובה מהשרת
//       return response.data;
//     // } catch (error) {
//       // טיפול בשגיאות והחזרת שגיאה מתאימה אם קרתה בעיה
//     //   throw new Error(error.response ? error.response.data : "Error adding order");
//     // }
//   }
export const getDoors = async () => {
  return fetchWithRetry(() =>
    axios.get("https://localhost:7253/api/Door/GetAll")
      .then(res => res.data)
  );
};