import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ToastContainer } from "react-toastify";
import { useContexts } from "./hooks/useContexts";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import './styles/globals.scss'
import { useEffect } from "react";
import { baseApi } from "../services/api";


function App() {
  const { isActiveLoading, setIsActiveLoading, textLoading, setTextLoading} = useContexts();

  useEffect(() => {
    const fetchStarted = async () => {
      setTextLoading('Atualizando o sistema.')
      setIsActiveLoading(true);

      await baseApi.get('')

      setIsActiveLoading(false);
      setTextLoading("Carregando ...")
    }

    fetchStarted()
  }, [setIsActiveLoading, setTextLoading])

  return (
    <LoadingOverlayWrapper
      active={isActiveLoading}
      spinner
      text={textLoading}
    >
      <ToastContainer autoClose={3000} />
      <RouterProvider router={router} />
    </LoadingOverlayWrapper>
  );
}

export default App;
