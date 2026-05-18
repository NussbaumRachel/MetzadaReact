// src/feature/Employees/Employee.jsx

import React, { useEffect, useState } from "react";

// קומפוננטת Employee שמדגימה טופס לניהול פרטי עובד
export default function Employee({ employee, onClose, onSave }) {
    // מצב מקומי לשמירת הערכים שהוזנו בטופס
    const [form, setForm] = useState(employee);

    // אפקט צדדי שמעדכן את טופס הערכים כאשר משתנה העובד
    useEffect(() => {
        setForm(employee);
    }, [employee]);

    // פונקציה לעדכון הערכים של הטופס
    const handleChange = (e) => {
        const { name, value } = e.target;

        // עדכון מצב הטופס
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // פונקציה לשליחת הטופס
    const submit = (e) => {
        e.preventDefault(); // ביטול ברירת מחדל של הטופס
        onSave(form); // שליחת הערכים ל-Higher Component
    };

    return (
        <div className="employee-modal-overlay">
            <div className="employee-modal">
                <div className="employee-modal-header">
                    <h2>
                        {form.id === 0
                            ? "הוספת עובד" // טקסט לכל סוג פעולה
                            : "עריכת עובד"}
                    </h2>

                    {/* כפתור לסגירת המודל */}
                    <button
                        className="employee-close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {/* טופס העובד */}
                <form onSubmit={submit} className="employee-form">
                    <div className="employee-grid">
                        {/* שדות קלט עבור פרטי העובד */}
                        <input
                            name="name"
                            placeholder="שם עובד"
                            value={form.name || ""}
                            onChange={handleChange}
                        />
                        <input
                            name="email"
                            placeholder="אימייל"
                            value={form.email || ""}
                            onChange={handleChange}
                        />
                        <input
                            name="password"
                            placeholder="סיסמה"
                            value={form.password || ""}
                            onChange={handleChange}
                        />
                        <input
                            name="status"
                            placeholder="סטטוס"
                            value={form.status || ""}
                            onChange={handleChange}
                        />
                        <input
                            name="phone1"
                            placeholder="טלפון 1"
                            value={form.phone1 || ""}
                            onChange={handleChange}
                        />
                        <input
                            name="phone2"
                            placeholder="טלפון 2"
                            value={form.phone2 || ""}
                            onChange={handleChange}
                        />
                        <input
                            name="address"
                            placeholder="כתובת"
                            value={form.address || ""}
                            onChange={handleChange}
                        />
                        <input
                            type="date"
                            name="birthDate"
                            value={form.birthDate ? form.birthDate.substring(0, 10) : ""}
                            onChange={handleChange}
                        />
                    </div>

                    {/* כפתורי פעולות */}
                    <div className="employee-form-actions">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={onClose}
                        >
                            ביטול
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            שמירה
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}