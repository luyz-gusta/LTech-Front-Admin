import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import Header from "../Header";

export default function RootLayout() {
    return (
        <section className="containerAdmin">
            <NavBar />
            <main>
                <Header />
                <Outlet />
            </main>
        </section>
    )
}