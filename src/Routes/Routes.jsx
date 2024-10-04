import { Outlet, createBrowserRouter } from "react-router-dom";
import LoginPage from "../Components/Login/login";
import Product from "../Components/product";
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/product",
    element: <Product />,
  },
]);

export { Routes };
