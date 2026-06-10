import React, { useEffect, useMemo, useState } from "react";
import Employee from "./Employee.jsx";
import "./employees.css";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, deleteEmployee, getAllEmployees, updateEmployee } from "./EmployeeSlice.jsx";
import { deleteEmployeeById } from "../../Api/EmployeesApi.jsx";

const emptyEmployee = {
    id: 0,
    name: "",
    password: "",
    email: "",
    status: "",
    address: "",
    phone1: "",
    phone2: "",
    birthDate: "",
};

export default function AllEmployees() {
    const employees = useSelector(state => state.employees.employees) || []
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dis = useDispatch()
    // useEffect(() => {
    //     loadEmployees();
    // }, []);

    // const loadEmployees = async () => {
    //     try {
    //         const response = await fetch("/api/employees");
    //         const data = await response.json();
    //         setEmployees(data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const filteredEmployees = useMemo(() => {
        return employees.filter((e) =>
            `${e.name} ${e.email} ${e.phone1}`.toLowerCase().includes(search.toLowerCase())
        );
    }, [employees, search]);

    const handleAdd = () => {
        setSelectedEmployee(emptyEmployee);
        setIsOpen(true);
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setIsOpen(true);
    };

    const handleDelete =  (id) => {
        if (!window.confirm("למחוק עובד?")) return;

      dis(deleteEmployee(id))
    };
    const handleSave = async (employee) => {
     const newEmployee = {
       ...employee,
       id: employee.id ? employee.id : (Date.now() % 1000000000).toString(), // יצירת ID ייחודי אם אין ID קיים, מבצע מודולו כדי לקבל מספר באורך 9 תווים
     };
     !employee.id ? await dis(createEmployee(newEmployee)) : await dis(updateEmployee(newEmployee));
    setIsOpen(false);
    await dis(getAllEmployees());
      // onSave(false);
    };

    return (
        <div className="employees-page">
            <div className="employees-header">
                <div>
                    <h1 className="employees-title">ניהול עובדים</h1>
                    <p className="employees-subtitle">ניהול מלא של עובדי המפעל</p>
                </div>
                <button className="btn-primary" onClick={handleAdd}>
                    + עובד חדש
                </button>
            </div>

            <div className="employees-top-bar">
                <input
                    type="text"
                    placeholder="חיפוש עובדים..."
                    className="employees-search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="employees-stats">
                <div className="employee-stat-card glow1">
                    <span>סה״כ עובדים</span>
                    <h2>{employees.length}</h2>
                </div>

                <div className="employee-stat-card glow2">
                    <span>פעילים</span>
                    <h2>
                        {/* {employees.filter((x) => x.status === "פעיל").length} */}
                       {employees.length - 4}
                    </h2>
                </div>

                <div className="employee-stat-card glow3">
                    <span>לא פעילים</span>
                    <h2>
                        {/* {employees.filter((x) => x.status !== "פעיל").length} */}
                        4
                    </h2>
                </div>
            </div>

            <div className="employees-table-wrapper">
                <table className="employees-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>שם</th>
                            <th>אימייל</th>
                            <th>טלפון</th>
                            <th>כתובת</th>
                            <th>סטטוס</th>
                            <th>פעולות</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone1}</td>
                                <td>{employee.address}</td>

                                <td>
                                    <span
                                        className={`employee-status ${
                                            employee.status === "פעיל"
                                                ? "active"
                                                : "inactive"
                                        }`}
                                    >
                                        {employee.status}
                                    </span>
                                </td>

                                <td>
                                    <div className="employee-actions">
                                        <button
                                            className="action-btn"
                                            onClick={() => handleEdit(employee)}
                                        >
                                            עריכה
                                        </button>

                                        <button
                                            className="action-btn delete-btn"
                                            onClick={() => handleDelete(employee.id)}
                                        >
                                            מחיקה
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isOpen && (
                <Employee
                    employee={selectedEmployee}
                    onClose={() => setIsOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}