import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import Users from "../pages/Users";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/admin",
    element: <RootLayout />,
    children: [
      { index: true, element: <Users /> },
    ],
  },

]);

export { router };