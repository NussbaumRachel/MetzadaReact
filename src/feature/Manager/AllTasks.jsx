// src/pages/admin/OpenOrderDoorsExport.jsx

import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";

export default function AllTasks() {
    const doorsFields = useSelector(state => state.doors.doorsFields) || [];
    const doors = useSelector(state => state.doors.doors) || [];
    const [tasks, setTasks] = useState(doors);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadTasks();

    }, []);

    async function loadTasks() {

        try {

            const response = await fetch("/api/orders/open-doors");

            const data = await response.json();

            setTasks(data);

        } catch (error) {

            console.error(error);
        }
    }

    function toggleTask(id) {

        setSelectedTasks(prev => {

            if (prev.includes(id)) {

                return prev.filter(x => x !== id);
            }

            return [...prev, id];
        });
    }

    function selectAll() {

        const ids = filteredTasks.map(x => x.id);

        setSelectedTasks(ids);
    }

    function exportToExcel() {

        const selected = tasks.filter(x =>
            selectedTasks.includes(x.id)
        );

        if (!selected.length) {

            alert("לא נבחרו דלתות");

            return;
        }



        const exportData = selected.map(item => (doorsFields.map(f => (
            { [f.hebrow]: item[f.field] }))
        ).reduce((acc, curr) => ({ ...acc, ...curr }), {}));

        console.log(exportData);

        const worksheet = XLSX.utils.json_to_sheet(exportData);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Doors"
        );

        XLSX.writeFile(
            workbook,
            "open-order-doors.xlsx"
        );
    }
///////////////////////////////////////////////////
    const filteredTasks = useMemo(() => {// חיפוש פשוט לפי צבע, סוג או מחיר

        return tasks.filter(item => {// אם אין חיפוש, נחזיר את כל המשימות
            if (!search) return true;

            const value = search.toLowerCase();// נמיר את החיפוש לאותיות קטנות להשוואה

            return (
                item.color.toLowerCase().includes(value) ||// נבדוק אם הצבע כולל את הטקסט
                item.type.toString().includes(value) ||// נבדוק אם הסוג כולל את הטקסט
                item.side.toLowerCase().includes(value)// נבדוק אם המחיר כולל את הטקסט
            );
        });

    }, [tasks, search]);
/////////////////////////////////////////////////
    return (

        <>
<style>{
`
.doors-page {
    padding: 38px;
    min-height: 100vh;
    background:
        radial-gradient(circle at top right, rgba(59,130,246,0.12), transparent 22%),
        radial-gradient(circle at bottom left, rgba(34,197,94,0.10), transparent 28%);
}

/* HEADER */

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    padding: 26px 30px;
    border-radius: 10px;
    background:
        linear-gradient(135deg,
            #132034 0%,
            #1d2d46 45%,
            #102017 100%);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow:
        0 18px 40px rgba(0,0,0,0.65);
    position: relative;
    overflow: hidden;
}

.page-header::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
        linear-gradient(120deg,
            transparent,
            rgba(255,255,255,0.03),
            transparent);
    animation: headerShine 7s linear infinite;
}

.page-header h1 {
    margin: 0;
    font-size: 30px;
    color: #ffffff;
    letter-spacing: 0.5px;
}

.page-header p {
    margin-top: 8px;
    color: #b8c8de;
    font-size: 14px;
}

.header-actions {
    display: flex;
    gap: 12px;
}

.select-btn,
.export-btn {
    border: none;
    padding: 13px 22px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.25s ease;
    border-radius: 8px;
    font-family: inherit;
}

.select-btn {
    background: #1e293b;
    color: #dbeafe;
    border: 1px solid rgba(255,255,255,0.08);
}

.select-btn:hover {
    background: #334155;
    transform: translateY(-2px);
}

.export-btn {
    background:
        linear-gradient(135deg,
            #22c55e,
            #16a34a);
    color: white;
    box-shadow:
        0 10px 24px rgba(34,197,94,0.25);
}

.export-btn:hover {
    transform: translateY(-2px);
    filter: brightness(1.06);
}

/* STATS */

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(220px,1fr));
    gap: 18px;
    margin-bottom: 24px;
}

.stat-card {
    position: relative;
    padding: 22px;
    border-radius: 10px;
    overflow: hidden;
    background:
        linear-gradient(145deg,
            #17273d,
            #111827);
    border-right: 5px solid #3b82f6;
    box-shadow:
        0 12px 30px rgba(0,0,0,0.5);
    transition: 0.25s ease;
}

.stat-card:nth-child(2) {
    border-right-color: #22c55e;
}

.stat-card:nth-child(3) {
    border-right-color: #f59e0b;
}

.stat-card:hover {
    transform: translateY(-4px);
}

.stat-card span {
    color: #9fb4d1;
    font-size: 13px;
}

.stat-card h2 {
    margin: 10px 0 0;
    font-size: 36px;
    color: white;
}

/* TABLE WRAPPER */

.table-wrapper {
    border-radius: 12px;
    overflow: hidden;
    background: #0f172a;
    border: 1px solid rgba(255,255,255,0.06);
    box-shadow:
        0 18px 50px rgba(0,0,0,0.7);
}

/* TOOLBAR */

.table-toolbar {
    padding: 18px;
    background:
        linear-gradient(90deg,
            #1e293b,
            #172033);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.table-toolbar input {
    width: 320px;
    max-width: 100%;
    border: 1px solid rgba(255,255,255,0.08);
    background: #0f172a;
    color: white;
    padding: 12px 14px;
    border-radius: 6px;
    outline: none;
    font-size: 14px;
    font-family: inherit;
    transition: 0.2s ease;
}

.table-toolbar input:focus {
    border-color: #3b82f6;
    box-shadow:
        0 0 0 4px rgba(59,130,246,0.14);
}

.table-toolbar input::placeholder {
    color: #7f96b3;
}

/* TABLE */

table {
    width: 100%;
    border-collapse: collapse;
    background: #0b1220;
}

/* HEADER */

thead {
    background:
        linear-gradient(90deg,
            #1e3a5f,
            #1d4d3f);
}

thead th {
    padding: 16px 14px;
    color: #eff6ff;
    font-size: 13px;
    font-weight: 700;
    border-left: 1px solid rgba(255,255,255,0.05);
    position: sticky;
    top: 0;
    z-index: 2;
}

/* BODY */

tbody tr {
    transition: 0.18s ease;
}

tbody tr:nth-child(even) {
    background: rgba(255,255,255,0.015);
}

tbody tr:hover {
    background: rgba(59,130,246,0.08);
}

tbody td {
    padding: 14px;
    color: #d9e6f7;
    font-size: 13px;
    border-top: 1px solid rgba(255,255,255,0.04);
    border-left: 1px solid rgba(255,255,255,0.03);
    white-space: nowrap;
}

/* EXCEL FEEL */

tbody td:hover {
    background: rgba(34,197,94,0.08);
    box-shadow:
        inset 0 0 0 1px rgba(34,197,94,0.35);
}

/* CHECKBOX */

.checkbox {
    width: 18px;
    height: 18px;
    accent-color: #22c55e;
    cursor: pointer;
}

/* STATUS */

.status-badge {
    padding: 6px 12px;
    border-radius: 5px;
    background:
        linear-gradient(135deg,
            rgba(34,197,94,0.18),
            rgba(34,197,94,0.08));
    color: #86efac;
    border: 1px solid rgba(34,197,94,0.18);
    font-size: 12px;
    font-weight: 700;
}

/* GRID LINES */

table td,
table th {
    position: relative;
}

table td::after,
table th::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background: rgba(255,255,255,0.03);
}

/* ANIMATION */

@keyframes headerShine {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

/* MOBILE */

@media (max-width: 900px) {

    .doors-page {
        padding: 18px;
    }

    .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 18px;
    }

    .table-wrapper {
        overflow-x: auto;
    }

    table {
        min-width: 1100px;
    }
}

`}</style>
            <div className="doors-page">

                <div className="page-header">

                    <div>
                        <h1>
                            דלתות ומשקופים להזמנות פתוחות
                        </h1>

                        <p>
                            בחירת דלתות וייצוא מלא לאקסל
                        </p>
                    </div>

                    <div className="header-actions">

                        <button
                            className="select-btn"
                            onClick={selectAll}
                        >
                            בחר הכל
                        </button>

                        <button
                            className="export-btn"
                            onClick={exportToExcel}
                        >
                            ייצוא לאקסל
                        </button>

                    </div>

                </div>

                <div className="stats-grid">

                    <div className="stat-card">
                        <span>סה״כ משימות</span>
                        <h2>{tasks.length}</h2>
                    </div>

                    <div className="stat-card">
                        <span>נבחרו לייצוא</span>
                        <h2>{selectedTasks.length}</h2>
                    </div>

                    <div className="stat-card">
                        <span>הזמנות פתוחות</span>
                        <h2>12</h2>
                    </div>

                </div>

                <div className="table-wrapper">

                    <div className="table-toolbar">

                        <input
                            type="text"
                            placeholder="חיפוש לפי לקוח / דלת / הזמנה"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                    <table>

                        <thead>
                            <tr>
                            <th></th>{doorsFields.map(field => (
                                <th key={field.id}>{field.hebrow}</th>
                            ))}
                                <th>סטטוס</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredTasks.map(item => (

                                <tr key={item.id}>

                                    <td>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={selectedTasks.includes(item.id)}
                                            onChange={() => toggleTask(item.id)}
                                        /> </td>
                                        {doorsFields.map(field => (
                                            <td key={field.id}>{item[field.field]}</td>
                                        ))}

                                    <td>
                                        <span className="status-badge">
                                            פתוחה
                                        </span>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>
        </>
    );
}


