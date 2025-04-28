import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/swiper-bundle.css";
import SearchPath from "../../ui/modals/SearchPath";
import HomeKeywords from "../../ui/layout/HomeKeywords";
import useCategorieListWithSub from "../../hooks/categories/useCategorieListWithSub";

const HeroSection = () => {
  const { t } = useTranslation();
  const { data: categoriesWithSubCategories } = useCategorieListWithSub();

  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  function handleSubmitSearch(e) {
    e.preventDefault();
    setShowModal(true);
  }

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  return (
    <section className="hero_section">
      <Swiper
        slidesPerView={1}
        speed={1000}
        loop={true}
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="hero_slider"
      >
        <SwiperSlide>
          <img src="/images/slide1.jpg" alt="slide-1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide2.jpg" alt="slide-2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide3.jpg" alt="slide-3" />
        </SwiperSlide>
      </Swiper>
      <div className="hero_content">
        <div className="info">
          <h2>{t("home.heroSectionTitle")}</h2>
          <h2>{t("home.heroSectionSubTitle")}</h2>
        </div>

        <form onSubmit={handleSubmitSearch}>
          <div className="input-fileld">
            <i className="fa-sharp fa-regular fa-magnifying-glass"></i>
            <input
              type="text"
              id="search"
              name="search"
              placeholder={t("home.searchPlaceHolder")}
              value={searchValue}
              onChange={handleSearchChange}
            />
            <button>{t("home.search")}</button>
          </div>
          {categoriesWithSubCategories &&
            categoriesWithSubCategories?.length > 0 && (
              <HomeKeywords categories={categoriesWithSubCategories} />
            )}
        </form>
      </div>

      <SearchPath
        searchValue={searchValue}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </section>
  );
};

export default HeroSection;
