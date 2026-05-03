import React, { useState, useRef, useCallback, memo } from 'react';
import './ContactForm.css';

const SUBJECTS = [
  { value: '', label: 'SELECT SUBJECT PROTOCOL' },
  { value: 'sponsorship', label: 'SPONSORSHIP — FUNDING.REQ' },
  { value: 'technical', label: 'TECHNICAL — COLLAB.SYS' },
  { value: 'media', label: 'MEDIA — PRESS.INQUIRY' },
  { value: 'general', label: 'GENERAL — OPEN.CHANNEL' },
];

const ContactForm = memo(function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [focused, setFocused] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  // Stable callback — avoids creating new function per render
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  }, []);

  // Stable focus handlers
  const handleFocus = useCallback((e) => setFocused(e.target.name), []);
  const handleBlur = useCallback(() => setFocused(''), []);

  return (
    <div className="ct-form-wrapper">
      <div className="ct-form__header">
        <span className="ct-form__ref">SYS_FORM::TX_001</span>
        <h2 className="ct-form__title">TRANSMIT ENQUIRY</h2>
        <div className="ct-form__title-line" />
      </div>

      <form className="ct-form" ref={formRef} onSubmit={handleSubmit} autoComplete="off">
        {/* Name */}
        <div className={`ct-field ${focused === 'name' ? 'ct-field--focused' : ''} ${form.name ? 'ct-field--filled' : ''}`}>
          <label className="ct-field__label">NOMINAL NAME</label>
          <div className="ct-field__tag">FIELD_01</div>
          <input
            className="ct-field__input"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
          <div className="ct-field__line" />
        </div>

        {/* Email */}
        <div className={`ct-field ${focused === 'email' ? 'ct-field--focused' : ''} ${form.email ? 'ct-field--filled' : ''}`}>
          <label className="ct-field__label">RETURN CHANNEL</label>
          <div className="ct-field__tag">FIELD_02</div>
          <input
            className="ct-field__input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
          <div className="ct-field__line" />
        </div>

        {/* Subject */}
        <div className={`ct-field ${focused === 'subject' ? 'ct-field--focused' : ''} ${form.subject ? 'ct-field--filled' : ''}`}>
          <label className="ct-field__label">SUBJECT PROTOCOL</label>
          <div className="ct-field__tag">FIELD_03</div>
          <select
            className="ct-field__input ct-field__select"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          >
            {SUBJECTS.map((s) => (
              <option key={s.value} value={s.value} disabled={!s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <div className="ct-field__line" />
        </div>

        {/* Message */}
        <div className={`ct-field ct-field--textarea ${focused === 'message' ? 'ct-field--focused' : ''} ${form.message ? 'ct-field--filled' : ''}`}>
          <label className="ct-field__label">ENCRYPTED MESSAGE BODY</label>
          <div className="ct-field__tag">FIELD_04</div>
          <textarea
            className="ct-field__input ct-field__textarea"
            name="message"
            value={form.message}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows="5"
            required
          />
          <div className="ct-field__line" />
        </div>

        {/* Submit */}
        <button className={`ct-submit ${submitted ? 'ct-submit--sent' : ''}`} type="submit">
          <span className="ct-submit__text">
            {submitted ? 'TRANSMISSION SENT ✓' : 'SEND MESSAGE'}
          </span>
          <div className="ct-submit__corner ct-submit__corner--tl" />
          <div className="ct-submit__corner ct-submit__corner--tr" />
          <div className="ct-submit__corner ct-submit__corner--bl" />
          <div className="ct-submit__corner ct-submit__corner--br" />
        </button>
      </form>
    </div>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;
