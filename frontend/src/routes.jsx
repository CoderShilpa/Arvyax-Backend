import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import MySessions from "./pages/MySessions";
import SessionEditor from "./pages/SessionEditor";

// Optional: Fallback component for unknown routes
const NotFound = () => <h2 style={{ padding: "2rem", color: "red" }}>404 - Page Not Found</h2>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: <AuthPage />
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "my-sessions", element: <MySessions /> },
      { path: "create", element: <SessionEditor /> },
      { path: "edit/:id", element: <SessionEditor /> }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
