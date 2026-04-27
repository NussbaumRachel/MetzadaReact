// import React, { useState, useEffect } from "react";
// import "./LoginDoor.css";

// const LoginDoor = ({ onLogin }) => {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [open, setOpen] = useState(false);
//   const [showSign, setShowSign] = useState(false);
//   const [showHome, setShowHome] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setOpen(true);
//     setTimeout(() => setShowSign(true), 1600); // השלט יורד אחרי פתיחת הדלתות
//     setTimeout(() => {
//       setShowHome(true);
//       onLogin && onLogin(form);
//     }, 4000); // דף הבית מופיע לאחר השלט
//   };

//   return (
//     <div className="login-scene">
//       <div className={`doors-wrapper ${open ? "open" : ""}`}>
//         {/* דלת שמאל */}
//         <div className="door left">
//           <div className="door-inner">
//             <img src={"/pics/logo.png"} className="logo-slot" alt="לוגו מצדה" />
//           </div>
//         </div>

//         {/* דלת ימין */}
//         <div className="door right">
//           <div className="door-inner">
//             <img src={"/pics/logo.png"} className="logo-slot" alt="לוגו מצדה" />
//           </div>
//         </div>

//         {/* טופס המפתח */}
//         {!open && (
//           <div className="key-container">
//             <form onSubmit={handleSubmit} className="key">
//               <input
//                 name="username"
//                 placeholder="שם משתמש"
//                 value={form.username}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 name="password"
//                 type="password"
//                 placeholder="סיסמה"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//               />
//               <button type="submit">כניסה</button>
//             </form>
//           </div>
//         )}

//         {/* שלט יוקרה */}
//         {showSign && (
//           <div className="welcome-sign-wrapper">
//             <div className="welcome-sign">מצדה.  כל הדלתות נפתחות</div>
//           </div>
//         )}

//         {/* דף הבית */}
//         {showHome && <div className="home-page">דף הבית כאן!</div>}
//       </div>
//     </div>
//   );
// };

// export default LoginDoor;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginDoor.css";

const LoginDoor = ({ onLogin }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [open, setOpen] = useState(false);
  const [showSign, setShowSign] = useState(false);
  const navigate = useNavigate(); // ה-navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true); // פתיחת הדלתות
    setTimeout(() => setShowSign(true), 1600); // הצגת שלט
    setTimeout(() => {
      onLogin && onLogin(form); // עדכון מצב loggedIn ב-App
      navigate("/"); // מעבר לדף הבית עם URL אמיתי
    }, 4000);
  };

  return (
    <div className="login-scene">
      <div className={`doors-wrapper ${open ? "open" : ""}`}>
        {/* דלת שמאל */}
        <div className="door left">
          <div className="door-inner">
            <img src={"/pics/logo.png"} className="logo-slot" alt="לוגו" />
          </div>
        </div>

        {/* דלת ימין */}
        <div className="door right">
          <div className="door-inner">
            <img src={"/pics/logo.png"} className="logo-slot" alt="לוגו" />
          </div>
        </div>

        {/* טופס כניסה */}
        {!open && (
          <div className="key-container">
            <form onSubmit={handleSubmit} className="key">
              <input
                name="username"
                placeholder="שם משתמש"
                value={form.username}
                onChange={handleChange}
                required
              />
              <input
                name="password"
                type="password"
                placeholder="סיסמה"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button type="submit">כניסה</button>
            </form>
          </div>
        )}

        {/* שלט יוקרה */}
        {showSign && (
          <div className="welcome-sign-wrapper">
            <div className="welcome-sign">מצדה. כל הדלתות נפתחות</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginDoor;