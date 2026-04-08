
import "./home.css";

// ===== HOME SECTIONS =====
import HeroSection from "./Hero/HeroSection.jsx";
import AboutPreview from "./About/AboutPreview.jsx";
import CarsPreview from "./Cars/CarsPreview.jsx";
import TeamPreview from "./Team/TeamPreview.jsx";
import Achievements from "./Achievements/Achievements.jsx";
import SponsorsPreview from "./Sponsors/SponsorsPreview.jsx";


export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <CarsPreview />
      <TeamPreview />
      <Achievements />
      <SponsorsPreview />
    </>
  );
}
