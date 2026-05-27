import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#a855f7"];

export default function Dashboard() {
  const customers = useSelector((s) => s.customers.customers) || [];
  const employees = useSelector((s) => s.employees.employees) || [];
  const orders = useSelector((s) => s.orders.orders) || [];
  const doors = useSelector((s) => s.doors.doors) || [];

  /* ================= KPI ================= */

  const totalRevenue = useMemo(
    () => orders.reduce((sum, o) => sum + (o.total || 0), 0),
    [orders]
  );

  // לקוח מוביל לפי מספר הזמנות
  const bestCustomer = useMemo(() => {
    if (!customers.length || !orders.length) return null;
    const countMap = {};
    orders.forEach((o) => {
      const custId = o.customerId || o.custId;
      if (custId) countMap[custId] = (countMap[custId] || 0) + 1;
    });
    let max = 0,
      best = null;
    customers.forEach((c) => {
      if ((countMap[c.id] || 0) > max) {
        max = countMap[c.id];
        best = { ...c, orderCount: countMap[c.id] };
      }
    });
    return best;
  }, [customers, orders]);

  // const monthlyData = useMemo(() => {
  //   const map = {};
  //   orders.forEach((o) => {
  //     const m = o.month || "לא ידוע";
  //     map[m] = (map[m] || 0) + (o.total || 0);
  //   });

  //   return Object.entries(map).map(([month, value]) => ({
  //     month,
  //     value,
  //   }));
  // }, [orders]);
  const monthlyData = useMemo(() => {
    const map = {};

    orders.forEach((o) => {
      if (!o.orderDate) return;

      const date = new Date(o.orderDate);

      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      map[key] = (map[key] || 0) + (o.price || 0);
    });

    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b)) // מיון נכון לפי טקסט YYYY-MM
      .map(([month, value]) => ({
        month,
        value,
      }));
  }, [orders]);

  const statusData = [
    { name: "הושלמו", value: orders.filter((o) => o.status === "completed").length },
    { name: "בהמתנה", value: orders.filter((o) => o.status === "pending").length },
    { name: "בוטלו", value: orders.filter((o) => o.status === "canceled").length },
  ];

  const employeesData = useMemo(() => {
    const map = {};
    employees.forEach((e) => {
      map[e.department] = (map[e.department] || 0) + 1;
    });

    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
    }));
  }, [employees]);

  // const doorsData = useMemo(() => {
  //   const map = {};
  //   doors.forEach((d) => {
  //     map[d.type] = (map[d.type] || 0) + (d.sales || 0);
  //   });

  //   return Object.entries(map).map(([name, value]) => ({
  //     name,
  //     value,
  //   }));
  // }, [doors]);
  const doorsTypeData = useMemo(() => {
    const map = {};

    doors.forEach((d) => {
      const type = d.type || "לא מוגדר";
      map[type] = (map[type] || 0) + 1;
    });

    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
    }));
  }, [doors]);
  //חישוב הזמנות לפי ימי השבוע לשבוע הקרוב
  const weekDeliveryData = useMemo(() => {
    const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

    const startOfWeek = (date) => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day;
      return new Date(d.setDate(diff));
    };

    const start = startOfWeek(new Date());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const map = {
      ראשון: [],
      שני: [],
      שלישי: [],
      רביעי: [],
      חמישי: [],
      שישי: [],
      שבת: [],
    };

    orders.forEach((o) => {
      if (!o.deliveryDate) return;

      const d = new Date(o.deliveryDate);
      if (d < start || d > end) return;

      const dayName = days[d.getDay()];
      map[dayName].push(o.id);
    });

    return Object.entries(map).map(([day, ids]) => ({
      day,
      count: ids.length,
      ids,
    }));
  }, [orders]);
  function getColor(count) {
    if (count === 0) return "rgba(148,163,184,0.2)";
    if (count <= 2) return "linear-gradient(90deg,#22c55e,#16a34a)";
    if (count <= 5) return "linear-gradient(90deg,#f59e0b,#f97316)";
    return "linear-gradient(90deg,#ef4444,#b91c1c)";
  }
  // חישוב צמיחת לקוחות לפי חודש מההזמנות בפועל
  // const customersGrowth = useMemo(() => {
  //   const map = {};
  //   orders.forEach(o => {
  //     if (o.customerId || o.custId) {
  //       const m = o.month || "לא ידוע";
  //       map[m] = (map[m] || new Set());
  //       map[m].add(o.customerId || o.custId);
  //     }
  //   });
  //   return Object.entries(map).map(([month, set]) => ({
  //     x: month,
  //     y: set.size
  //   })).sort((a, b) => a.x.localeCompare(b.x));
  // }, [orders]);
  const customersGrowth = useMemo(() => {
    const map = {};

    customers.forEach((o) => {
      if (!o.createdAt) return;

      const date = new Date(o.createdAt);

      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      const customerId = o.id;
      if (!customerId) return;

      if (!map[monthKey]) {
        map[monthKey] = new Set();
      }

      map[monthKey].add(customerId);
    });

    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, set]) => ({
        month,
        value: set.size,
      }));
  }, [customers]);
  const navigate = useNavigate();
  // פילוח הכנסות לפי מחלקות עובדים
  const revenueByDepartment = useMemo(() => {
    const map = {};
    orders.forEach((o) => {
      const emp = employees.find(e => e.id === o.employeeId);
      const dep = emp?.department || "לא ידוע";
      map[dep] = (map[dep] || 0) + (o.total || 0);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [orders, employees]);

  // פילוח הזמנות לפי לקוחות
  const ordersByCustomer = useMemo(() => {
    const map = {};
    orders.forEach((o) => {
      const cust = customers.find(c => c.id === o.custId);
      const name = cust?.name || "לא ידוע";
      map[name] = (map[name] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [orders, customers]);

  // פילוח הזמנות לפי סטטוס
  const ordersByStatus = useMemo(() => {
    const map = {};
    orders.forEach((o) => {
      map[o.status || "לא ידוע"] = (map[o.status || "לא ידוע"] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [orders]);

  // פילוח עובדים לפי סטטוס
  const employeesByStatus = useMemo(() => {
    const map = {};
    employees.forEach((e) => {
      map[e.status || "לא ידוע"] = (map[e.status || "לא ידוע"] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [employees]);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📊 דשבורד ניהול מתקדם</h1>

      {/* ================= KPI ================= */}
      <div style={styles.kpiGrid}>
        <KPI title="סה״כ הכנסות" value={`₪ ${totalRevenue}`} color="#22c55e" />
        <KPI title="לקוחות" value={customers.length} color="#3b82f6" />
        <KPI title="עובדים" value={employees.length} color="#a855f7" />
        <KPI
          title="לקוח מוביל"
          value={bestCustomer ? `${bestCustomer.name} (${bestCustomer.orderCount} הזמנות)` : "אין נתונים"}
          color="#f59e0b"
        />
      </div>

      {/* ================= TOP ROW ================= */}
      <div style={styles.grid}>
        {/* <Box title="צמיחת לקוחות">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={customersGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="y" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </Box> */}
        <Box title="צמיחת לקוחות">

          <ResponsiveContainer width="100%" height={220}>

            <LineChart data={customersGrowth}>

              <defs>
                <linearGradient id="customerLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
                stroke="url(#customerLine)"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </Box>
        {/* <Box title="סטטוס הזמנות">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statusData} dataKey="value" outerRadius={60}>
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box> */}

        {/* <Box title="הכנסות לפי חודש">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyData}>
              <Bar dataKey="value" fill="#22c55e" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </Box> */}
        <Box title="הכנסות לפי חודש">

          <ResponsiveContainer width="100%" height={220}>

            <LineChart data={monthlyData}>
              <defs>
                <linearGradient id="lineColor" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f5d26a" />
                  <stop offset="100%" stopColor="#c99b2b" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#f5d26a"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </Box>
      </div>

      {/* ================= SECOND ROW ================= */}
      <div style={styles.grid}>


        {/* <Box title="דלתות לפי סוג">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={doorsData}>
              <Bar dataKey="value" fill="#f59e0b" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </Box> */}
        <Box title="התפלגות סוגי דלתות">

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={doorsTypeData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value">
                {doorsTypeData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>

            </BarChart>
          </ResponsiveContainer>

        </Box>
        <Box title="עומס אספקות השבוע">

          <div style={styles.verticalGraph}>

            {weekDeliveryData.map((d) => (
              <div key={d.day} style={styles.columnWrap}>

                {/* העמודה */}
                <div style={styles.columnBase}>

                  <div
                    style={{
                      ...styles.columnBar,
                      height: `${Math.min(d.count * 25, 140)}px`,
                      background: getColor(d.count),
                    }}
                  >

                    {/* IDs בתוך העמודה */}
                    <div style={styles.columnInside}>
                      {d.ids.slice(0, 2).map((id) => (
                        <span key={id} style={styles.idTag} onClick={() => navigate(`/order-details/${id}`)}>
                          #{id}
                        </span>
                      ))}

                      {d.ids.length > 2 && (
                        <span style={styles.moreTag}>
                          +{d.ids.length - 2}
                        </span>
                      )}
                    </div>

                  </div>

                </div>

                {/* יום בתחתית */}
                <div style={styles.dayBottom}>
                  {d.day}
                </div>

              </div>
            ))}

          </div>

        </Box>
        {/* <Box title="שיעור הזמנות">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statusData} dataKey="value" outerRadius={60} />
              {statusData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box> */}
      </div>

      {/* ================= פילוחים חדשים ================= */}
      <div style={styles.grid}>
        <Box title="הזמנות לפי לקוח">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={ordersByCustomer} dataKey="value" outerRadius={60} innerRadius={20} label>
                {ordersByCustomer.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box title="הזמנות לפי סטטוס">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={ordersByStatus} dataKey="value" outerRadius={80} innerRadius={40} label>
                {ordersByStatus.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box title="עובדים לפי סטטוס">
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={employeesByStatus} dataKey="value" outerRadius={50} innerRadius={10} label>
                {employeesByStatus.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function KPI({ title, value, color }) {
  return (
    <div style={{ ...styles.kpi, borderTop: `3px solid ${color}` }}>
      <div style={styles.kpiTitle}>{title}</div>
      <div style={styles.kpiValue}>{value}</div>
    </div>
  );
}

function Box({ title, children }) {
  return (
    <div style={styles.box}>
      <div style={styles.boxTitle}>{title}</div>
      {children}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    background: "#0f172a",
    color: "white",
    height: "100vh",
    padding: 12,
    fontFamily: "Arial",
  },

  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  verticalGraph: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: "220px",
    gap: "30px",
    padding: "10px 5px",
    direction: "rtl"
  },

  columnWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    flex: 1
  },

  columnBase: {
    width: "100%",
    height: "160px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "10px",
    border: "1px solid rgba(245,210,106,0.08)",
    position: "relative",
    overflow: "hidden"
  },

  columnBar: {
    width: "70%",
    borderRadius: "8px 8px 4px 4px",
    transition: "0.4s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "6px"
  },

  columnInside: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    alignItems: "center"
  },

  idTag: {
    fontSize: "10px",
    background: "rgba(0,0,0,0.25)",
    color: "#fff",
    padding: "2px 6px",
    borderRadius: "6px"
  },

  moreTag: {
    fontSize: "10px",
    color: "#fff",
    opacity: 0.8
  },

  dayBottom: {
    fontSize: "12px",
    color: "#ffe9a6",
    fontWeight: "700"
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 8,
    marginBottom: 10,
  },

  kpi: {
    background: "#1e293b",
    padding: 8,
    borderRadius: 8,
    textAlign: "center",
  },

  kpiTitle: {
    fontSize: 11,
    color: "#94a3b8",
  },

  kpiValue: {
    fontSize: 14,
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
    marginBottom: 10,
  },

  box: {
    background: "#1e293b",
    padding: 10,
    borderRadius: 10,
  },

  boxTitle: {
    fontSize: 12,
    marginBottom: 6,
    color: "#cbd5e1",
  },
};

// import React, { useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
//   XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
// } from "recharts";
// // import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';

// const COLORS = ["#3b82f6","#22c55e","#f59e0b","#ef4444","#a855f7"];

// export default function App() {
//   const [selectedMonth, setSelectedMonth] = useState(null);

//   const customers = useSelector(s => s.customers.customers) || [];
//   const employees = useSelector(s => s.employees.employees) || [];
//   const orders = useSelector(s => s.orders.orders) || [];
//   const doors = useSelector(s => s.doors.doors) || [];

//   // ================= KPI =================
//   const revenue = useMemo(() => orders.reduce((s,o)=>s+(o.total||0),0),[orders]);
//   const expenses = useMemo(() => orders.reduce((s,o)=>s+(o.cost||0),0),[orders]);
//   const netProfit = revenue-expenses;

//   // ================= FORECAST =================
//   const forecast = useMemo(()=>{
//     if(!orders.length) return 0;
//     const map = {};
//     orders.forEach(o=>map[o.month]=(map[o.month]||0)+(o.total||0));
//     const vals = Object.values(map);
//     if(vals.length<2) return vals[0]||0;
//     const growth = (vals[vals.length-1]-vals[0])/(vals.length-1);
//     return Math.round(vals[vals.length-1]+growth);
//   },[orders]);

//   // ================= TOP CUSTOMERS =================
//     const topCustomers = useMemo(()=>{
//     const map={};
//     customers.forEach(c=>map[c.name]=(map[c.name]||0)+(c.totalSpent||0));
//     return Object.entries(map).map(([name,value])=>({name,value}))
//         .sort((a,b)=>b.value-a.value).slice(0,5);
//     },[customers]);

//   // ================= MONTHLY DATA =================
//     const monthlyData = useMemo(()=>{
//     const map={};
//     orders.forEach(o=>map[o.month]=(map[o.month]||0)+(o.total||0));
//     return Object.entries(map).map(([month,value])=>({month,value}));
//     },[orders]);

//   // ================= FILTER =================
//     const filteredOrders = selectedMonth?orders.filter(o=>o.month===selectedMonth):orders;
//     const statusData=[
//     {name:"הושלמו",value:filteredOrders.filter(o=>o.status==="completed").length},
//     {name:"בהמתנה",value:filteredOrders.filter(o=>o.status==="pending").length},
//     {name:"בוטלו",value:filteredOrders.filter(o=>o.status==="canceled").length},
//     ];

//   // ================= INSIGHTS =================
//     const insights = [
//     netProfit>0?"הרווח חיובי 📈":"הפסד תקופתי 📉",
//     forecast>revenue?"צפי לגדילה בחודש הבא 🚀":"מגמת ירידה ⚠️",
//     customers.length>50?"בסיס לקוחות חזק 👥":"צריך גידול לקוחות",
//     //bestCustomer?.value>10000?"לקוח מוביל חזק 💎": "אין לקוח מוביל משמעותי",
// ];

//   // ================= EXPORT =================
//     const exportExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(filteredOrders);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Orders");
//     XLSX.writeFile(wb, "orders.xlsx");
//     }

//     return (
//     <div style={styles.page}>
//         <h2>📊 דשבורד ניהול – רמה 5</h2>

//       {/* KPI GRID */}
//         <div style={styles.kpiGrid}>
//         <KPI title="הכנסות" value={`₪${revenue}`} color="#3b82f6" />
//         <KPI title="הוצאות" value={`₪${expenses}`} color="#ef4444" />
//         <KPI title="רווח נקי" value={`₪${netProfit}`} color="#22c55e" />
//         <KPI title="תחזית חודש הבא" value={`₪${forecast}`} color="#f59e0b" />
//         </div>

//       {/* INSIGHTS */}
//         <div style={styles.insights}>
//         {insights.map((i,idx)=><div key={idx} style={styles.insight}>{i}</div>)}
//         </div>

//       {/* MONTHLY REVENUE */}
//         <div style={styles.box}>
//         <h3>הכנסות לפי חודשים (לחיצה לדריל דאון)</h3>
//         <ResponsiveContainer width="100%" height={200}>
//             <LineChart data={monthlyData}>
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} onClick={(d)=>setSelectedMonth(d.month)} />
//             </LineChart>
//         </ResponsiveContainer>
//         </div>

//       {/* STATUS & TOP CUSTOMERS */}
//         <div style={styles.grid}>
//         <div style={styles.box}>
//             <h3>סטטוס הזמנות {selectedMonth && `(${selectedMonth})`}</h3>
//             <ResponsiveContainer width="100%" height={160}>
//             <PieChart>
//                 <Pie data={statusData} dataKey="value" outerRadius={60} label>
//                 {statusData.map((_,i)=><Cell key={i} fill={COLORS[i]} />)}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//             </PieChart>
//             </ResponsiveContainer>
//         </div>

//         <div style={styles.box}>
//             <h3>לקוחות מובילים</h3>
//             <ul>
//             {topCustomers.map((c,i)=><li key={i}>{c.name} – ₪{c.value}</li>)}
//             </ul>
//         </div>
//         </div>

//         <button style={styles.button} onClick={exportExcel}>⬇️ הורד דוח Excel</button>
//     </div>
//   )
// }

// function KPI({title,value,color}) {
//   return (
//     <div style={{...styles.kpi,borderTop:`5px solid ${color}`}}>
//       <div>{title}</div>
//       <b>{value}</b>
//     </div>
//   )
// }

// const styles = {
//   page:{background:"#0f172a",color:"white",padding:10,fontFamily:"Arial"},
//   kpiGrid:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8},
//   kpi:{background:"#1e293b",padding:10,borderRadius:8,textAlign:"center"},
//   insights:{display:"flex",gap:8,margin:"10px 0",flexWrap:"wrap"},
//   insight:{background:"#1e293b",padding:8,borderRadius:6,fontSize:12},
//   grid:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10},
//   box:{background:"#1e293b",padding:10,borderRadius:10},
//   button:{marginTop:10,padding:"8px 12px",borderRadius:6,border:"none",background:"#3b82f6",color:"white",cursor:"pointer"}
// }