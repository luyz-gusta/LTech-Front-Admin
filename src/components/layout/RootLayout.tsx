import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <section>
            <nav>Teste</nav>
            <main>
                <header>Header</header>
                <Outlet />
            </main>
        </section>
    )
}