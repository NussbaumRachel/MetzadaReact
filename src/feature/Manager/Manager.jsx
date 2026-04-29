import React from 'react';
import './Manager.css';

const Manager = () => {
    const addEmployee = () => {
        console.log('הוספת עובד');
    };

    const viewEmployees = () => {
        console.log('צפייה בעובדים');
    };
    const managePermissions = () => {
        console.log('ניהול הרשאות גישה');
    };

    return (
        <div className="orders-page">
            <div className="orders-header">
                <div className="orders-title-block">
                    <h1 className="orders-title">ניהול עובדים</h1>
                    <p className="orders-subtitle">עבודה עם עובדים והרשאות</p>
                </div>
                <div className="orders-actions">
                    <button className="btn-primary" onClick={addEmployee}>הוסף עובד</button>
                    <button className="btn-secondary" onClick={viewEmployees}>צפה בעובדים</button>
                    <button className="btn-secondary" onClick={managePermissions}>נהל הרשאות</button>
                </div>
            </div>
            {/* פה ייכנס התוכן של העובדים */}
            <div className="orders-table-wrapper">
                {/* טבלה או רשימה של עובדים */}
                <p>שם תוכן העובדים ייכנס כאן</p>
            </div>
        </div>
    );
};

export default Manager;