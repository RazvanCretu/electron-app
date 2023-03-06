import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="login" replace />;
  }
};

export default ProtectedLayout;
