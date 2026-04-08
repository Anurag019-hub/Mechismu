import SectionWrapper from '@/components/home/common/SectionWrapper';
import CTAButton from '@/components/home/common/CTAButton';
import '@/components/home/Sponsors/sponsors.css';

// Import the centralized data and config
import { sponsors, tierColors } from '@/data/sponsors';

function SponsorLogo({ sponsor }) {
  // Defensive check for initials
  const initials = sponsor.name ? sponsor.name.slice(0, 2).toUpperCase() : '??';

  /** * Note: If your imported tierColors use 'Title', 'Gold', etc. 
   * ensure the sponsor.tier casing matches exactly.
   */
  const color = tierColors[sponsor.tier] || '#ff544a';

  return (
    <div className="sponsor-logo-box fade-up">
      <div className="sponsor-tier-dot" style={{ backgroundColor: color }} />
      <div className="sponsor-img-container">
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          loading="lazy"
          className="sponsor-img"
          onError={(e) => {
            e.target.style.display = 'none';
            if (e.target.nextElementSibling) {
              e.target.nextElementSibling.style.display = 'flex';
            }
          }}
        />
        <div className="sponsor-fallback" style={{ display: 'none' }}>
          {initials}
        </div>
      </div>
      <span className="sponsor-name">{sponsor.name}</span>
    </div>
  );
}

export default function SponsorsPreview() {
  const limitedSponsors = sponsors.slice(0, 8);
  return (
    <SectionWrapper className="sponsors-section">
      <div className="sponsors-header-accent fade-up">
        <div className="sponsors-header-line" />
        <span className="sponsors-header-label">// PARTNER_NETWORK</span>
      </div>

      <h2 className="sponsors-title fade-up">
        OUR <span className="sponsors-title-accent">PARTNERS</span>
      </h2>

      <p className="sponsors-desc fade-up">
        Backed by industry leaders who believe in the future of electric
        mobility and student-driven innovation.
      </p>

      <div className="sponsors-grid">
        {/* Mapping over the imported 'sponsors' array instead of local constant */}
        {limitedSponsors.map((sponsor) => (
          <SponsorLogo key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>

      <div className="fade-up">
        <CTAButton text="ALL SPONSORS" to="/sponsors" variant="outline" />
      </div>
    </SectionWrapper>
  );
}