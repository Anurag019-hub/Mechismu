import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

// Components
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx"; // ← requires rename

import "./Layout.css";

export default function Layout({ children }) {
    const location = useLocation();

    return (
        <>
            <Navbar />
            <main className="child">{children}</main>
            <Footer />
        </>
    );
}
