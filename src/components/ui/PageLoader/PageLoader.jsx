import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import "./PageLoader.css";

const STATUS_MESSAGES = [
  'INITIALIZING SYSTEMS',
  'CALIBRATING POWERTRAIN',
  'LOADING TELEMETRY',
  'SYSTEM READY',
];

export default function PageLoader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        // Stop at "SYSTEM READY" instead of infinitely looping if it gets there
        if (prev === STATUS_MESSAGES.length - 1) return prev;
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentMessage = STATUS_MESSAGES[messageIndex];

  return (
    <motion.div
      className="page-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Subtle car-inspired motion streak (simulating dynamic pass or headlight sweep) */}
      <motion.div
        className="page-loader__streak"
        initial={{ x: '-100vw' }}
        animate={{ x: '100vw' }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />

      <div className="page-loader__content">
        <motion.h1
          className="page-loader__title"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          MECHISMU
        </motion.h1>

        <div className="page-loader__status-container">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              className="page-loader__status"
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {currentMessage}
            </motion.p>
          </AnimatePresence>

          {/* Signature blinking cursor */}
          <motion.span
            className="page-loader__cursor"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          >
            |
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
