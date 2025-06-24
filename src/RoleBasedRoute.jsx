import { Navigate, Outlet } from "react-router-dom";

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const userRole = localStorage.getItem("role");
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

export default RoleBasedRoute;
