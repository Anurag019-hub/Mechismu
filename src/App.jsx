import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import React, { useEffect, useState, Suspense } from "react";

import Layout from "../src/layout/Layout.jsx";

import PageLoader from "../src/components/ui/pageloader/PageLoader.jsx";

import "../src/App.css";

// ===== LAZY ROUTES (code-split per page) =====
const Home = React.lazy(() => import("../src/pages/Home.jsx"));
const Contact = React.lazy(() => import("../src/pages/Contact.jsx"));
const About = React.lazy(() => import("../src/pages/about/About.jsx"));
const TeamPage = React.lazy(() => import("../src/features/team/pages/TeamPage.jsx"));
const Sponsors = React.lazy(() => import("../src/pages/Sponsors.jsx"));
const Cars = React.lazy(() => import("../src/pages/Cars.jsx"));
const Wins = React.lazy(() => import("../src/pages/Wins.jsx"));

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Layout key={location.pathname}>
                <Suspense fallback={<PageLoader />}>
                    <Routes location={location}>
                        <Route path="/" element={<Home />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/team" element={<TeamPage />} />
                        <Route path="/sponsors" element={<Sponsors />} />
                        <Route path="/cars" element={<Cars />} />
                        <Route path="/wins" element={<Wins />} />
                    </Routes>
                </Suspense>
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
            <AnimatePresence mode="wait">
                {loading && <PageLoader key="initial-loader" />}
            </AnimatePresence>
            {!loading && <AnimatedRoutes />}
        </BrowserRouter>
    );
}

export default App;