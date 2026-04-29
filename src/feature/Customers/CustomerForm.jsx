// CustomerForm.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { createCustomer, updateCustomer } from "./CustomerSlice";
import { no } from "zod/v4/locales";
export default function CustomerForm({ existing, onSave }) {
const location = useLocation();
const dispatch = useDispatch();
const defaultName = location.state?.name || "";
  const [form, setForm] = useState({
    id: null,
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
const addCustomer = (form) => {
 const newCustomer = {
   ...form,
   notes: form.notes || "",
   isActive: true
 };
 !form.id ? dispatch(createCustomer(form)) : dispatch(updateCustomer(form));

  // onSave(false);
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
      <input name="cn" value={form.cn} onChange={handleChange} placeholder="מספר זיהוי"/>
      {/* <input name="notes" value={form.notes} onChange={handleChange} placeholder="הערות"/> */}

      <button onClick={()=>addCustomer(form)}>שמור</button>
    </div>
  );
}