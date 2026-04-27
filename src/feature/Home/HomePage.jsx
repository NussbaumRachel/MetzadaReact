import "./HomePage.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="home-pro">

      {/* HERO */}
      <section className="hero-pro">
        <motion.div
          className="hero-bg"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🚪 דלתות מצדה
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          חוויית דלתות יוקרה בעיצוב חדשני
        </motion.p>

        <motion.div
          className="cta-buttons"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button className="gold">התחל פרויקט</button>
          <button className="dark">צפה בקטלוג</button>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="stats-pro">
        {[
          ["🔥", "12,000+ דלתות"],
          ["🏭", "25 שנות ניסיון"],
          ["⭐", "לקוחות מרוצים"]
        ].map((s, i) => (
          <motion.div
            key={i}
            className="stat-pro"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span>{s[0]}</span>
            <b>{s[1]}</b>
          </motion.div>
        ))}
      </section>

      {/* PARALLAX SHOWCASE */}
      <section className="showcase">
        <motion.div
          className="door-card"
          whileHover={{ rotateY: 10, scale: 1.05 }}
        >
          🚪 דלת מודרנית שחורה
        </motion.div>

        <motion.div
          className="door-card gold"
          whileHover={{ rotateY: -10, scale: 1.05 }}
        >
          ✨ דלת יוקרה זהב
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="features-pro">
        {["עיצוב אישי", "בטיחות גבוהה", "ייצור מהיר", "חומרים פרימיום"].map((f, i) => (
          <motion.div
            key={i}
            className="feature-card"
            whileHover={{ y: -10, scale: 1.02 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            {f}
          </motion.div>
        ))}
      </section>

      {/* GALLERY 3D */}
      <section className="gallery-pro">
        {[1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            className="img-pro"
            whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05 }}
          />
        ))}
      </section>

      {/* FINAL CTA */}
      <motion.section
        className="cta-pro"
        whileInView={{ scale: 1 }}
        initial={{ scale: 0.9 }}
      >
        <h2>רוצה דלת ברמה אחרת?</h2>
        <button>📞 דבר איתנו עכשיו</button>
      </motion.section>

    </div>
  );
}