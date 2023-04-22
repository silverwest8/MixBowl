import { Navigate, Outlet } from "react-router-dom";
const LoginRecipeRoute = () => {
  const token = localStorage.getItem("access_token");
  return token ? <Outlet /> : <Navigate to={"notloginrecipe"} replace />;
};

export default LoginRecipeRoute;
