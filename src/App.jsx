import openai from "openai";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./feature/Header/Header";
import HomePage from "./feature/Home/HomePage";
import AllOrders from "./feature/Orders/allOrders";
import AllDoors from "./feature/Doors/AllDoors";
import AllFrames from "./feature/Frames/AllFrames";
import AllCustomers from "./feature/Customers/AllCustomers";
import LoginDoor from "./feature/Login/LoginDoor";
import CustomerForm from "./feature/Customers/CustomerForm";
import Manager from "./feature/Manager/Manager";
import OrderDetails from "./feature/Orders/OrderDetails";
import AllEmployees from "./feature/Employees/AllEmployees";
import { useSelector } from "react-redux";


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const userRole = useSelector(state => state.employees.user?.role); // נניח שיש לנו תפקיד משתמש
  return (
      <div className="App">
     
        {!loggedIn ? (
          <LoginDoor onLogin={() => setLoggedIn(true)} />
        ) : (
          <>
            <Header /> {/* Header לא צריך Router */}
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/orders" element={<AllOrders />} />
              <Route path="/doors" element={<AllDoors />} />
              <Route path="/frames" element={<AllFrames />} />
              <Route path="/customers" element={<AllCustomers />} />
              <Route path="/add-customer" element={<CustomerForm />} />
              <Route path="/manager" element={<Manager />} roles={["Manager"]} userRole={userRole} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/order-details/:orderId" element={<OrderDetails />} />
              <Route path="/employees" element={<AllEmployees />} />
            </Routes>
          </>
        )}
      </div>
  );
}