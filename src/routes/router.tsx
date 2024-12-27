import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/Layout/RootLayout";
import Users from "../pages/Users";
import Login from "../pages/Login";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import Brands from "../pages/Brands";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <RootLayout />,
    children: [
      { index: true, element: <Users /> },
      { path: "marcas", element: <Brands /> },
      { path: "categorias", element: <Categories /> },
      { path: "produtos", element: <Products /> },
    ],
  },
]);

export { router };
