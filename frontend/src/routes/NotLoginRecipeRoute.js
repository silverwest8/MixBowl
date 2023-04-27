import { Navigate, Outlet } from "react-router-dom";
const LoginRecipeRoute = () => {
  const token = localStorage.getItem("access_token");
  return token ? <Navigate to={"recipe"} replace /> : <Outlet />;
};

export default LoginRecipeRoute;
