import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import Header from "../Header";
import { useEffect } from "react";
import { useContexts } from "../../hooks/useContexts";
import { toast } from "react-toastify";

export default function RootLayout() {
  const { user } = useContexts();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.info("Realize o login novamente para acessar o sistema.");
      navigate("/");
    }
  }, [user, navigate]);

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
