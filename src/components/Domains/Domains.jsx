import { useState } from "react";
import { motion } from "motion/react";
import { Zap, Cpu, Settings, Wrench, Search } from "lucide-react";
import "./Domains.css";

const domains = [
  { title: "Powertrain", desc: "Motor control, battery management, and drivetrain efficiency.", icon: <Zap /> },
  { title: "Vehicle Dynamics", desc: "Suspension tuning, braking systems, and handling optimization.", icon: <Settings /> },
  { title: "LV Electronics", desc: "Telemetry, embedded systems, and control architecture.", icon: <Cpu /> },
  { title: "Structural", desc: "Chassis design, strength analysis, and material optimization.", icon: <Wrench /> },
  { title: "Aerodynamics", desc: "Airflow management, drag reduction, and cooling efficiency.", icon: <Wrench /> },
  { title: "R&D", desc: "Innovation, autonomous systems, and next-gen technologies.", icon: <Search /> },
];

export default function Domains() {
  const [active, setActive] = useState(null);

  const handleClick = (i) => {
    setActive(active === i ? null : i);
  };

  return (
    <section className="domains">

      {/* LEFT */}
      <div className="left">
        <h1 className="hero-title">
          TECH <br />
          <span>DOMAINS</span> <br />
          ALIGNED
        </h1>
      </div>

      {/* RIGHT */}
      <div className="right">
        {domains.map((d, i) => {
          const isFlipped = active === i;

          return (
            <motion.div
              key={i}
              className={`panel ${isFlipped ? "flipped" : ""}`}
              onClick={() => handleClick(i)}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="inner">

                {/* FRONT */}
                <div className="front">
                  <div className="icon">{d.icon}</div>

                  <div className="content">
                    <h3>{d.title}</h3>
                    <p>{d.desc}</p>
                  </div>
                </div>

                {/* BACK */}
                <div className="back">
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}