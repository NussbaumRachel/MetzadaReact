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
const getToken = () => localStorage.getItem("token");
export const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  }
});
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      "https://localhost:7253/api/Auth/login",
      credentials
    );
        localStorage.setItem("token", response.data.token);
    // response.data יכיל: { token, user }
    return response.data;
  } catch (err) {
    // טיפול בשגיאה
    throw new Error(
      err.response ? err.response.data : "Error logging in"
    );
  }
};
export const addEmployee = async (newEmployee) => {
    // try {
      // שליחת בקשה ל-API להוסיף הזמנה חדשה
      return fetchWithRetry(() =>
 axios.post("https://localhost:7253/api/Employees/Add", newEmployee)      // מחזירים את התגובה מהשרת
      .then(res => res.data))

    // } catch (error) {
      // טיפול בשגיאות והחזרת שגיאה מתאימה אם קרתה בעיה
    //   throw new Error(error.response ? error.response.data : "Error adding order");
    // }
  }
  export const getEmployees = async () => {
    // try {
      // שליחת בקשה ל-API להוסיף הזמנה חדשה
        return fetchWithRetry(() =>
        axios.get("https://localhost:7253/api/Employees/GetAll")
      // מחזירים את התגובה מהשרת
      .then(res => res.data))
    // } catch (error) {
      // טיפול בשגיאות והחזרת שגיאה מתאימה אם קרתה בעיה
    //   throw new Error(error.response ? error.response.data : "Error adding order");
    // }
  }
  export const deleteEmployeeById = async (id) => {

        return fetchWithRetry(() =>
          axios.delete(`https://localhost:7253/api/Employees/Delete?id=${id}`)
            .then(res => res.data)
    );
    }
    export const putEmployee = async (Employee) => {

    return fetchWithRetry(() =>
      axios.put(`https://localhost:7253/api/Employees/Update`, Employee)
        .then(res => Employee)
    );
}