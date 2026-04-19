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
export const addOrder = async (newOrder) => {
  
    // try {
      // שליחת בקשה ל-API להוסיף הזמנה חדשה
      return fetchWithRetry(() =>
      axios.post("https://localhost:7253/api/Order/Add", newOrder)
      // מחזירים את התגובה מהשרת
      .then(res => res.data))     
    // } catch (error) {
      // טיפול בשגיאות והחזרת שגיאה מתאימה אם קרתה בעיה
    //   throw new Error(error.response ? error.response.data : "Error adding order");
    // }
  }

  export const updateOrder = async (updatedOrder) => {
  
    // try {
       return fetchWithRetry(() =>
       axios.put("https://localhost:7253/api/Order/Update",updatedOrder)
      // מחזירים את התגובה מהשרת
      .then(res => res.data))     
      // מחזירים את התגובה מהשרת
    // } catch (error) {
      // טיפול בשגיאות והחזרת שגיאה מתאימה אם קרתה בעיה
    //   throw new Error(error.response ? error.response.data : "Error adding order");
    // }
  }
  export const getOrders = async () => {
    // try {
      // שליחת בקשה ל-API להוסיף הזמנה חדשה
       return fetchWithRetry(() =>
      axios.get("https://localhost:7253/api/Order/GetAll")
      // מחזירים את התגובה מהשרת
      .then(res => res.data))   
     
      // מחזירים את התגובה מהשרת
    // } catch (error) {
      // טיפול בשגיאות והחזרת שגיאה מתאימה אם קרתה בעיה
    //   throw new Error(error.response ? error.response.data : "Error adding order");
    // }
  }