/**
 * File: Footer.jsx
 * Purpose: Global footer navigation
 * Notes:
 * - Provides brand info and links
 * - Houses social connectivity paths
 */

// ===== IMPORTS =====

import { Link } from 'react-router-dom';

// Internal
import Logo from '../assets/images/logo.webp';
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from '../assets/icons/SocialIcons';
import { LINKS } from '../config/links';
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
              Logo} alt="MECHISMU Logo" />
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
          <Link to={LINKS.routes.about}>About</Link>
          <Link to={LINKS.routes.cars}>Cars</Link>
          <Link to={LINKS.routes.team}>Team</Link>
          <Link to={LINKS.routes.wins}>Wins</Link>
          <Link to={LINKS.routes.projects}>Projects</Link>
          <Link to={LINKS.routes.sponsors}>Sponsors</Link>
          <Link to={LINKS.routes.contact}>Contact</Link>
        </div>

        <div className="footer-right">
          <p className="footer-col-label">Connect</p>
          <div className="footer-socials">
            {LINKS.social.instagram ? (
              <a href={LINKS.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </a>
            ) : (
              <span className="disabled-link" style={{ opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }}><InstagramIcon /></span>
            )}

            {LINKS.social.linkedin ? (
              <a href={LINKS.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon />
              </a>
            ) : (
              <span className="disabled-link" style={{ opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }}><LinkedInIcon /></span>
            )}

            {LINKS.social.youtube ? (
              <a href={LINKS.social.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <YouTubeIcon />
              </a>
            ) : (
              <span className="disabled-link" style={{ opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }}><YouTubeIcon /></span>
            )}
          </div>
          <div className="footer-contact-info">
            <a href="mailto:mechismu@iitism.ac.in" className="footer-email">
              mechismu@iitism.ac.in
            </a>
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