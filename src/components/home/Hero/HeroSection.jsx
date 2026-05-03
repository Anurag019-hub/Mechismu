
import CTAButton from '@/components/home/common/CTAButton';
import '@/components/home/Hero/hero.css';

export default function HeroSection() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg"></div>
      <div className="hero-grid technical-grid"></div>
      <div className="hero-glow-static"></div>
      <div className="hero-glow-pulse"></div>

      <div className="hero-content">
        <div className="hero-tag">EST. 2008 &nbsp;|&nbsp; IIT (ISM) DHANBAD</div>
        <h1 className="hero-title">
          ENGINEERING <br />
          THE <span className="hero-title-accent">FUTURE</span> <br />
          OF ELECTRIC RACING
        </h1>
        <p className="hero-desc">
          We are MECHISMU RACING, a premier Formula Student team from IIT (ISM)
          Dhanbad, pushing the boundaries of electric mobility and
          high-performance engineering.
        </p>
        <div className="hero-buttons">
          <CTAButton text="THE PROJECT" to="/about" variant="primary" />
          <CTAButton text="SUPPORT US" to="/sponsors" variant="outline" />
        </div>
      </div>
    </section>
  );
}
