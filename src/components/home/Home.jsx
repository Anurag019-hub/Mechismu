
import '@/components/home/home.css';

// ===== HOME SECTIONS =====
import HeroSection from '@/components/home/hero/HeroSection';
import AboutPreview from '@/components/home/about/AboutPreview';
import CarsPreview from '@/components/home/cars/CarsPreview';
import TeamPreview from '@/components/home/team/TeamPreview';
import Achievements from '@/components/home/achievements/Achievements';
import SponsorsPreview from '@/components/home/sponsors/SponsorsPreview';
import ContactPreview from '@/components/home/contact/ContactPreview';

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
