import { useState, useEffect, useRef, useCallback } from 'react';
import './Preloader.css';

/* ── Signal Configuration ────────────────────────────────── */
const SIGNALS = [
    {
        label: 'ENGINE TEMP',
        unit: '°C',
        min: 50,          // changed
        max: 70,          // changed
        color: '#e10600',
        glowColor: 'rgba(225, 6, 0, 0.6)',
        freq: 0.8,
        amplitude: 0.35,
        noiseLevel: 0.12,
        spikeChance: 0.003,
    },
    {
        label: 'BATTERY',
        unit: 'V',
        min: 145,         // already correct
        max: 176.2,       // changed from 176.4
        color: '#ff4d4d',
        glowColor: 'rgba(255, 77, 77, 0.5)',
        freq: 1.2,
        amplitude: 0.25,
        noiseLevel: 0.08,
        spikeChance: 0.002,
    },
    {
        label: 'SPEED',
        unit: 'km/h',
        min: 0,
        max: 92,          // changed from 90
        color: '#ff8080',
        glowColor: 'rgba(255, 128, 128, 0.4)',
        freq: 0.5,
        amplitude: 0.45,
        noiseLevel: 0.15,
        spikeChance: 0.004,
    },
];

const HISTORY_LENGTH = 220;

export default function Preloader() {
    const [loaded, setLoaded] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [statusText, setStatusText] = useState('INITIALIZING SYSTEM');
    const canvasRefs = useRef([]);
    const historyRef = useRef(SIGNALS.map(() => []));
    const valuesRef = useRef(SIGNALS.map((s) => (s.min + s.max) / 2));
    const rafRef = useRef(null);
    const startTimeRef = useRef(null);
    const exitingRef = useRef(false);

    /* ── Status text cycle ─────────────────────────────────── */
    useEffect(() => {
        const messages = [
            'INITIALIZING SYSTEM',
            'LOADING TELEMETRY',
            'CALIBRATING SENSORS',
            'SYNCING ECU DATA',
            'ESTABLISHING LINK',
            'SYSTEMS ONLINE',
        ];
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % messages.length;
            setStatusText(messages[i]);
        }, 1400);
        return () => clearInterval(interval);
    }, []);

    /* ── Generate signal value ─────────────────────────────── */
    const generateValue = useCallback((signal, time, prevValue) => {
        const { freq, amplitude, noiseLevel, spikeChance, min, max } = signal;
        const range = max - min;
        const mid = (min + max) / 2;

        /* Base sine wave */
        const base = Math.sin(time * freq * Math.PI * 2) * amplitude * range * 0.5;

        /* Overtone for complexity */
        const overtone = Math.sin(time * freq * 2.7 * Math.PI * 2) * amplitude * range * 0.15;

        /* Noise */
        const noise = (Math.random() - 0.5) * noiseLevel * range;

        /* Occasional spike */
        const spike = Math.random() < spikeChance
            ? (Math.random() - 0.5) * range * 0.5
            : 0;

        /* Blend with previous value for smoothness */
        const raw = mid + base + overtone + noise + spike;
        const clamped = Math.max(min, Math.min(max, raw));
        return prevValue * 0.7 + clamped * 0.3;
    }, []);

    /* ── Draw a single waveform ────────────────────────────── */
    const drawWaveform = useCallback((canvas, history, signal, isExiting) => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;

        /* Resize canvas for HiDPI */
        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
        }

        ctx.clearRect(0, 0, w, h);

        if (history.length < 2) return;

        const { min, max, color, glowColor } = signal;
        const range = max - min;
        const padY = 6;
        const drawH = h - padY * 2;

        /* ── Grid lines (subtle) ───────────────────────────── */
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 0.5;
        for (let gy = 0; gy <= 4; gy++) {
            const yy = padY + (gy / 4) * drawH;
            ctx.beginPath();
            ctx.moveTo(0, yy);
            ctx.lineTo(w, yy);
            ctx.stroke();
        }

        /* ── Glow layer ────────────────────────────────────── */
        ctx.save();
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = isExiting ? 1 : 4;
        ctx.filter = 'blur(4px)';
        ctx.globalAlpha = isExiting ? 0.15 : 0.4;
        ctx.beginPath();
        for (let i = 0; i < history.length; i++) {
            const x = (i / (HISTORY_LENGTH - 1)) * w;
            const normalized = 1 - (history[i] - min) / range;
            const y = padY + normalized * drawH;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();

        /* ── Main line ─────────────────────────────────────── */
        ctx.strokeStyle = color;
        ctx.lineWidth = isExiting ? 1 : 1.8;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.globalAlpha = isExiting ? 0.5 : 1;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = isExiting ? 2 : 8;
        ctx.beginPath();
        for (let i = 0; i < history.length; i++) {
            const x = (i / (HISTORY_LENGTH - 1)) * w;
            const normalized = 1 - (history[i] - min) / range;
            const y = padY + normalized * drawH;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        /* ── Leading dot (current value) ───────────────────── */
        if (!isExiting && history.length > 0) {
            const lastVal = history[history.length - 1];
            const lastX = w;
            const lastY = padY + (1 - (lastVal - min) / range) * drawH;
            ctx.fillStyle = color;
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(lastX - 1, lastY, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }, []);

    /* ── Animation loop ────────────────────────────────────── */
    useEffect(() => {
        const animate = (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const elapsed = (timestamp - startTimeRef.current) / 1000;

            SIGNALS.forEach((signal, idx) => {
                const prevVal = valuesRef.current[idx];
                let newVal;

                if (exitingRef.current) {
                    /* Flatten toward midpoint during exit */
                    const mid = (signal.min + signal.max) / 2;
                    newVal = prevVal * 0.95 + mid * 0.05;
                } else {
                    newVal = generateValue(signal, elapsed, prevVal);
                }

                valuesRef.current[idx] = newVal;

                const hist = historyRef.current[idx];
                hist.push(newVal);
                if (hist.length > HISTORY_LENGTH) hist.shift();

                drawWaveform(canvasRefs.current[idx], hist, signal, exitingRef.current);
            });

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [generateValue, drawWaveform]);

    /* ── Exit after load ───────────────────────────────────── */
    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                exitingRef.current = true;
                setStatusText('SYSTEMS ONLINE');
                setTimeout(() => {
                    setLoaded(true);
                    setTimeout(() => setHidden(true), 700);
                }, 1200);
            }, 2400);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    if (hidden) return null;

    return (
        <div className={`telem-overlay ${loaded ? 'telem-exit' : ''}`} id="preloader">
            {/* Scanline effect */}
            <div className="telem-scanlines" />

            {/* Header */}
            <div className="telem-header">
                <div className="telem-header-left">
                    <span className="telem-logo">MECHISMU</span>
                    <span className="telem-logo-sub">FSAE TEAM</span>
                </div>
                <div className="telem-header-center">
                    <span className="telem-motto">RACING IS RELIGION</span>
                </div>
                <div className="telem-header-right">
                    <span className="telem-dot" />
                    <span className="telem-live">LIVE TELEMETRY</span>
                </div>
            </div>

            {/* Signal rows */}
            <div className="telem-signals">
                {SIGNALS.map((signal, idx) => {
                    const currentVal = valuesRef.current[idx];
                    const displayVal = signal.unit === '°C' || signal.unit === 'km/h'
                        ? Math.round(currentVal)
                        : currentVal.toFixed(1);

                    return (
                        <div className="telem-signal-card" key={signal.label}>
                            {/* Label Row */}
                            <div className="telem-label-row">
                                <span className="telem-signal-label">{signal.label}</span>
                                <div className="telem-value-row">
                                    <span
                                        className="telem-signal-value"
                                        style={{ color: signal.color }}
                                    >
                                        {displayVal}
                                    </span>
                                    <span className="telem-signal-unit">{signal.unit}</span>
                                </div>
                            </div>

                            {/* Waveform canvas */}
                            <div className="telem-canvas-wrap">
                                <canvas
                                    ref={(el) => (canvasRefs.current[idx] = el)}
                                    className="telem-canvas"
                                />
                                {/* Horizontal center line */}
                                <div className="telem-center-line" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom bar */}
            <div className="telem-bottom">
                <div className="telem-progress-track">
                    <div className="telem-progress-fill" />
                </div>
                <p className="telem-status">
                    <span className="telem-status-dot" />
                    {statusText}
                    <span className="telem-ellipsis" />
                </p>
            </div>
        </div>
    );
}
