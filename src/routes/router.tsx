import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/Layout/RootLayout";
import Brands from "../pages/Brands";
import Categories from "../pages/Categories";
import CreateUser from "../pages/Creations/Users";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Users from "../pages/Users";
import CreateProduct from "../pages/Creations/Products";

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
      { path: "criar-usuario", element: <CreateUser /> },
      { path: "marcas", element: <Brands /> },
      { path: "categorias", element: <Categories /> },
      { path: "produtos", element: <Products /> },
      { path: "criar-produto", element: <CreateProduct /> },

    ],
  },
]);

export { router };

