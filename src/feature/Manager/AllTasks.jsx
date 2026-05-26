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
<style>{`

/* ===== Fonts & Body ===== */

body{
    margin:0;
    font-family:Arial;
    background:
        radial-gradient(circle at top right,#6b1f2f22 0%,transparent 25%),
        radial-gradient(circle at bottom left,#556b2f22 0%,transparent 30%),
        linear-gradient(135deg,#0f0f14,#171717,#101010);
    color:white;
    overflow-x:hidden;
}

/* ===== Animated Background ===== */

body::before{
    content:"";
    position:fixed;
    inset:0;
    background:
        linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.015) 50%,transparent 100%);
    animation:bgMove 8s linear infinite;
    pointer-events:none;
}

@keyframes bgMove{
    from{
        transform:translateX(-100%);
    }
    to{
        transform:translateX(100%);
    }
}

/* ===== Main Page ===== */

.doors-page{
    direction:rtl;
    padding:35px;
    min-height:100vh;
    animation:fadePage 0.8s ease;
}

@keyframes fadePage{
    from{
        opacity:0;
        transform:translateY(20px);
    }
    to{
        opacity:1;
        transform:translateY(0);
    }
}

/* ===== Header ===== */

.page-header{
    position:relative;
    overflow:hidden;
    background:
        linear-gradient(135deg,#1e1b1b,#171717);
    border-radius:32px;
    padding:30px;
    margin-bottom:30px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex-wrap:wrap;
    gap:20px;
    box-shadow:
        0 15px 40px rgba(0,0,0,0.45),
        inset 0 1px 0 rgba(255,255,255,0.04);
}

.page-header::before{
    content:"";
    position:absolute;
    width:350px;
    height:350px;
    background:radial-gradient(circle,#6b1f2f22 0%,transparent 70%);
    top:-150px;
    left:-120px;
}

.page-header::after{
    content:"";
    position:absolute;
    width:250px;
    height:250px;
    background:radial-gradient(circle,#7aa35a22 0%,transparent 70%);
    bottom:-100px;
    right:-80px;
}

.page-header h1{
    margin:0;
    font-size:38px;
    font-weight:800;
    background:linear-gradient(90deg,#8b5a2b,#6b1f2f,#556b2f);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
}

.page-header p{
    margin-top:12px;
    color:#d1d1d1;
    font-size:15px;
}

/* ===== Buttons ===== */

.header-actions{
    display:flex;
    gap:14px;
    flex-wrap:wrap;
}

.select-btn,
.export-btn{
    position:relative;
    overflow:hidden;
    border:none;
    border-radius:18px;
    padding:14px 28px;
    font-size:15px;
    font-weight:bold;
    cursor:pointer;
    transition:0.35s;
    color:white;
}

.select-btn{
    background:
        linear-gradient(135deg,#6b1f2f,#8a3045);

    box-shadow:
        0 8px 25px rgba(107,31,47,0.35);
}

.export-btn{
    background:
        linear-gradient(135deg,#5f7740,#89a85b);

    color:#fff;

    box-shadow:
        0 8px 25px rgba(95,119,64,0.35);
}

.select-btn:hover,
.export-btn:hover{
    transform:translateY(-4px) scale(1.05);
}

.select-btn::before,
.export-btn::before{
    content:"";
    position:absolute;
    top:0;
    left:-100%;
    width:100%;
    height:100%;
    background:rgba(255,255,255,0.15);
    transition:0.5s;
}

.select-btn:hover::before,
.export-btn:hover::before{
    left:100%;
}

/* ===== Stats ===== */

.stats-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
    gap:24px;
    margin-bottom:30px;
}

.stat-card{
    position:relative;
    overflow:hidden;
    background:
        linear-gradient(145deg,#2a2623,#211e1c);

    border-radius:28px;
    padding:24px;
    transition:0.35s;

    box-shadow:
        0 10px 35px rgba(0,0,0,0.35);
}

.stat-card:nth-child(1){
    border:1px solid rgba(107,31,47,0.35);
}

.stat-card:nth-child(2){
    border:1px solid rgba(95,119,64,0.35);
}

.stat-card:nth-child(3){
    border:1px solid rgba(139,90,43,0.35);
}

.stat-card::before{
    content:"";
    position:absolute;
    width:220px;
    height:220px;
    background:radial-gradient(circle,#ffffff10 0%,transparent 70%);
    top:-90px;
    left:-90px;
}

.stat-card:hover{
    transform:translateY(-6px) rotate(0.5deg);
}

.stat-card span{
    color:#d2d2d2;
    font-size:14px;
}

.stat-card h2{
    margin-top:12px;
    margin-bottom:0;
    font-size:42px;
    font-weight:800;
}

.stat-card:nth-child(1) h2{
    color:#c96b7f;
}

.stat-card:nth-child(2) h2{
    color:#b7d58a;
}

.stat-card:nth-child(3) h2{
    color:#c89a5a;
}

/* ===== Table ===== */

.table-wrapper{
    background:
        linear-gradient(145deg,#191919,#111111);
    border-radius:30px;
    overflow:hidden;
    box-shadow:
        0 15px 45px rgba(0,0,0,0.5);
}

.table-toolbar{
    padding:22px;
    border-bottom:1px solid rgba(255,255,255,0.06);
}

.table-toolbar input{
    width:340px;
    max-width:100%;
    height:54px;
    border:none;
    border-radius:18px;
    background:#232323;
    color:white;
    padding:0 18px;
    font-size:15px;
    transition:0.3s;
    box-shadow:
        inset 0 0 0 1px rgba(255,255,255,0.06);
}

.table-toolbar input:focus{
    outline:none;
    box-shadow:
        0 0 0 4px rgba(107,31,47,0.18);
}

.table-toolbar input::placeholder{
    color:#aaa;
}

table{
    width:100%;
    border-collapse:collapse;
}

thead{
    background:
        linear-gradient(90deg,#6b1f2f,#5f7740);
}

th{
    padding:18px;
    color:white;
    font-size:14px;
    font-weight:700;
}

td{
    padding:18px;
    text-align:center;
    border-bottom:1px solid rgba(255,255,255,0.04);
    color:#f0f0f0;
    font-size:14px;
}

tbody tr{
    transition:0.25s;
}

tbody tr:hover{
    background:rgba(255,255,255,0.04);
    transform:scale(1.002);
}

/* ===== Checkbox ===== */

.checkbox{
    width:18px;
    height:18px;
    accent-color:#6b1f2f;
    cursor:pointer;
    transform:scale(1.1);
}

/* ===== Status ===== */

.status-badge{
    background:
        linear-gradient(135deg,#5f7740,#89a85b);

    color:#fff;

    padding:8px 16px;
    border-radius:50px;
    font-size:12px;
    font-weight:800;

    box-shadow:
        0 5px 15px rgba(95,119,64,0.25);
}

/* ===== Side Links ===== */

.side-links{
    position:fixed;
    top:50%;
    left:18px;
    transform:translateY(-50%);
    display:flex;
    flex-direction:column;
    gap:16px;
    z-index:999;
}

.side-link{
    width:62px;
    height:62px;
    border-radius:20px;
    display:flex;
    align-items:center;
    justify-content:center;
    text-decoration:none;
    color:white;
    font-size:22px;
    transition:0.35s;
    position:relative;
    overflow:hidden;
}

.side-link:nth-child(1){
    background:linear-gradient(135deg,#6b1f2f,#8a3045);
}

.side-link:nth-child(2){
    background:linear-gradient(135deg,#5f7740,#89a85b);
}

.side-link:nth-child(3){
    background:linear-gradient(135deg,#8b5a2b,#a06a36);
}

.side-link:nth-child(4){
    background:linear-gradient(135deg,#4a3520,#6a4b2c);
}

.side-link:hover{
    transform:translateX(-8px) scale(1.1) rotate(-3deg);
    box-shadow:
        0 12px 28px rgba(0,0,0,0.4);
}

.side-link::before{
    content:"";
    position:absolute;
    top:0;
    left:-100%;
    width:100%;
    height:100%;
    background:rgba(255,255,255,0.18);
    transition:0.5s;
}

.side-link:hover::before{
    left:100%;
}

/* ===== Responsive ===== */

@media(max-width:900px){

    .doors-page{
        padding:20px;
    }

    .page-header{
        flex-direction:column;
        align-items:flex-start;
    }

    .table-wrapper{
        overflow:auto;
    }

    table{
        min-width:1100px;
    }

    .side-links{
        bottom:15px;
        top:auto;
        left:50%;
        transform:translateX(-50%);
        flex-direction:row;
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


