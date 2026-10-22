import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("invitoAdminToken");

  console.log("AdminProtectedRoute:", {
    hasToken: !!token,
    currentPath: window.location.pathname,
  });

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AdminProtectedRoute;