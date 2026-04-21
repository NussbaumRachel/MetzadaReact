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
export const checkValueLimitations = async (key) => {
    // try {
      const response = await axios.get("https://localhost:7253/api/Check/GetChecks?k=" + key);
     
      
      if (response.data) {
        
        // order.possibleValues.push({name:key,limits:response.data})
        return response.data; // מחזירים את הערכים המוגבלים
      }
    // } catch (error) {
    //   console.error("Error fetching limitations:", error);
    // }
    return [];
  };
export const getLimits = async () => {
    // try {
      // שליחת בקשה ל-API להוסיף הזמנה חדשה
       return fetchWithRetry(() =>
      axios.get("https://localhost:7253/api/Check/GetAll")
      // מחזירים את התגובה מהשרת
      .then(res => res.data))   
     
      // מחזירים את התגובה מהשרת
    // } catch (error) {
      // טיפול בשגיאות והחזרת שגיאה מתאימה אם קרתה בעיה
    //   throw new Error(error.response ? error.response.data : "Error adding order");
    // }
  }

  export const DeleteLimit = async (id) => {
    console.log("check",id);
    
    // try {
     return fetchWithRetry(() =>
      axios.delete("https://localhost:7253/api/Check/deleteById?id="+id)
     .then(res => id))   
      
  };
  export const addCheck = async (newCheck) => {
    // try {
      // שליחת בקשה ל-API להוסיף הזמנה חדשה
       return fetchWithRetry(() =>
         axios.post("https://localhost:7253/api/Check/Add", newCheck)    
         .then(res => res.data)
  );}