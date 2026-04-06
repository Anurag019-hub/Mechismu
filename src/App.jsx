import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

import Layout from "./layout/Layout";
import Preloader from "./components/Preloader/Preloader.jsx";

import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/about/About.jsx";
import Team from "./pages/Team.jsx";

import "./App.css";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Layout key={location.pathname}>
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/team" element={<Team />} />
                </Routes>
            </Layout>
        </AnimatePresence>
    );
}

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <BrowserRouter>
            {loading && <Preloader />}
            {!loading && <AnimatedRoutes />}
        </BrowserRouter>
    );
}

export default App;