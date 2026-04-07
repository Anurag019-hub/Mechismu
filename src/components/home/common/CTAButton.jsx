
import { NavLink } from 'react-router-dom';
import '@/components/home/common/common.css';

export default function CTAButton({ text, to, href, variant = 'primary', external }) {
  const className = `cta-button cta-${variant}`;
  const linkTarget = href || to;
  const isExternal = external || !!href;

  if (!linkTarget) {
    return (
      <span className={`${className} disabled-link`} style={{ opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }}>
        <span>{text}</span>
        <div className="glow-sweep" />
      </span>
    );
  }

  if (isExternal) {
    return (
      <a href={linkTarget} className={className} target="_blank" rel="noopener noreferrer">
        <span>{text}</span>
        <div className="glow-sweep" />
      </a>
    );
  }

  return (
    <NavLink to={linkTarget} className={className}>
      <span>{text}</span>
      <div className="glow-sweep" />
    </NavLink>
  );
}
