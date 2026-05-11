// import "./HomePage.css";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function HomePage() {
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const onScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <div className="home-pro">

//       {/* HERO */}
//       <section className="hero-pro">
//         <motion.div
//           className="hero-bg"
//           style={{ transform: `translateY(${scrollY * 0.3}px)` }}
//         />

//         <motion.h1
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           🚪 דלתות מצדה
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//         >
//           חוויית דלתות יוקרה בעיצוב חדשני
//         </motion.p>

//         <motion.div
//           className="cta-buttons"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 0.8 }}
//         >
//           <button className="gold">התחל פרויקט</button>
//           <button className="dark">צפה בקטלוג</button>
//         </motion.div>
//       </section>

//       {/* STATS */}
//       <section className="stats-pro">
//         {[
//           ["🔥", "12,000+ דלתות"],
//           ["🏭", "25 שנות ניסיון"],
//           ["⭐", "לקוחות מרוצים"]
//         ].map((s, i) => (
//           <motion.div
//             key={i}
//             className="stat-pro"
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <span>{s[0]}</span>
//             <b>{s[1]}</b>
//           </motion.div>
//         ))}
//       </section>

//       {/* PARALLAX SHOWCASE */}
//       <section className="showcase">
//         <motion.div
//           className="door-card"
//           whileHover={{ rotateY: 10, scale: 1.05 }}
//         >
//           🚪 דלת מודרנית שחורה
//         </motion.div>

//         <motion.div
//           className="door-card gold"
//           whileHover={{ rotateY: -10, scale: 1.05 }}
//         >
//           ✨ דלת יוקרה זהב
//         </motion.div>
//       </section>

//       {/* FEATURES */}
//       <section className="features-pro">
//         {["עיצוב אישי", "בטיחות גבוהה", "ייצור מהיר", "חומרים פרימיום"].map((f, i) => (
//           <motion.div
//             key={i}
//             className="feature-card"
//             whileHover={{ y: -10, scale: 1.02 }}
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//           >
//             {f}
//           </motion.div>
//         ))}
//       </section>

//       {/* GALLERY 3D */}
//       <section className="gallery-pro">
//         {[1, 2, 3, 4].map(i => (
//           <motion.div
//             key={i}
//             className="img-pro"
//             whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05 }}
//           />
//         ))}
//       </section>

//       {/* FINAL CTA */}
//       <motion.section
//         className="cta-pro"
//         whileInView={{ scale: 1 }}
//         initial={{ scale: 0.9 }}
//       >
//         <h2>רוצה דלת ברמה אחרת?</h2>
//         <button>📞 דבר איתנו עכשיו</button>
//       </motion.section>

//     </div>
//   );
// }


//----------------------------------------------------
// import React, { useEffect } from "react";
// import "../Orders/orders.css"; // כאן תכלול את כל הסגנונות שהגדרת למעלה

// const data = {
//   orders: [
//     { status: "open", count: 12 },
//     { status: "in-progress", count: 8 },
//     { status: "done", count: 25 },
//     { status: "cancelled", count: 3 },
//   ],
//   items: [
//     { name: "דלת עץ", qty: 15 },
//     { name: "משקוף אלומיניום", qty: 20 },
//     { name: "דלת זכוכית", qty: 10 },
//   ],
// };

// const Dashboard = () => {
//   useEffect(() => {
//     const bars = document.querySelectorAll(".graph-bar");
//     bars.forEach((bar) => {
//       const value = parseInt(bar.dataset.value, 10);
//       bar.style.setProperty("--bar-value", value);
//     });
//   }, []);

//   return (
//     <div className="lux-container">
//       {/* כרטיסי סטטוס עליונים */}
//       <div className="stats-row">
//         {data.orders.map((o) => (
//           <div className="stat-card" key={o.status}>
//             <div className="stat-label">{o.status}</div>
//             <div className="stat-value">{o.count}</div>
//             <div className="stat-sub">הזמנות</div>
//           </div>
//         ))}
//       </div>

//       {/* גרף עמודות של הזמנות */}
//       <div className="dashboard-graph">
//         <h2 className="graph-title">סטטוס הזמנות</h2>
//         <div className="graph-wrapper">
//           <div className="graph-glow"></div>
//           {data.orders.map((o) => (
//             <div className="graph-column" key={o.status}>
//               <div className={`graph-bar ${o.status}`} data-value={o.count}>
//                 <span className="graph-value">{o.count}</span>
//               </div>
//               <span className="graph-label">{o.status}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* פילוח פריטים */}
//       <div className="lux-card">
//         <div className="lux-header">
//           <h2>פריטים במלאי</h2>
//         </div>
//         <div className="lux-items">
//           {data.items.map((item) => (
//             <div className="lux-item-card" key={item.name}>
//               <div className="lux-item-header">
//                 <span className="lux-badge">{item.qty}</span>
//                 <span>{item.name}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* אנימציה גרפית נוספת – מסך כללי */}
//       <div className="lux-card">
//         <h2>תובנות נוספות</h2>
//         <div className="lux-info-grid">
//           <div className="lux-field">
//             <span className="lux-label">מספר פרויקטים פעילים</span>
//             <span className="lux-value">7</span>
//           </div>
//           <div className="lux-field">
//             <span className="lux-label">כמות דלתות בהתקנה</span>
//             <span className="lux-value">42</span>
//           </div>
//           <div className="lux-field">
//             <span className="lux-label">משקופים במלאי</span>
//             <span className="lux-value">35</span>
//           </div>
//           <div className="lux-field">
//             <span className="lux-label">הזמנות צפויות השבוע</span>
//             <span className="lux-value">16</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// src/pages/Home.js
import React, { useEffect } from 'react';
// import './Home.css';
import { motion } from 'framer-motion';

const Home = () => {
  useEffect(() => {
    document.title = "מצדה - דף הבית";
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="lux-container">
      {/* Hero Section */}
      <motion.section
        className="lux-card"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h1>ברוכים הבאים למצדה</h1>
        <p>
          מצדה היא המובילה בייצור דלתות איכותיות ומשקופים ברמה הגבוהה ביותר.  
          עם ניסיון עשיר בתחום והקפדה על חומרי גלם ברמה הגבוהה ביותר, אנו מספקים פתרונות מותאמים אישית לכל לקוח.
        </p>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="lux-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2>השירותים שלנו</h2>
        <div className="lux-items">
          <div className="lux-item-card">
            <div className="lux-item-header">
              <h3>דלתות פנים</h3>
              <span className="lux-badge">חדש</span>
            </div>
            <p>דלתות פנים מעוצבות, עמידות ומותאמות אישית לסגנון הבית או העסק.</p>
          </div>
          <div className="lux-item-card">
            <div className="lux-item-header">
              <h3>דלתות חוץ</h3>
              <span className="lux-badge">יוקרתי</span>
            </div>
            <p>דלתות חוץ בטיחותיות, עמידות למזג האוויר ומעוצבות עם תשומת לב לפרטים.</p>
          </div>
          <div className="lux-item-card">
            <div className="lux-item-header">
              <h3>משקופים בהתאמה אישית</h3>
            </div>
            <p>משקופים באיכות גבוהה לכל סוגי הדלתות, מותאמים לפי מידה וסגנון המבנה.</p>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="lux-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2>אודות מצדה</h2>
        <p>
          מאז הקמת המפעל, מצדה שואפת לספק דלתות ברמה הגבוהה ביותר.  
          צוות המומחים שלנו משלב בין טכנולוגיות מתקדמות לבין עבודת יד מוקפדת.  
          אנו מאמינים שהדלת היא לא רק פריט פונקציונלי, אלא גם מרכיב חשוב בעיצוב הבית או העסק.
        </p>
      </motion.section>

      {/* Animation / Features Section */}
      <motion.section
        className="lux-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2>למה לבחור בנו?</h2>
        <div className="lux-grid">
          <div className="lux-field">
            <span className="lux-label">חומרים איכותיים</span>
            <span className="lux-value">רק חומרים מובחרים שמבטיחים עמידות לאורך שנים</span>
          </div>
          <div className="lux-field">
            <span className="lux-label">עיצוב מותאם אישית</span>
            <span className="lux-value">כל דלת ומסגרת מעוצבות בהתאם לדרישות הלקוח</span>
          </div>
          <div className="lux-field">
            <span className="lux-label">תקנים ובטיחות</span>
            <span className="lux-value">עמידה בתקנים מחמירים של בטיחות ואיכות</span>
          </div>
          <div className="lux-field">
            <span className="lux-label">שירות מקצועי</span>
            <span className="lux-value">ליווי אישי מייעוץ ועד התקנה והגשה</span>
          </div>
        </div>
      </motion.section>

      {/* Contact / Call to Action Section */}
      <motion.section
        className="lux-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2>צרו קשר</h2>
        <p>לפרטים נוספים, ייעוץ או הזמנות, ניתן לפנות אלינו ונשמח ללוות אתכם בכל שלב.</p>
        <button className="btn-primary">ליצירת קשר</button>
      </motion.section>
    </div>
  );
};

export default Home;