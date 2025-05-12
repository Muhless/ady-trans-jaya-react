import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
