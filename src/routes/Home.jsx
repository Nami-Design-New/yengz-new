import HeroSection from "../ui/home/HeroSection";
import AboutApp from "../ui/home/AboutApp";
import CategoriesSection from "../ui/home/CategoriesSection";
import DownloadApp from "../ui/home/DownLoadApp";
import HowItWorks from "../ui/home/HowItWorks";
import JoinYnjz from "../ui/home/JoinYnjz";
import LatestProjects from "../ui/home/LatestProjects ";
import Parteners from "../ui/home/Parteners";
import PopularServicesSection from "../ui/home/PopularServicesSection";
import WhyYenjz from "../ui/home/WhyYnjez";

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutApp />
      <CategoriesSection />
      <JoinYnjz />
      <WhyYenjz />
      <PopularServicesSection />
      <LatestProjects />
      <DownloadApp />
      <HowItWorks />
      <Parteners />
    </>
  );
};

export default Home;
