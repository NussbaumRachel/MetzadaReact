import { useState, useContext, useEffect } from "react"

import * as XLSX from "xlsx";

const DataTable = () => {
  // דוגמת נתונים בטבלה
  const [data, setData] = useState([
    { id: 1, name: "John", age: 30, city: "New York" },
    { id: 2, name: "Jane", age: 25, city: "London" },
    { id: 3, name: "Sam", age: 28, city: "Berlin" },
  ]);

  // פונקציה להורדת קובץ Excel
  const exportToExcel = () => {
    // יצירת WorkBook
    const ws = XLSX.utils.json_to_sheet(data); // המרת נתונים מהמערך ל-sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data"); // הוספת ה-sheet ל-workbook

    // יצירת קובץ Excel להורדה
    XLSX.writeFile(wb, "data.xlsx");
  };

  return (
    <div>
      <h2>טבלת נתונים</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>שם</th>
            <th>גיל</th>
            <th>עיר</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.city}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* כפתור לייצוא ל־Excel */}
      <button onClick={exportToExcel}>ייצא ל-Excel</button>
    </div>
  );
};

export default DataTable;