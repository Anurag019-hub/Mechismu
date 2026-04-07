import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/layout/Layout.css";

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
