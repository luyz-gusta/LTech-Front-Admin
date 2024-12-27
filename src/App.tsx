import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import './styles/globals.scss'


function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
