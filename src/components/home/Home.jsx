
import "./home.css";

// ===== HOME SECTIONS =====
import HeroSection from "./hero/HeroSection.jsx";
import AboutPreview from "./about/AboutPreview.jsx";
import CarsPreview from "./cars/CarsPreview.jsx";
import TeamPreview from "./team/TeamPreview.jsx";
import Achievements from "./achievements/Achievements.jsx";
import SponsorsPreview from "./sponsors/SponsorsPreview.jsx";
import ContactPreview from "./contact/ContactPreview.jsx";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <CarsPreview />
      <TeamPreview />
      <Achievements />
      <SponsorsPreview />
      <ContactPreview />
    </>
  );
}
