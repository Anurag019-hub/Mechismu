
import { motion } from 'motion/react';
import { Zap, Cpu, Settings, Wrench, Search } from 'lucide-react';
import '@/components/domains/Domains.css';

const domains = [
  { title: "Powertrain", desc: "Motor control & battery systems.", icon: <Zap /> },
  { title: "Vehicle Dynamics", desc: "Suspension & braking.", icon: <Settings /> },
  { title: "LV Electronics", desc: "Telemetry & control systems.", icon: <Cpu /> },
  { title: "Structural", desc: "Chassis & aero.", icon: <Wrench /> },
  { title: "R&D", desc: "Future tech & autonomy.", icon: <Search /> },
];

export default function Domains() {
  return (
    <section className="domains">

      {/* LEFT SIDE */}
      <div className="left">
        <h1 className="hero-title">
          ENGINEERING <br />
          <span>SYSTEMS</span> <br />
          INTEGRATED
        </h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">
        {domains.map((d, i) => (
          <motion.div
            key={i}
            className="panel"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="icon">{d.icon}</div>

            <div className="content">
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
            </div>

            <div className="line" />
          </motion.div>
        ))}
      </div>

    </section>
  );
}