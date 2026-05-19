// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// props:
// - children: הקומפוננטה שמוגנת
// - userRole: תפקיד המשתמש הנוכחי
// - allowedRoles: מערך תפקידים שמורשים לגשת
// - loggedIn: האם המשתמש מחובר
const ProtectedRoute = ({ children, userRole, allowedRoles, loggedIn }) => {
  // אם המשתמש לא מחובר – נשלח אותו ל-login
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  // אם המשתמש מחובר אבל אין לו הרשאה – נשלח אותו לדף בית
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/home" replace />;
  }

  // אם הכול תקין – מציגים את הקומפוננטה
  return children;
};

export default ProtectedRoute;