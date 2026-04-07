
import SectionWrapper from '@/components/home/common/SectionWrapper';
import CTAButton from '@/components/home/common/CTAButton';
import '@/components/home/about/about.css';

export default function AboutPreview() {
  return (
    <SectionWrapper className="about-section" id="about">
      <div className="about-header-accent fade-up">
        <div className="about-header-line" />
        <span className="about-header-label">// ABOUT_MODULE</span>
      </div>

      <div className="about-grid">
        <div className="about-left">
          <h2 className="about-title fade-up">
            BORN TO <span className="about-title-accent">RACE</span>
          </h2>

          <p className="about-text-primary fade-up">
            MECHISMU Racing is the premier Formula Student Electric team of IIT
            (ISM) Dhanbad. Since 2008, we've been engineering high-performance
            electric vehicles that push the boundaries of speed, efficiency, and
            innovation.
          </p>

          <p className="about-text-secondary fade-up">
            Our team combines cutting-edge technology with raw motorsport
            passion — from carbon fiber monocoques to custom silicon-carbide
            inverters, every component is designed for maximum performance.
          </p>

          <div className="fade-up">
            <CTAButton text="KNOW MORE" to="/about" variant="outline" />
          </div>
        </div>

        <div className="about-right fade-up">
          <div className="about-panel">
            <div className="about-panel-bracket bracket-tl" />
            <div className="about-panel-bracket bracket-tr" />
            <div className="about-panel-bracket bracket-bl" />
            <div className="about-panel-bracket bracket-br" />

            <span className="about-panel-label">UNIT_DATA :: TEAM_OVERVIEW</span>

            {[
              { label: 'FOUNDED', value: '2008' },
              { label: 'INSTITUTE', value: 'IIT (ISM) DHANBAD' },
              { label: 'CATEGORY', value: 'FORMULA STUDENT EV' },
              { label: 'TEAM SIZE', value: '60+ MEMBERS' },
              { label: 'CARS BUILT', value: '7 PROTOTYPES' },
            ].map((item, i) => (
              <div key={i} className="about-stat-row">
                <span className="about-stat-key">{item.label}</span>
                <span className="about-stat-val">{item.value}</span>
              </div>
            ))}

            <div className="about-status">
              <span className="about-status-dot" />
              <span className="about-status-text">SYSTEM ACTIVE — SEASON 2025</span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
