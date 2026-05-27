// CustomerForm.jsx

import { useState, useEffect, use } from "react";
import { useLocation } from "react-router-dom";
// import Modal from "../Modals/Modal";
import {Modal} from "../Modals/modal.css";
import { useDispatch, useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// // import Modal from "../Modals/Modal";
// import {Modal} from "../Modals/modal.css";
// import { useDispatch } from "react-redux";
// import { createCustomer, updateCustomer } from "./CustomerSlice";
// import { de, fr, no } from "zod/v4/locales";
// export default function CustomerForm({ existing, onSave, defaultName = "" }) {
// const location = useLocation();
// const dispatch = useDispatch();
// const [form, setForm] = useState({
//     id: "",
//     name: defaultName,
//     phone: "",
//     email: "",
//     address: "",
//     status: "",
//     contactPersonPhone: "",
//     contactPersonName: "",
//     cn: "",
//     notes: ""
//   });
// const addCustomer = (form) => {
//   const newCustomer = {
//   ...form,
//    id: form.id ? form.id : (Date.now() % 1000000000).toString(), // יצירת ID ייחודי אם אין ID קיים, מבצע מודולו כדי לקבל מספר באורך 9 תווים
//   notes: form.notes || "",
//   };
//   debugger;
//   !form.id ? dispatch(createCustomer(newCustomer)) : dispatch(updateCustomer(newCustomer));

//   onSave(newCustomer); // כאן שולחים את הלקוח החדש, לא false??????????????????????????????????????????
// };

//   useEffect(()=>{
//     if(existing) setForm(existing);
//   },[]);

//   const handleChange = (e)=>{
//     setForm({...form,[e.target.name]:e.target.value});
//   };

//   return (
//     <div>
//       <h2>{form.id ? "עריכת לקוח" : "לקוח חדש"}</h2>
//       <label>שם</label>
//       {/* validate={[{ required: true, message: "נא להזין שם" }]} */}
//       <input name="name" value={form.name} onChange={handleChange} placeholder="שם"/>
//       <label>טלפון</label>
//       {/* validate={[{ required: true, message: "נא להזין טלפון" }]} */}
//       <input name="phone" value={form.phone} onChange={handleChange} placeholder="טלפון"/>
//       <label>אימייל</label>
//       {/* validate={[{ required: true, message: "נא להזין אימייל" }]} */}
//       <input name="email" value={form.email} onChange={handleChange} placeholder="אימייל"/>
//       <label>כתובת</label>
//       <input name="address" value={form.address} onChange={handleChange} placeholder="כתובת"/>
//       <label>איש קשר</label>
//       <input name="contactPersonName" value={form.contactPersonName} onChange={handleChange} placeholder="שם איש קשר"/>
//       <label>טלפון איש קשר</label>
//       <input name="contactPersonPhone" value={form.contactPersonPhone} onChange={handleChange} placeholder="טלפון איש קשר"/>
//       <label>מספר זיהוי</label>
//       {/* validate={[{ required: true, message: "נא להזין מספר זיהוי" }]} */}
//       <input name="cn" value={form.cn} onChange={handleChange} placeholder="מספר זיהוי" required/>
//       {/* <input name="notes" value={form.notes} onChange={handleChange} placeholder="הערות"/> */}

//       <button onClick={()=>addCustomer(form)}>שמור</button>
//     </div>
//   );
// }












// CustomerForm.jsx

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCustomer, updateCustomer } from "./CustomerSlice";

export default function CustomerForm({ existing, onSave, defaultName = "" }) {

const location = useLocation();
const dispatch = useDispatch();

const [form, setForm] = useState({
    id: "",
    name: defaultName,
    phone: "",
    email: "",
    address: "",
    status: "",
    contactPersonPhone: "",
    contactPersonName: "",
    cn: "",
    notes: ""


  
  
});

const [errors, setErrors] = useState({});

useEffect(() => {
    if (existing) {
        setForm(existing);
    }
}, []);

const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
        ...form,
        [name]: value
    });

    setErrors(prev => ({
        ...prev,
        [name]: ""
    }));
};

function validateForm() {

    const newErrors = {};

    // שם
    if (!form.name.trim()) {
        newErrors.name = "יש להזין שם";
    }

    // טלפון
    if (!form.phone.trim()) {
        newErrors.phone = "יש להזין טלפון";
    }
    else if (!/^0\d{8,9}$/.test(form.phone)) {
        newErrors.phone = "מספר טלפון לא תקין";
    }

    // אימייל
    if (!form.email.trim()) {
        newErrors.email = "יש להזין אימייל";
    }
    else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
        newErrors.email = "כתובת אימייל לא תקינה";
    }

    // מספר זיהוי
    if (!form.cn.trim()) {
        newErrors.cn = "יש להזין מספר זיהוי";
    }
    else if (!/^\d{5,15}$/.test(form.cn)) {
        newErrors.cn = "מספר זיהוי לא תקין";
    }

    // איש קשר
    if (
        form.contactPersonPhone &&
        !/^0\d{8,9}$/.test(form.contactPersonPhone)
    ) {
        newErrors.contactPersonPhone = "טלפון איש קשר לא תקין";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
}

const addCustomer = () => {

    if (!validateForm()) {
        return;
    }
    const employeeId = useSelector(state => state.employees.user.id);
    const newCustomer = {
        ...form,
        id: form.id
            ? form.id
            : (Date.now() % 1000000000).toString(),

        notes: form.notes || "",
        createdAt: form.createdAt || new Date().toISOString(),
        employeeId: form.employeeId || employeeId,
    };

    !form.id
        ? dispatch(createCustomer(newCustomer))
        : dispatch(updateCustomer(newCustomer));

    onSave(newCustomer);
};

return (
    <>
    <style>{`
    .customer-form{
        display:flex;
        flex-direction:column;
        gap:14px;
        direction:rtl;
    }
    .customer-form h2{
        margin-bottom:10px;
        color:#fff;
    }
    .customer-form label{
        font-size:14px;
        color:#d6d6d6;
        margin-bottom:-8px;
    }
    .customer-form input{
        height:48px;
        border-radius:14px;
        border:1px solid rgba(255,255,255,0.08);
        background:#1e1e25;
        color:white;
        padding:0 14px;
        font-size:14px;
        transition:0.25s;
    }
    .customer-form input:focus{
        outline:none;
        border-color:#5f7740;
        box-shadow:0 0 0 4px rgba(95,119,64,0.18);
    }
    .customer-form input.error-input{
        border-color:#a63d4d;
        background:#2a161b;
    }
    .error-text{
        color:#ff8f9c;
        font-size:12px;
        margin-top:-8px;
    }
    .save-btn{
        margin-top:10px;
        height:50px;
        border:none;
        border-radius:16px;
        background:linear-gradient(135deg,#6b1f2f,#5f7740);
        color:white;
        font-size:15px;
        font-weight:bold;
        cursor:pointer;
        transition:0.3s;
    }
    .save-btn:hover{
        transform:translateY(-2px);
        box-shadow:0 10px 20px rgba(0,0,0,0.25);
    }
    `}</style>
    <div className="customer-form">
        <h2>
            {form.id ? "עריכת לקוח" : "לקוח חדש"}
        </h2>
        <label>שם</label>
        <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="שם"
            className={errors.name ? "error-input" : ""}
        />
        {errors.name && (
            <span className="error-text">{errors.name}</span>
        )}
        <label>טלפון</label>
        <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="טלפון"
            className={errors.phone ? "error-input" : ""}
        />
        {errors.phone && (
            <span className="error-text">{errors.phone}</span>
        )}
        <label>אימייל</label>
        <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="אימייל"
            className={errors.email ? "error-input" : ""}
        />
        {errors.email && (
            <span className="error-text">{errors.email}</span>
        )}
        <label>כתובת</label>
        <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="כתובת"
        />
        <label>איש קשר</label>
        <input
            name="contactPersonName"
            value={form.contactPersonName}
            onChange={handleChange}
            placeholder="שם איש קשר"
        />
        <label>טלפון איש קשר</label>
        <input
            name="contactPersonPhone"
            value={form.contactPersonPhone}
            onChange={handleChange}
            placeholder="טלפון איש קשר"
            className={errors.contactPersonPhone ? "error-input" : ""}
        />
        {errors.contactPersonPhone && (
            <span className="error-text">
                {errors.contactPersonPhone}
            </span>
        )}
        <label>מספר זיהוי</label>
        <input
            name="cn"
            value={form.cn}
            onChange={handleChange}
            placeholder="מספר זיהוי"
            className={errors.cn ? "error-input" : ""}
        />
        {errors.cn && (
            <span className="error-text">{errors.cn}</span>
        )}
        <button
            className="save-btn"
            onClick={addCustomer}
        >
            שמור
        </button>
    </div>
    </>
);
}