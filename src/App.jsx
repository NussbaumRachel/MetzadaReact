//  // src/App.jsx
// import React, { useState } from "react";
// import Header from "./feature/Header/Header";
// import HomePage from "./feature/Home/HomePage";
// import AllOrders from "./feature/Orders/allOrders";
// import AllDoors from "./feature/Doors/AllDoors";
// import AllFrames from "./feature/Frames/AllFrames";
// // import AllCustomers from "./feature/Customers/AllCustomers";

// export default function App() {
//   const [activePage, setActivePage] = useState("home");

//   const renderPage = () => {
//     switch(activePage) {
//       case "home": return <HomePage />;
//       case "orders": return <AllOrders />;
//       case "doors": return <AllDoors />;
//       case "frames": return <AllFrames />;
//       // case "customers": return <AllCustomers />;
//       default: return <HomePage />;
//     }
//   }

//   return (
//     <div className="App">
//       <Header activePage={activePage} setActivePage={setActivePage} />
//       {renderPage()}
//     </div>
//   );
// }
// src/App.jsx
import React, { useState } from "react";
import Header from "./feature/Header/Header";
import HomePage from "./feature/Home/HomePage";
import AllOrders from "./feature/Orders/allOrders";
import AllDoors from "./feature/Doors/AllDoors";
import AllFrames from "./feature/Frames/AllFrames";
import LoginDoor from "./feature/Login/LoginDoor";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    switch(activePage) {
      case "home": return <HomePage />;
      case "orders": return <AllOrders />;
      case "doors": return <AllDoors />;
      case "frames": return <AllFrames />;
      default: return <HomePage />;
    }
  }

  return (
    <div className="App">
      {!loggedIn ? (
        <LoginDoor onLogin={() => setLoggedIn(true)} />
      ) : (
        <>
          <Header activePage={activePage} setActivePage={setActivePage} />
          {renderPage()}
        </>
      )}
    </div>
  );
}