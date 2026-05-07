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
      .then(res =>  res.data)
  );
};
export const getDoors = async () => {
  return fetchWithRetry(() =>
    axios.get("https://localhost:7253/api/Door/GetAll")
      .then(res => res.data)
  );
};
export const deleteDoorById = async (id) => {

  return fetchWithRetry(() =>
    axios.delete(`https://localhost:7253/api/Door/Delete?id=${id}`)
      .then(res => res.data)
  );

}
export const updateDoor = async (updatedDoor) => {
  return fetchWithRetry(() =>
    axios.put("https://localhost:7253/api/Door/Update", updatedDoor)
      .then(res => res.data)
  );
}
export const uploadDoorFile = async (doorId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetchWithRetry(() =>
    axios.post(`https://localhost:7253/api/Door/UploadDoorFile/${doorId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res => res.data)
  );
};