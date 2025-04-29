import React from "react";
import HeroSection from "../ui/enterprise/HeroSection";
import BenefitsSection from "../ui/enterprise/BenefitsSection";
import AboutEnterprise from "../ui/enterprise/AboutEnterprise";
import StepsEnterprise from "../ui/enterprise/StepsEnterprise";
import FeaturesSection from "../ui/enterprise/FeaturesSection";
import Faq from "../ui/enterprise/Faq";
import FooterEnterprise from "../ui/enterprise/FooterEnterprise";

export const Enterprise = () => {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <AboutEnterprise />
      <StepsEnterprise />
      <FeaturesSection />
      <Faq />
      <FooterEnterprise />
    </>
  );
};
