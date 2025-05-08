import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import useGetLatestProjects from "../../hooks/projects/useGetLatestProjects";
import ProjectCard from "../cards/ProjectCard";

const LatestProjects = () => {
  const { t } = useTranslation();
  const { data: projects } = useGetLatestProjects();

  return (
    <section className="popular_departments pt-0">
      <div className="container">
        <div className="row-head" data-aos="fade-up">
          <h6>{t("home.latestProjects")}</h6>
          <Link to="/projects">
            {t("home.viewAll")}
            <i className="fa-regular fa-angle-left"></i>
          </Link>
        </div>
        <div className="row mb-5">
          <Swiper
            spaceBetween={12}
            slidesPerView={1}
            speed={1000}
            loop={true}
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="mainSliderContainer"
            breakpoints={{
              992: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 1,
              },
              350: {
                slidesPerView: 1,
              },
            }}
          >
            {projects?.map((project) => (
              <SwiperSlide key={project.id} style={{ height: "auto" }}>
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default LatestProjects;
