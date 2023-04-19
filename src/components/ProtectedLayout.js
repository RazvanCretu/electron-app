import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
