import axios from 'axios'
import { authHeaders } from './EmployeesApi';
const fetchWithRetry = async (fn, retries = 3, delay = 500) => {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;
    await new Promise(res => setTimeout(res, delay));
    return fetchWithRetry(fn, retries - 1, delay * 2);
  }
};
export const addCustomer = async (newCustomer) => {
    // try {
      // שליחת בקשה ל-API להוסיף הזמנה חדשה
    return fetchWithRetry(() =>
      axios.post("https://localhost:7253/api/Customer/Add", newCustomer, {
        headers: authHeaders
      })      // מחזירים את התגובה מהשרת
        .then(res => res.data))

    // } catch (error) {
      // טיפול בשגיאות והחזרת שגיאה מתאימה אם קרתה בעיה
    //   throw new Error(error.response ? error.response.data : "Error adding order");
    // }
  }
  export const getCustomers = async () => {
    // try {
      // שליחת בקשה ל-API להוסיף הזמנה חדשה
      return fetchWithRetry(() =>
      axios.get("https://localhost:7253/api/Customer/GetAll")
      // מחזירים את התגובה מהשרת
      .then(res => res.data))
    // } catch (error) {
      // טיפול בשגיאות והחזרת שגיאה מתאימה אם קרתה בעיה
    //   throw new Error(error.response ? error.response.data : "Error adding order");
    // }
  }
  export const deleteCustomerById = async (id) => {

      return fetchWithRetry(() =>
        axios.delete(`https://localhost:7253/api/Customer/Delete?id=${id}`)
          .then(res => res.data)
  );
}
export const putCustomer = async (customer) => {

    return fetchWithRetry(() =>
      axios.put(`https://localhost:7253/api/Customer/Update`, customer)
        .then(res => res.data)
    );
}