import { Outlet, createBrowserRouter } from "react-router-dom";
import LoginPage from "../Components/Login/login";
import Product from "../Components/product";
import ProductDetails from "../Components/productdetails";
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "product",
        element: <Product />,
        index: true,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

export { Routes };
