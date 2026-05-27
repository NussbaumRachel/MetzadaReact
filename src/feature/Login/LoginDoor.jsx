
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginDoor.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees,login } from "../Employees/EmployeeSlice";
import { getAllDoors } from "../Doors/DoorsSlice";
import { checkAllLimits } from "../PossibleValues/PossibleValuesSlice";
import { getAllOrders } from "../Orders/OrdersSlice";
import { getAllFrames } from "../Frames/FramesSlice";
import { getAllCustomers } from "../Customers/CustomerSlice";

const LoginDoor = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [open, setOpen] = useState(false);
  const [showSign, setShowSign] = useState(false);
  const navigate = useNavigate(); // ה-navigate
     const statusO = useSelector(state => state.orders.status)
    const statusD = useSelector(state => state.doors.status)
    const statusL = useSelector(state => state.possibleValues.status)
    const statusC = useSelector(state => state.customers.status)
    const statusF = useSelector(state => state.frames.status)
    const statusE = useSelector(state => state.employees.status)   
     const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };
  const dis = useDispatch()
    // useEffect(() => {
    //     const load = async () => {
    //         await dis(getAllEmployees())
    //     };
    //     load();
    // }, []);
    useEffect(() => {
        if (
            statusO === "succeeded" &&
            statusD === "succeeded" &&
            statusL === "succeeded" &&
            statusF === "succeeded" &&
            statusC === "succeeded" &&
            statusE === "succeeded"

        ) {
            setLoading(false);
        }
    }, [statusO, statusD, statusL, statusF, statusC, statusE]);

  const emps = useSelector(state => state.employees.employees) ||[]
  useEffect(() => {
        const load = async () => {
            await dis(getAllDoors());
            await dis(checkAllLimits());
            await dis(getAllOrders());
            await dis(getAllFrames());
            await dis(getAllCustomers())
            await dis(getAllEmployees())
        };

        load();
    }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let emp = emps.find(e => e.password == form.password && e.name == form.username)
  //   if(emp){
  //   setOpen(true); // פתיחת הדלתות
  //   setTimeout(() => setShowSign(true), 1600); // הצגת שלט
  //   setTimeout(() => {
  //     onLogin && onLogin(form); // עדכון מצב loggedIn ב-App
  //     navigate("/"); // מעבר לדף הבית עם URL אמיתי
  //   }, 4000);}
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // קריאה ל-API דרך Redux
    const resultAction = await dis(login(form));
    const userData = resultAction.payload; // כאן נשמר user + token

    if (userData) {
      setOpen(true); // פתיחת הדלתות
      setTimeout(() => setShowSign(true), 1600); // הצגת שלט
      setTimeout(() => {
        onLogin && onLogin(userData.user); // מחזירים פרטי משתמש ל-App
        navigate("/"); // מעבר לדף הבית
      }, 4000);
    }
  } catch (error) {
    console.error("Login failed", error);
    alert("שם משתמש או סיסמה לא נכונים");
  }
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
                name="email"
                placeholder="אימייל"
                value={form.email}
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