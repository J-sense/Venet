import { type ReactNode } from "react";
import { Navigate, useLocation, Outlet } from "react-router";
import { useAppSelector } from "@/redux/hooks";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";

interface PrivateRouteProps {
  children?: ReactNode;
  allowedRole?: "USER" | "EXPERT" | string;
}

export const PrivateRoute = ({ children, allowedRole }: PrivateRouteProps) => {
  const token =
    useAppSelector(selectCurrentToken) || localStorage.getItem("token");
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  // 1. Check Authentication Status
  if (!token) {
    const loginRedirect =
      allowedRole === "EXPERT" ? "/auth/login" : "/auth/login";
    return <Navigate to={loginRedirect} state={{ from: location }} replace />;
  }

  // 2. Role-Based Access Control (if allowedRole is specified and user role is known)
  if (allowedRole && user?.role) {
    const userRole = String(user.role).toUpperCase();
    const requiredRole = String(allowedRole).toUpperCase();

    if (userRole !== requiredRole) {
      if (userRole === "EXPERT") {
        return <Navigate to="/dashboard/experts" replace />;
      }
      return <Navigate to="/dashboard/user" replace />;
    }
  }

  // 3. Authenticated and Authorized
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
