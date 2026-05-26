// CustomerForm.jsx
import { useState, useEffect, use } from "react";
import { useLocation } from "react-router-dom";
// import Modal from "../Modals/Modal";
import {Modal} from "../Modals/modal.css";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer, updateCustomer } from "./CustomerSlice";
import { de, fr, no } from "zod/v4/locales";
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
  const employeeId = useSelector(state => state.employees.user.id);
const addCustomer = (form) => {
  
  const newCustomer = {
  ...form,
   id: form.id ? form.id : (Date.now() % 1000000000).toString(), // יצירת ID ייחודי אם אין ID קיים, מבצע מודולו כדי לקבל מספר באורך 9 תווים
  notes: form.notes || "",
  createdAt: form.createdAt || new Date().toISOString(),
  employeeId: form.employeeId || employeeId, 
  };
  debugger;
  !form.id ? dispatch(createCustomer(newCustomer)) : dispatch(updateCustomer(newCustomer));

  onSave(newCustomer); // כאן שולחים את הלקוח החדש, לא false
};

  useEffect(()=>{
    if(existing) setForm(existing);
  },[]);

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  return (
    <div>
      <h2>{form.id ? "עריכת לקוח" : "לקוח חדש"}</h2>

      <input name="name" value={form.name} onChange={handleChange} placeholder="שם"/>
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="טלפון"/>
      <input name="email" value={form.email} onChange={handleChange} placeholder="אימייל"/>
      <input name="address" value={form.address} onChange={handleChange} placeholder="כתובת"/>
      <input name="contactPersonName" value={form.contactPersonName} onChange={handleChange} placeholder="שם איש קשר"/>
      <input name="contactPersonPhone" value={form.contactPersonPhone} onChange={handleChange} placeholder="טלפון איש קשר"/>
      <input name="cn" value={form.cn} onChange={handleChange} placeholder="מספר זיהוי" required/>
      {/* <input name="notes" value={form.notes} onChange={handleChange} placeholder="הערות"/> */}

      <button onClick={()=>addCustomer(form)}>שמור</button>
    </div>
  );
}