// // // import "./HomePage.css";
// // // import { motion } from "framer-motion";
// // // import { useEffect, useState } from "react";

// // // export default function HomePage() {
// // //   const [scrollY, setScrollY] = useState(0);

// // //   useEffect(() => {
// // //     const onScroll = () => setScrollY(window.scrollY);
// // //     window.addEventListener("scroll", onScroll);
// // //     return () => window.removeEventListener("scroll", onScroll);
// // //   }, []);

// // //   return (
// // //     <div className="home-pro">

// // //       {/* HERO */}
// // //       <section className="hero-pro">
// // //         <motion.div
// // //           className="hero-bg"
// // //           style={{ transform: `translateY(${scrollY * 0.3}px)` }}
// // //         />

// // //         <motion.h1
// // //           initial={{ opacity: 0, y: 40 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 1 }}
// // //         >
// // //           🚪 דלתות מצדה
// // //         </motion.h1>

// // //         <motion.p
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1 }}
// // //           transition={{ delay: 0.5 }}
// // //         >
// // //           חוויית דלתות יוקרה בעיצוב חדשני
// // //         </motion.p>

// // //         <motion.div
// // //           className="cta-buttons"
// // //           initial={{ scale: 0.8, opacity: 0 }}
// // //           animate={{ scale: 1, opacity: 1 }}
// // //           transition={{ delay: 0.8 }}
// // //         >
// // //           <button className="gold">התחל פרויקט</button>
// // //           <button className="dark">צפה בקטלוג</button>
// // //         </motion.div>
// // //       </section>

// // //       {/* STATS */}
// // //       <section className="stats-pro">
// // //         {[
// // //           ["🔥", "12,000+ דלתות"],
// // //           ["🏭", "25 שנות ניסיון"],
// // //           ["⭐", "לקוחות מרוצים"]
// // //         ].map((s, i) => (
// // //           <motion.div
// // //             key={i}
// // //             className="stat-pro"
// // //             initial={{ opacity: 0, y: 50 }}
// // //             whileInView={{ opacity: 1, y: 0 }}
// // //             viewport={{ once: true }}
// // //           >
// // //             <span>{s[0]}</span>
// // //             <b>{s[1]}</b>
// // //           </motion.div>
// // //         ))}
// // //       </section>

// // //       {/* PARALLAX SHOWCASE */}
// // //       <section className="showcase">
// // //         <motion.div
// // //           className="door-card"
// // //           whileHover={{ rotateY: 10, scale: 1.05 }}
// // //         >
// // //           🚪 דלת מודרנית שחורה
// // //         </motion.div>

// // //         <motion.div
// // //           className="door-card gold"
// // //           whileHover={{ rotateY: -10, scale: 1.05 }}
// // //         >
// // //           ✨ דלת יוקרה זהב
// // //         </motion.div>
// // //       </section>

// // //       {/* FEATURES */}
// // //       <section className="features-pro">
// // //         {["עיצוב אישי", "בטיחות גבוהה", "ייצור מהיר", "חומרים פרימיום"].map((f, i) => (
// // //           <motion.div
// // //             key={i}
// // //             className="feature-card"
// // //             whileHover={{ y: -10, scale: 1.02 }}
// // //             initial={{ opacity: 0 }}
// // //             whileInView={{ opacity: 1 }}
// // //           >
// // //             {f}
// // //           </motion.div>
// // //         ))}
// // //       </section>

// // //       {/* GALLERY 3D */}
// // //       <section className="gallery-pro">
// // //         {[1, 2, 3, 4].map(i => (
// // //           <motion.div
// // //             key={i}
// // //             className="img-pro"
// // //             whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05 }}
// // //           />
// // //         ))}
// // //       </section>

// // //       {/* FINAL CTA */}
// // //       <motion.section
// // //         className="cta-pro"
// // //         whileInView={{ scale: 1 }}
// // //         initial={{ scale: 0.9 }}
// // //       >
// // //         <h2>רוצה דלת ברמה אחרת?</h2>
// // //         <button>📞 דבר איתנו עכשיו</button>
// // //       </motion.section>

// // //     </div>
// // //   );
// // // }


// // //----------------------------------------------------
// // // import React, { useEffect } from "react";
// // // import "../Orders/orders.css"; // כאן תכלול את כל הסגנונות שהגדרת למעלה

// // // const data = {
// // //   orders: [
// // //     { status: "open", count: 12 },
// // //     { status: "in-progress", count: 8 },
// // //     { status: "done", count: 25 },
// // //     { status: "cancelled", count: 3 },
// // //   ],
// // //   items: [
// // //     { name: "דלת עץ", qty: 15 },
// // //     { name: "משקוף אלומיניום", qty: 20 },
// // //     { name: "דלת זכוכית", qty: 10 },
// // //   ],
// // // };

// // // const Dashboard = () => {
// // //   useEffect(() => {
// // //     const bars = document.querySelectorAll(".graph-bar");
// // //     bars.forEach((bar) => {
// // //       const value = parseInt(bar.dataset.value, 10);
// // //       bar.style.setProperty("--bar-value", value);
// // //     });
// // //   }, []);

// // //   return (
// // //     <div className="lux-container">
// // //       {/* כרטיסי סטטוס עליונים */}
// // //       <div className="stats-row">
// // //         {data.orders.map((o) => (
// // //           <div className="stat-card" key={o.status}>
// // //             <div className="stat-label">{o.status}</div>
// // //             <div className="stat-value">{o.count}</div>
// // //             <div className="stat-sub">הזמנות</div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* גרף עמודות של הזמנות */}
// // //       <div className="dashboard-graph">
// // //         <h2 className="graph-title">סטטוס הזמנות</h2>
// // //         <div className="graph-wrapper">
// // //           <div className="graph-glow"></div>
// // //           {data.orders.map((o) => (
// // //             <div className="graph-column" key={o.status}>
// // //               <div className={`graph-bar ${o.status}`} data-value={o.count}>
// // //                 <span className="graph-value">{o.count}</span>
// // //               </div>
// // //               <span className="graph-label">{o.status}</span>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* פילוח פריטים */}
// // //       <div className="lux-card">
// // //         <div className="lux-header">
// // //           <h2>פריטים במלאי</h2>
// // //         </div>
// // //         <div className="lux-items">
// // //           {data.items.map((item) => (
// // //             <div className="lux-item-card" key={item.name}>
// // //               <div className="lux-item-header">
// // //                 <span className="lux-badge">{item.qty}</span>
// // //                 <span>{item.name}</span>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* אנימציה גרפית נוספת – מסך כללי */}
// // //       <div className="lux-card">
// // //         <h2>תובנות נוספות</h2>
// // //         <div className="lux-info-grid">
// // //           <div className="lux-field">
// // //             <span className="lux-label">מספר פרויקטים פעילים</span>
// // //             <span className="lux-value">7</span>
// // //           </div>
// // //           <div className="lux-field">
// // //             <span className="lux-label">כמות דלתות בהתקנה</span>
// // //             <span className="lux-value">42</span>
// // //           </div>
// // //           <div className="lux-field">
// // //             <span className="lux-label">משקופים במלאי</span>
// // //             <span className="lux-value">35</span>
// // //           </div>
// // //           <div className="lux-field">
// // //             <span className="lux-label">הזמנות צפויות השבוע</span>
// // //             <span className="lux-value">16</span>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;

// // // src/pages/Home.js
// // import React, { useEffect } from 'react';
// // // import './Home.css';
// // import { motion } from 'framer-motion';

// // const Home = () => {
// //   useEffect(() => {
// //     document.title = "מצדה - דף הבית";
// //   }, []);

// //   const fadeUp = {
// //     hidden: { opacity: 0, y: 30 },
// //     visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
// //   };

// //   return (
// //     <div className="lux-container">
// //       {/* Hero Section */}
// //       <motion.section
// //         className="lux-card"
// //         initial="hidden"
// //         animate="visible"
// //         variants={fadeUp}
// //       >
// //         <h1>ברוכים הבאים למצדה</h1>
// //         <p>
// //           מצדה היא המובילה בייצור דלתות איכותיות ומשקופים ברמה הגבוהה ביותר.  
// //           עם ניסיון עשיר בתחום והקפדה על חומרי גלם ברמה הגבוהה ביותר, אנו מספקים פתרונות מותאמים אישית לכל לקוח.
// //         </p>
// //       </motion.section>

// //       {/* Services Section */}
// //       <motion.section
// //         className="lux-card"
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true }}
// //         variants={fadeUp}
// //       >
// //         <h2>השירותים שלנו</h2>
// //         <div className="lux-items">
// //           <div className="lux-item-card">
// //             <div className="lux-item-header">
// //               <h3>דלתות פנים</h3>
// //               <span className="lux-badge">חדש</span>
// //             </div>
// //             <p>דלתות פנים מעוצבות, עמידות ומותאמות אישית לסגנון הבית או העסק.</p>
// //           </div>
// //           <div className="lux-item-card">
// //             <div className="lux-item-header">
// //               <h3>דלתות חוץ</h3>
// //               <span className="lux-badge">יוקרתי</span>
// //             </div>
// //             <p>דלתות חוץ בטיחותיות, עמידות למזג האוויר ומעוצבות עם תשומת לב לפרטים.</p>
// //           </div>
// //           <div className="lux-item-card">
// //             <div className="lux-item-header">
// //               <h3>משקופים בהתאמה אישית</h3>
// //             </div>
// //             <p>משקופים באיכות גבוהה לכל סוגי הדלתות, מותאמים לפי מידה וסגנון המבנה.</p>
// //           </div>
// //         </div>
// //       </motion.section>

// //       {/* About Section */}
// //       <motion.section
// //         className="lux-card"
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true }}
// //         variants={fadeUp}
// //       >
// //         <h2>אודות מצדה</h2>
// //         <p>
// //           מאז הקמת המפעל, מצדה שואפת לספק דלתות ברמה הגבוהה ביותר.  
// //           צוות המומחים שלנו משלב בין טכנולוגיות מתקדמות לבין עבודת יד מוקפדת.  
// //           אנו מאמינים שהדלת היא לא רק פריט פונקציונלי, אלא גם מרכיב חשוב בעיצוב הבית או העסק.
// //         </p>
// //       </motion.section>

// //       {/* Animation / Features Section */}
// //       <motion.section
// //         className="lux-card"
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true }}
// //         variants={fadeUp}
// //       >
// //         <h2>למה לבחור בנו?</h2>
// //         <div className="lux-grid">
// //           <div className="lux-field">
// //             <span className="lux-label">חומרים איכותיים</span>
// //             <span className="lux-value">רק חומרים מובחרים שמבטיחים עמידות לאורך שנים</span>
// //           </div>
// //           <div className="lux-field">
// //             <span className="lux-label">עיצוב מותאם אישית</span>
// //             <span className="lux-value">כל דלת ומסגרת מעוצבות בהתאם לדרישות הלקוח</span>
// //           </div>
// //           <div className="lux-field">
// //             <span className="lux-label">תקנים ובטיחות</span>
// //             <span className="lux-value">עמידה בתקנים מחמירים של בטיחות ואיכות</span>
// //           </div>
// //           <div className="lux-field">
// //             <span className="lux-label">שירות מקצועי</span>
// //             <span className="lux-value">ליווי אישי מייעוץ ועד התקנה והגשה</span>
// //           </div>
// //         </div>
// //       </motion.section>

// //       {/* Contact / Call to Action Section */}
// //       <motion.section
// //         className="lux-card"
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true }}
// //         variants={fadeUp}
// //       >
// //         <h2>צרו קשר</h2>
// //         <p>לפרטים נוספים, ייעוץ או הזמנות, ניתן לפנות אלינו ונשמח ללוות אתכם בכל שלב.</p>
// //         <button className="btn-primary">ליצירת קשר</button>
// //       </motion.section>
// //     </div>
// //   );
// // };

// // export default Home;


// import React from "react";
// // HomePage.jsx

// import { useState } from "react";
// import "./HomePage.css";
// import Header from "../Header/Header";

// export default function HomePage() {

//     const [messages, setMessages] = useState([
//         {
//             type: "bot",
//             text: "שלום, כיצד ניתן לעזור?"
//         }
//     ]);

//     const [input, setInput] = useState("");

//     async function sendMessage() {

//         if (!input.trim()) {
//             return;
//         }

//         const userMessage = {
//             type: "user",
//             text: input
//         };

//         setMessages(prev => [...prev, userMessage]);

//         const currentInput = input;

//         setInput("");

//         try {

//             const response = await fetch(
//                 "http://localhost:8000/chat",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({
//                         prompt: currentInput
//                     })
//                 }
//             );

//             const data = await response.json();

//             setMessages(prev => [
//                 ...prev,
//                 {
//                     type: "bot",
//                     text: data.reply
//                 }
//             ]);

//         } catch (error) {

//             setMessages(prev => [
//                 ...prev,
//                 {
//                     type: "bot",
//                     text: "שגיאה בחיבור לשרת AI"
//                 }
//             ]);
//         }
//     }

//     return (

//         <main className="home-page">
// {/* <Header /> */}

//             {/* מקום לHeader */}
//             <div id="header-placeholder"></div>
//             {/* HERO */}

//             <section className="hero-section">

//                 <div className="hero-overlay"></div>

//                 <div className="hero-content">

//                     <span className="hero-tag">
//                         מערכת ניהול חכמה למפעל דלתות
//                     </span>

//                     <h1 className="hero-title">
//                         שליטה מלאה על ההזמנות,
//                         הלקוחות ותהליכי הייצור
//                     </h1>

//                     <p className="hero-description">
//                         מערכת חדשנית לניהול מפעל דלתות ומשקופים,
//                         כולל הזמנות, דשבורד, עובדים,
//                         מלאי, לקוחות ובינה מלאכותית.
//                     </p>

//                     <div className="hero-actions">

//                         <button className="btn-primary">
//                             מעבר לדשבורד
//                         </button>

//                         <button className="btn-secondary">
//                             צפייה בהזמנות
//                         </button>

//                     </div>

//                 </div>

//                 <div className="hero-glow"></div>

//             </section>

//             {/* STATS */}

//             <section className="stats-row">

//                 <div className="stat-card">
//                     <span className="stat-label">
//                         הזמנות פעילות
//                     </span>

//                     <span className="stat-value">
//                         248
//                     </span>

//                     <span className="stat-sub">
//                         בזמן אמת
//                     </span>
//                 </div>

//                 <div className="stat-card">
//                     <span className="stat-label">
//                         לקוחות
//                     </span>

//                     <span className="stat-value">
//                         1204
//                     </span>

//                     <span className="stat-sub">
//                         רשומים במערכת
//                     </span>
//                 </div>

//                 <div className="stat-card">
//                     <span className="stat-label">
//                         עובדים
//                     </span>

//                     <span className="stat-value">
//                         38
//                     </span>

//                     <span className="stat-sub">
//                         פעילים
//                     </span>
//                 </div>

//                 <div className="stat-card">
//                     <span className="stat-label">
//                         קווי ייצור
//                     </span>

//                     <span className="stat-value">
//                         12
//                     </span>

//                     <span className="stat-sub">
//                         מחוברים
//                     </span>
//                 </div>

//             </section>

//             {/* FEATURES */}

//             <section className="features-section">

//                 <div className="section-title-block">

//                     <h2 className="section-title">
//                         יכולות המערכת
//                     </h2>

//                     <p className="section-subtitle">
//                         סביבת עבודה מלאה לניהול מפעל מתקדם
//                     </p>

//                 </div>

//                 <div className="features-grid">

//                     <div className="feature-card">
//                         <div className="feature-icon">📦</div>

//                         <h3>
//                             ניהול הזמנות
//                         </h3>

//                         <p>
//                             מעקב מלא אחר סטטוסי הזמנות
//                             ותהליכי ייצור.
//                         </p>
//                     </div>

//                     <div className="feature-card">
//                         <div className="feature-icon">🚪</div>

//                         <h3>
//                             ניהול דלתות
//                         </h3>

//                         <p>
//                             קטלוג דלתות ומשקופים
//                             עם נתוני ייצור מלאים.
//                         </p>
//                     </div>

//                     <div className="feature-card">
//                         <div className="feature-icon">👷</div>

//                         <h3>
//                             עובדים
//                         </h3>

//                         <p>
//                             ניהול הרשאות,
//                             מחלקות ומשימות.
//                         </p>
//                     </div>

//                     <div className="feature-card">
//                         <div className="feature-icon">📊</div>

//                         <h3>
//                             דשבורד
//                         </h3>

//                         <p>
//                             גרפים וסטטיסטיקות
//                             בזמן אמת.
//                         </p>
//                     </div>

//                 </div>

//             </section>

//             {/* GRAPH */}

//             <section className="dashboard-graph">

//                 <h2 className="graph-title">
//                     פעילות הזמנות
//                 </h2>

//                 <p className="graph-subtitle">
//                     נתוני מערכת חיים
//                 </p>

//                 <div className="graph-wrapper">

//                     <div className="graph-column">

//                         <div
//                             className="graph-bar open"
//                             style={{
//                                 "--bar-value": 25
//                             }}
//                         >
//                             <span className="graph-value">
//                                 25
//                             </span>
//                         </div>

//                         <span className="graph-label">
//                             פתוחות
//                         </span>

//                     </div>

//                     <div className="graph-column">

//                         <div
//                             className="graph-bar in-progress"
//                             style={{
//                                 "--bar-value": 18
//                             }}
//                         >
//                             <span className="graph-value">
//                                 18
//                             </span>
//                         </div>

//                         <span className="graph-label">
//                             בתהליך
//                         </span>

//                     </div>

//                     <div className="graph-column">

//                         <div
//                             className="graph-bar done"
//                             style={{
//                                 "--bar-value": 30
//                             }}
//                         >
//                             <span className="graph-value">
//                                 30
//                             </span>
//                         </div>

//                         <span className="graph-label">
//                             הושלמו
//                         </span>

//                     </div>

//                     <div className="graph-column">

//                         <div
//                             className="graph-bar cancelled"
//                             style={{
//                                 "--bar-value": 8
//                             }}
//                         >
//                             <span className="graph-value">
//                                 8
//                             </span>
//                         </div>

//                         <span className="graph-label">
//                             בוטלו
//                         </span>

//                     </div>

//                     <div className="graph-glow"></div>

//                 </div>

//             </section>

//             {/* AI */}

//             <section className="ai-section">

//                 <div className="section-title-block">

//                     <h2 className="section-title">
//                         עוזר AI חכם
//                     </h2>

//                     <p className="section-subtitle">
//                         מחובר לשרת Python בפורט 8000
//                     </p>

//                 </div>

//                 <div className="ai-card">

//                     <div className="chat-messages">

//                         {
//                             messages.map((msg, index) => (

//                                 <div
//                                     key={index}
//                                     className={
//                                         msg.type === "bot"
//                                             ? "bot-message"
//                                             : "user-message"
//                                     }
//                                 >
//                                     {msg.text}
//                                 </div>

//                             ))
//                         }

//                     </div>

//                     <div className="chat-input-area">

//                         <input
//                             type="text"
//                             className="chat-input"
//                             placeholder="כתוב הודעה..."
//                             value={input}
//                             onChange={(e) =>
//                                 setInput(e.target.value)
//                             }
//                         />

//                         <button
//                             className="btn-primary"
//                             onClick={sendMessage}
//                         >
//                             שלח
//                         </button>

//                     </div>

//                 </div>

//             </section>

//         </main>
//     );
// }

//-----------------------------------------------

import { useState } from "react";
import "./HomePage.css";
import FloatingChat from "./FloatingChat";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

    const [messages, setMessages] = useState([
        {
            type: "bot",
            text: "שלום, כיצד ניתן לעזור?"
        }
    ]);

    const [input, setInput] = useState("");
    const navigate = useNavigate();
    async function sendMessage() {

        if (!input.trim()) {
            return;
        }

        const userMessage = {
            type: "user",
            text: input
        };

        setMessages(prev => [...prev, userMessage]);

        const currentInput = input;

        setInput("");

        try {

            const response = await fetch(
                "http://localhost:8000/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        prompt: currentInput
                    })
                }
            );

            const data = await response.json();

            setMessages(prev => [
                ...prev,
                {
                    type: "bot",
                    text: data.reply
                }
            ]);

        } catch {

            setMessages(prev => [
                ...prev,
                {
                    type: "bot",
                    text: "שגיאה בחיבור לשרת"
                }
            ]);
        }
    }

    function handleKeyDown(e) {

        if (e.key === "Enter") {
            sendMessage();
        }
    }

    return (

        <main className="modern-home">

            {/* HEADER PLACEHOLDER */}

            <div id="header-placeholder"></div>

            {/* HERO */}

            <section className="hero">

                <div className="hero-blur"></div>

                <div className="hero-content">

                    <span className="hero-badge">
                        AI Powered Factory System
                    </span>

                    <h1 className="hero-title">
                        ניהול מפעל דלתות
                        <br />
                        ברמה אחרת
                    </h1>

                    <p className="hero-subtitle">
                        שליטה מלאה על הזמנות, ייצור, לקוחות ועובדים
                        במערכת מהירה, חכמה ומתקדמת.
                    </p>

                    <div className="hero-buttons">

                        <button className="primary-btn">
                            כניסה למערכת
                        </button>

                        <button className="secondary-btn" onClick={() => navigate("/manager/dashboard")}>
                            צפייה בדשבורד
                        </button>

                    </div>

                </div>

                {/* FLOATING CARDS */}

                <div className="floating-card floating-1">
                    <span>248</span>
                    <p>הזמנות פעילות</p>
                </div>

                <div className="floating-card floating-2">
                    <span>94%</span>
                    <p>דיוק ייצור</p>
                </div>

                <div className="floating-card floating-3">
                    <span>12</span>
                    <p>קווי ייצור</p>
                </div>

            </section>

            {/* FEATURES */}

            <section className="features">

                <div className="feature-box">
                    <div className="feature-icon">📦</div>
                    <h3>הזמנות</h3>
                </div>

                <div className="feature-box">
                    <div className="feature-icon">🚪</div>
                    <h3>דלתות</h3>
                </div>

                <div className="feature-box">
                    <div className="feature-icon">📊</div>
                    <h3>דשבורד</h3>
                </div>

                <div className="feature-box">
                    <div className="feature-icon">👷</div>
                    <h3>עובדים</h3>
                </div>

            </section>

            {/* AI CHAT */}

            {/* <section className="ai-wrapper">

                <div className="ai-header">

                    <div>
                        <h2>AI Assistant</h2>
                        <p>
                            מחובר לשרת Python
                        </p>
                    </div>

                    <div className="ai-status">
                        Online
                    </div>

                </div> */}

                         <FloatingChat />


            {/* </section> */}

        </main>
    );
}


//-------------------------------------------------

// import FloatingChat from "./FloatingChat";
// import "./HomePage.css";

// export default function HomePage() {

//     const shortcuts = [
//         { title: "הזמנות", icon: "📦" },
//         { title: "לקוחות", icon: "👤" },
//         { title: "דלתות", icon: "🚪" },
//         { title: "עובדים", icon: "👷" },
//         { title: "דשבורד", icon: "📊" },
//         { title: "מלאי", icon: "📦" }
//     ];

//     return (
//         <div className="home">

//             <header className="top-hero">

//                 <h1>
//                     מערכת ניהול מפעל דלתות
//                 </h1>

//                 <p>
//                     שליטה מלאה, מהירה ונקייה על כל התהליכים
//                 </p>

//                 <div className="hero-actions">
//                     <button>כניסה לדשבורד</button>
//                     <button className="ghost">ניהול הזמנות</button>
//                 </div>

//             </header>

//             <section className="shortcuts">

//                 {shortcuts.map((s, i) => (
//                     <div key={i} className="shortcut-card">
//                         <div className="icon">{s.icon}</div>
//                         <div>{s.title}</div>
//                     </div>
//                 ))}

//             </section>

//             {/* צאט גלובלי */}
//             <FloatingChat />

//         </div>
//     );
// }