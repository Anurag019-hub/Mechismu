import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'motion/react';
import ScrollToTop from "./ScrollToTop.jsx";

// Layout
import Layout from "./layout/Layout.jsx";

// UI
import PageLoader from "./components/ui/PageLoader/PageLoader.jsx";

import "../src/App.css";

// ===== LAZY ROUTES =====
const Home = React.lazy(() => import("../src/pages/Home.jsx"));
const Contact = React.lazy(() => import("../src/pages/Contact.jsx"));
const About = React.lazy(() => import("../src/pages/about/About.jsx"));
const TeamPage = React.lazy(() => import("../src/features/team/pages/TeamPage.jsx"));
const Sponsors = React.lazy(() => import("../src/pages/Sponsors.jsx"));
const Cars = React.lazy(() => import("../src/pages/Cars.jsx"));
const Wins = React.lazy(() => import("../src/pages/Wins.jsx"));

function AnimatedRoutes() {
    const location = useLocation();

    const [displayLocation, setDisplayLocation] = useState(location);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (location.pathname !== displayLocation.pathname) {
            setIsTransitioning(true);

            const timer = setTimeout(() => {
                setDisplayLocation(location);
                setIsTransitioning(false);
            }, 600); // 🔥 smooth timing (500–700 ideal)

            return () => clearTimeout(timer);
        }
    }, [location, displayLocation]);

    return (
        <>
            {/* SINGLE loader */}
            <AnimatePresence mode="wait">
                {isTransitioning && <PageLoader key="route-loader" />}
            </AnimatePresence>

            {/* Page content */}
            <AnimatePresence mode="wait">
                {!isTransitioning && (
                    <Layout key={displayLocation.pathname}>
                        <Suspense fallback={null}>
                            <Routes location={displayLocation}>
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
                )}
            </AnimatePresence>
        </>
    );
}

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000); // initial load
        return () => clearTimeout(timer);
    }, []);

    return (
        <BrowserRouter>
            <ScrollToTop />

            {/* Initial app loader */}
            <AnimatePresence mode="wait">
                {loading && <PageLoader key="initial-loader" />}
            </AnimatePresence>

            {/* App */}
            {!loading && <AnimatedRoutes />}
        </BrowserRouter>
    );
}

export default App;