import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import "./Achievements.css";

function Counter({ from = 0, to, duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;

    let startTime;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / (duration * 1000),
        1
      );

      const value = from + (to - from) * progress;

      setCount(Math.floor(value));

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Achievements() {
  return (
    <section className="achievements">
      <div className="achievements-bg" />

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="glass-card"
      >
        <p className="mini-tag">Performance Record</p>

        <h2 className="main-heading">
          ENGINEERING
          <br />
          <span className="ach-glow">RESULTS</span>
        </h2>

        <p className="sub-text">
          Proven performance in Formula Student EV competitions with consistent
          top-tier rankings across design and procurement.
        </p>

        <div className="highlight-block">
          <h3>
            <Counter from={50} to={3} duration={0.25} />rd Overall
          </h3>
          <span className="event">PI-EV 2023</span>
        </div>

        <div className="stats">
          <div className="stat">
            <h4>
              <Counter from={50} to={1} duration={0.35} />st
            </h4>
            <p>Procurement</p>
          </div>

          <div className="stat">
            <h4>
              <Counter from={50} to={2} duration={0.35} />nd
            </h4>
            <p>Design</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}