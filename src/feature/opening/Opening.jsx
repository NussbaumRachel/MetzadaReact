 import { useState, useContext } from "react"

 export default function Opening() {
    const [active, setActive] = useState("הזמנות");
      const menuItems = ["הזמנות", "דלתות", "משקופים", "לקוחות"];
  
    return (
  
  
  
   
     <div className="page-content">
    <header className="header"> <div className="logo-area"> <div className="logo-placeholder"> לוגו<br />מצדה </div>
        <div className="site-title">מצדה - ניהול מפעל דלתות</div> </div>
        <nav className="nav-menu"> {menuItems.map((item) => 
            (<div key={item} className={`nav-item ${active === item ? "active" : ""}`} onClick={() => setActive(item)} > {item} </div>))} </nav>
</header>













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
  );
}
