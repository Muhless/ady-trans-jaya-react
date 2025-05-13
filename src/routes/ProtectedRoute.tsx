import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";
import Spinner from "../components/Spinner";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <Spinner />;
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
