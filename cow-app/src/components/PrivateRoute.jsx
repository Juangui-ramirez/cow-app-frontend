import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const token = sessionStorage.getItem("token");
  return !!token;
};

export function PrivateRoute() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/unauthorized" />;
}
