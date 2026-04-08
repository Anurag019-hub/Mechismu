import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";

import ScrollToTop from "./ScrollToTop.jsx";
import Layout from "./layout/Layout.jsx";
import PageLoader from "./components/ui/PageLoader/PageLoader.jsx";

import "./App.css";

// ===== LAZY ROUTES =====
const Home = React.lazy(() => import("./pages/Home.jsx"));
const Contact = React.lazy(() => import("./pages/Contact.jsx"));
const About = React.lazy(() => import("./pages/about/About.jsx"));
const TeamPage = React.lazy(() => import("./features/team/pages/TeamPage.jsx"));
const Sponsors = React.lazy(() => import("./pages/Sponsors.jsx"));
const Cars = React.lazy(() => import("./pages/Cars.jsx"));
const Wins = React.lazy(() => import("./pages/Wins.jsx"));


// ===== MIN LOADER WRAPPER (optional smoothness) =====
function DelayedRender({ children, delay = 500 }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return show ? children : <PageLoader />;
}


// ===== ROUTES WITH ANIMATION =====
function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Layout key={location.pathname}>
                <Suspense fallback={<PageLoader />}>
                    <DelayedRender delay={500}>
                        <Routes location={location}>
                            <Route path="/" element={<Home />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/team" element={<TeamPage />} />
                            <Route path="/sponsors" element={<Sponsors />} />
                            <Route path="/cars" element={<Cars />} />
                            <Route path="/wins" element={<Wins />} />
                        </Routes>
                    </DelayedRender>
                </Suspense>
            </Layout>
        </AnimatePresence>
    );
}


// ===== MAIN APP =====
function App() {
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setInitialLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <BrowserRouter>
            <ScrollToTop />

            <AnimatePresence mode="wait">
                {initialLoading ? (
                    <PageLoader key="initial-loader" />
                ) : (
                    <AnimatedRoutes />
                )}
            </AnimatePresence>
        </BrowserRouter>
    );
}

export default App;