/**
 * File: Navbar.jsx
 * Purpose: Main navigation bar
 * Notes:
 * - Handles routing links and active states
 * - Includes responsive mobile glass menu
 */

// ===== IMPORTS =====
// React
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Internal
import logo from '../assets/images/logo.webp';
import './navbar.css';

// ===== COMPONENT =====
function Navbar() {
  // ===== STATE =====
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ===== CONFIG =====

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/cars", label: "Cars" },
    { path: "/team", label: "Team" },
    { path: "/wins", label: "Wins" },
    { path: "/projects", label: "Projects" },
    { path: "/sponsors", label: "Sponsors" },
    { path: "/contact", label: "Contact" }
  ];

  // ===== RENDER =====
  return (
    <>
      <nav className="nav-glass">
        <div className="nav-inner">

          {/* LEFT */}
          <div className="logo-wrap">
            <img src={logo} alt="logo" />
          </div>

          {/* RIGHT */}
          <div className="nav-right">
            <div className="nav-links">
              {links.map((item, i) => (
                <NavLink
                  key={i}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <button
              className={`hamburger ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE */}
      <div className={`mobile-glass ${isMenuOpen ? 'open' : ''}`}>

        <button
          className="close-btn"
          onClick={() => setIsMenuOpen(false)}
        >
          ✕
        </button>

        {links.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className="mob-item"
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </>
  )
}

export default Navbar