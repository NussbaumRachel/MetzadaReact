import { useSelector, useDispatch } from 'react-redux'
import { useState, useContext } from "react"
import './HomePage.css';
import axios from 'axios'
function HomePage() {
    const [active, setActive] = useState("הזמנות");
    const menuItems = ["הזמנות", "דלתות", "משקופים", "לקוחות"];


    return (<div>
         <main className="hero">
            <div className="hero-inner">
                <div className="hero-tag"> <span className="hero-tag-dot" />
                    <span>מערכת ניהול חכמה לפס ייצור הדלתות</span> </div> <h1 className="hero-title">
                    <span>ברוכים הבאים ל</span>{" "} <span className="hero-highlight">מצדה</span> </h1>
                <p className="hero-subtitle"> פלטפורמת ניהול יוקרתית למפעל דלתות – מעקב מדויק אחרי{" "}
                    <strong>הזמנות, דלתות, משקופים ולקוחות</strong> בממשק שחור־זהב אלגנטי, המותאם לעבודה שוטפת של מנהלי הייצור והמשרד. </p>
                <div className="hero-actions"> <button className="btn-primary"> יצירת הזמנה חדשה </button> <button className="btn-secondary"> צפייה בכל ההזמנות </button> </div>
                <div className="section-box">
                    <h2 className="section-title">מה מחכה לך במערכת מצדה?</h2>
                    <p className="section-text"> בתפריט העליון תוכל לעבור בין מסכי הניהול המרכזיים של המפעל: הזמנות פעילות, קטלוג הדלתות, משקופים ופרטי הלקוחות. כאן בדף הבית תוכל להציג סטטוס ייצור, התראות חשובות ופעולות מהירות – ובהמשך תוכל להרחיב כל מסך בריאקט לפי צרכי המפעל. </p>
                </div>
            </div>
            <img src={"/pics/d2.png"} />
            {/* <section className="production-timeline"> <h2>מסלול הייצור במצדה</h2> <p className="timeline-subtitle"> מהזמנה ועד אספקה – כל שלב בפס הייצור של הדלתות שלך. </p> <div className="timeline-track"> {["תכנון", "חיתוך", "צביעה", "הרכבה", "בדיקת איכות", "אספקה"].map((step, index) => (<div key={step} className="timeline-step"> <div className="timeline-dot" /> <div className="timeline-label">{step}</div> </div>))} <div className="timeline-glow" /> </div> </section> */}
        </main>
    </div>);
}



export default HomePage;
