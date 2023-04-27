import { Outlet } from "react-router-dom";
import NotLoginRecipePage from "../pages/NotLoginRecipePage";
const RecipeRoute = () => {
  const token = localStorage.getItem("access_token");
  return token ? <Outlet /> : <NotLoginRecipePage />;
};

export default RecipeRoute;
