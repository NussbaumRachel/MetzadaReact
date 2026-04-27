// import React, { useState } from "react";
// import Header from "./feature/Header/Header";
// import HomePage from "./feature/Home/HomePage";
// import AllOrders from "./feature/Orders/allOrders";
// import AllDoors from "./feature/Doors/AllDoors";
// import AllFrames from "./feature/Frames/AllFrames";
// import AllCustomers from "./feature/Customers/AllCustomers";
// import LoginDoor from "./feature/Login/LoginDoor";

// export default function App() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [activePage, setActivePage] = useState("home");

//   const renderPage = () => {
//     switch(activePage) {
//       case "home": return <HomePage />;
//       case "orders": return <AllOrders />;
//       case "doors": return <AllDoors />;
//       case "frames": return <AllFrames />;
//       case "customers": return <AllCustomers />;
//       default: return <HomePage />;
//     }
//   }

//   return (
//     <div className="App">
//       {!loggedIn ? (
//         <LoginDoor onLogin={() => setLoggedIn(true)} />
//       ) : (
//         <>
//           <Header activePage={activePage} setActivePage={setActivePage} />
//           {renderPage()}
//         </>
//       )}
//       {/* <AllCustomers></AllCustomers> */}
//     </div>
//   );
// }
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./feature/Header/Header";
import HomePage from "./feature/Home/HomePage";
import AllOrders from "./feature/Orders/allOrders";
import AllDoors from "./feature/Doors/AllDoors";
import AllFrames from "./feature/Frames/AllFrames";
import AllCustomers from "./feature/Customers/AllCustomers";
import LoginDoor from "./feature/Login/LoginDoor";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </>
        )}
      </div>
  );
}