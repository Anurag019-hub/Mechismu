import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import React, { useEffect, useState, Suspense } from "react";

import Layout from "@/layout/Layout";

import PageLoader from "@/components/ui/pageloader/PageLoader";

import "@/App.css";

// ===== LAZY ROUTES (code-split per page) =====
const Home = React.lazy(() => import("./pages/Home.jsx"));
const Contact = React.lazy(() => import("./pages/Contact.jsx"));
const About = React.lazy(() => import("./pages/about/About.jsx"));
const TeamPage = React.lazy(() => import("./features/team/pages/TeamPage.jsx"));
const Sponsors = React.lazy(() => import("./pages/Sponsors.jsx"));
const Cars = React.lazy(() => import("./pages/Cars.jsx"));
const Wins = React.lazy(() => import("./pages/Wins.jsx"));

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