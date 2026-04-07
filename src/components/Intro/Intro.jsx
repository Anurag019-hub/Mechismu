
import { motion } from "motion/react";
import "./Intro.css";

export default function Intro() {
  return (
    <section className="hero">

      <div className="grid-bg"></div>

      <div className="hero-content">

        <motion.div
          className="tag"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          EST. 2008 | IIT (ISM) DHANBAD
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          ENGINEERING <br />
          THE <span>FUTURE</span> <br />
          OF ELECTRIC RACING
        </motion.h1>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          We are MECHISMU RACING, a premier Formula Student team from IIT (ISM) Dhanbad, pushing the boundaries of electric mobility and high-performance engineering.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button className="btn primary">THE PROJECT</button>
          <button className="btn secondary">SUPPORT US</button>
        </motion.div>

      </div>
    </section>
  );
}