
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import '@/components/funding/Funding.css';

export default function Funding() {
  const funds = [
    {
      title: "Financial Sponsorship",
      description:
        "Direct monetary support to fuel our material acquisitions and competition logistics."
    },
    {
      title: "Technical Partnership",
      description:
        "Provide critical software, specialized tools, or access to manufacturing facilities."
    },
    {
      title: "Industry Collaboration",
      description:
        "Work with our engineers to test your cutting-edge components on our platform."
    }
  ];

  return (
    <section className="funding-section">
      <div className="funding-bg" />

      <div className="funding-box">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="funding-heading"
        >
          POWER THE <span>FUTURE</span>
          <br />
          <small>OF ELECTRIC RACING</small>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="funding-list"
        >
          {funds.map((fund, idx) => (
            <div key={idx} className="funding-item">
              <div className="line" />
              <h4>{fund.title}</h4>
              <p>{fund.description}</p>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="funding-btn"
        >
          Partner With Us <ArrowRight size={18} />
        </motion.button>
      </div>
    </section>
  );
}