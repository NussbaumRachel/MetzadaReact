// CustomerForm.jsx
import { useState, useEffect } from "react";

export default function CustomerForm({ existing, onSave }) {

  const [form, setForm] = useState({
    id: null,
    name: "",
    phone: "",
    email: ""
  });

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

      <button onClick={()=>onSave(form)}>שמור</button>
    </div>
  );
}