import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import './Philosophy.css';
import logoImg from '../../assets/images/team_photo.webp';

export default function Philosophy() {
  const imgRef = useRef(null);
  const isInView = useInView(imgRef, { once: true, margin: "-100px" });

  return (
    <section className="philosophy-section">

      <div className="philosophy-container">
        <div className="philosophy-grid">

          {/* TEXT */}
          <motion.div
            className="philosophy-text"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="philosophy-title">
              WHO WE <span>ARE</span>
            </h2>

            <div className="philosophy-line"></div>

            <p>
              We are a collective of driven engineers pushing boundaries of performance,
              innovation, and execution under pressure.
            </p>

            <p>
              Every year, we design and manufacture a Formula-style electric race car,
              competing against top universities worldwide.
            </p>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            ref={imgRef}
            className={`img-container ${isInView ? 'active' : ''}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img src={logoImg} alt="Team philosophy" />

            <div className="img-overlay"></div>
            <div className="img-glow"></div>
            <div className="img-border"></div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}