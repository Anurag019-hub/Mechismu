import React, { Suspense } from "react";
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
const Projects = React.lazy(() => import("./pages/Projects.jsx"));

// ===== ROUTES =====
function AnimatedRoutes() {
    const location = useLocation();

    return (
        <Layout>
            <AnimatePresence mode="wait">
                {loading ? (
                    <PageLoader key="loader" />
                ) : (
                    <Suspense fallback={<PageLoader />}>
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<Home />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/team" element={<TeamPage />} />
                            <Route path="/sponsors" element={<Sponsors />} />
                            <Route path="/cars" element={<Cars />} />
                            <Route path="/wins" element={<Wins />} />
                            <Route path="/projects" element={<Projects />} />
                        </Routes>
                    </Suspense>
                )}
            </AnimatePresence>
        </Layout>
    );
}

// ===== MAIN APP =====
function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AnimatedRoutes />
        </BrowserRouter>
    );
}

export default App;