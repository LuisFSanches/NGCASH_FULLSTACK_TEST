import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";
import { Dashboard } from "./pages/Dashboard";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

interface IPrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: IPrivateRouteProps) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) {
    return null;
  }
  return isAuthenticated ? children : <Navigate to="/" />;
}

function IsAuthenticatedRoutes({ children }: IPrivateRouteProps) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) {
    return null;
  }
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
}

export default function routes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <IsAuthenticatedRoutes>
                <SignIn />
              </IsAuthenticatedRoutes>
            }
          />
          <Route
            path="/cadastro"
            element={
              <IsAuthenticatedRoutes>
                <SignUp />
              </IsAuthenticatedRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
