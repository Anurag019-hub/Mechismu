
import SectionWrapper from '@/components/home/common/SectionWrapper';
import CTAButton from '@/components/home/common/CTAButton';
import '@/components/home/sponsors/sponsors.css';

const SPONSORS = [
  { name: 'Tata Motors', logo: '/sponser/tata.png', tier: 'PLATINUM' },
  { name: 'Mahindra', logo: '/sponser/mahindra.png', tier: 'GOLD' },
  { name: 'Bosch', logo: '/sponser/bosch.png', tier: 'GOLD' },
  { name: 'SKF', logo: '/sponser/skf.png', tier: 'SILVER' },
  { name: 'Ansys', logo: '/sponser/ansys.png', tier: 'SILVER' },
  { name: 'Altair', logo: '/sponser/altair.png', tier: 'SILVER' },
  { name: 'SolidWorks', logo: '/sponser/solidworks.png', tier: 'BRONZE' },
  { name: 'MathWorks', logo: '/sponser/mathworks.png', tier: 'BRONZE' },
];

const tierColors = {
  PLATINUM: '#C0C0C0',
  GOLD: '#FFD700',
  SILVER: '#A8A8A8',
  BRONZE: '#CD7F32',
};

function SponsorLogo({ sponsor }) {
  const initials = sponsor.name.slice(0, 2).toUpperCase();
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
            e.target.nextElementSibling.style.display = 'flex';
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
        {SPONSORS.map((sponsor) => (
          <SponsorLogo key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>

      <div className="fade-up">
        <CTAButton text="ALL SPONSORS" to="/sponsors" variant="outline" />
      </div>
    </SectionWrapper>
  );
}
