import React, { useState } from 'react';
import SectionWrapper from '@/components/home/common/SectionWrapper';
import CTAButton from '@/components/home/common/CTAButton';
import '@/components/home/Contact/contact.css';
import { LINKS } from '@/config/links';

const CONTACT_INFO = [
  {
    sysLabel: 'COMMS_SYS',
    title: 'EMAIL',
    info: 'mechismu@iitism.ac.in',
    href: 'mailto:mechismu@iitism.ac.in',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    sysLabel: 'LOC_NODE',
    title: 'LOCATION',
    info: 'IIT (ISM) Dhanbad, Jharkhand',
    href: 'https://maps.google.com/?q=IIT+ISM+Dhanbad',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    sysLabel: 'NET_LINK',
    title: 'INSTAGRAM',
    info: '@mechismu_racing',
    href: LINKS.social.instagram,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    sysLabel: 'NET_LINK',
    title: 'LINKEDIN',
    info: 'Mechismu Racing',
    href: LINKS.social.linkedin,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function ContactPreview() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <SectionWrapper className="contact-section">
      <div className="contact-header-accent fade-up">
        <div className="contact-header-line" />
        <span className="contact-header-label">// COMM_CHANNEL</span>
      </div>

      <h2 className="contact-title fade-up">
        GET IN <span className="contact-title-accent">TOUCH</span>
      </h2>

      <p className="contact-desc fade-up">
        Interested in sponsorship, collaboration, or joining the team? Reach
        out — our communication channel is open.
      </p>

      <div className="contact-split">
        <div className="contact-left fade-up">
          <div className="contact-info-list">
            {CONTACT_INFO.map((card, i) => {
              const content = (
                <>
                  <div className="contact-icon">{card.icon}</div>
                  <div>
                    <div className="contact-card-title-row">
                      <h4 className="contact-card-title">{card.title}</h4>
                      <span className="contact-card-sys-label">{card.sysLabel}</span>
                    </div>
                    <p className="contact-card-text">{card.info}</p>
                  </div>
                </>
              );

              if (!card.href) {
                return (
                  <span
                    key={i}
                    className="contact-info-card disabled-link"
                    style={{ opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }}
                  >
                    {content}
                  </span>
                );
              }

              return (
                <a
                  key={i}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-card"
                >
                  {content}
                </a>
              );
            })}
          </div>

          <div className="contact-global-status">
            <span className="contact-status-dot" />
            <span className="contact-status-text">CHANNEL ACTIVE</span>
          </div>
        </div>

        <div className="contact-right fade-up">
          <div className="contact-form-container">
            <span className="contact-form-sys-label">SYS_FORM :: QUICK_TX</span>
            <h3 className="contact-form-title">TRANSMIT ENQUIRY</h3>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-field">
                <label className="contact-label">NOMINAL NAME</label>
                <input
                  className="contact-input"
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="contact-field">
                <label className="contact-label">RETURN CHANNEL</label>
                <input
                  className="contact-input"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="contact-field">
                <label className="contact-label">MESSAGE BODY</label>
                <textarea
                  className="contact-textarea"
                  required
                  rows="4"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className={`contact-submit ${submitted ? 'submitted' : ''}`}
              >
                {submitted ? 'TRANSMISSION SENT ✓' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '48px' }} className="fade-up">
        <CTAButton text="FULL CONTACT PAGE" to="/contact" variant="outline" />
      </div>
    </SectionWrapper>
  );
}
