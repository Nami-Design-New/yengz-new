import React from "react";
import HeroEnterprise from "../../ui/enterprise/HeroEnterprise";
import BenefitsSection from "../../ui/enterprise/BenefitsSection";
import AboutEnterprise from "../../ui/enterprise/AboutEnterprise";
import StepsEnterprise from "../../ui/enterprise/StepsEnterprise";
import FeaturesSection from "../../ui/enterprise/FeaturesSection";
import Faq from "../../ui/enterprise/Faq";
import FooterEnterprise from "../../ui/enterprise/FooterEnterprise";

const Enterprise = () => {
  return (
    <>
      <HeroEnterprise />
      <BenefitsSection />
      <AboutEnterprise />
      <StepsEnterprise />
      <FeaturesSection />
      <Faq />
      <FooterEnterprise />
    </>
  );
};
export default Enterprise;
