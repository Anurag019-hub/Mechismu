/**
 * File: Footer.jsx
 * Purpose: Global footer navigation
 * Notes:
 * - Provides brand info and links
 * - Houses social connectivity paths
 */

// ===== IMPORTS =====
import React from 'react';
import { Link } from 'react-router-dom';

// Internal
import Logo from '@/assets/images/logo.png';
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from '@/assets/icons/SocialIcons.jsx';
import './Footer.css';
// ===== COMPONENT =====
export default function Footer() {
  
  // ===== RENDER =====
  return (
    <footer>
      <div className="footer-inner">

        <div className="footer-brand">
          <Link to="/" className="navlogo">
            {/* <div className="logo-icon">M</div> */}
              <img src={
                Logo} alt="MECHISMU Logo"/>
            <span className="logo-text">MECHISMU <span>RACING</span></span>
          </Link>
          <p className="footer-tagline">RACING IS RELIGION</p>
          <p className="footer-about">
            Formula Student racing team of IIT (ISM) Dhanbad, engineering
            excellence on and off the track since 2012.
          </p>
        </div>

        <div className="footer-links">
          <p className="footer-col-label">Navigate</p>
          <Link to="/about">About</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/team">Team</Link>
          <Link to="/wins">Wins</Link>
          <Link to="/sponsors">Sponsors</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-right">
          <p className="footer-col-label">Connect</p>
          <div className="footer-socials">
            <a to="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </a>
            <a to="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
            </a>
            <a to="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <YouTubeIcon />
            </a>
          </div>
          <div className="footer-contact-info">
            <Link to="mailto:mechismu@iitism.ac.in" className="footer-email">
              mechismu@iitism.ac.in
            </Link>
            <address className="footer-address">
              IIT (ISM) Dhanbad,<br />
              Sardar Patel Nagar,<br />
              Dhanbad, Jharkhand — 826004
            </address>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Mechismu Racing — IIT (ISM) Dhanbad. All rights reserved.</p>
      </div>
    </footer>
  );
}