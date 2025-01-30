import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import Header from "../Header";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userStorage");
    if (!storedUser) {

      toast.info("Realize o login novamente para acessar o sistema.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <section className="containerAdmin">
      <NavBar />
      <main>
        <Header />
        <Outlet />
      </main>
    </section>
  );
}
