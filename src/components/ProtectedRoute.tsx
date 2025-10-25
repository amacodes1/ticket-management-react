import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};
