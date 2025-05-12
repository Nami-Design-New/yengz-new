import React from "react";
import { useTranslation } from "react-i18next";
import useBlogDetails from "../hooks/blogs/useGetBlogDetails";
import DataLoader from "../ui/DataLoader";
import ErrorPage from "./ErrorPage";
import { Autoplay, EffectFade } from "swiper/modules";
import SectionHeader from "../ui/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";

const BlogDetails = () => {
  const { isLoading, data: blog } = useBlogDetails();
  const { t } = useTranslation();

  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };

  if (isLoading) {
    <DataLoader />;
  }

  if (!isLoading && !blog) {
    return <ErrorPage />;
  }

  const handleShareBlog = () => {
    const url = window.location.href;
    const shareData = {
      title: blog?.title,
      text: blog?.description,
      url: url,
    };

    navigator.share(shareData).catch((error) => {
      console.error("Error sharing:", error);
    });
  };
  return (
    <>
      <SectionHeader />
      <section className="blogDetails">
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-12 p-2">
              <button className="shareBlog" onClick={handleShareBlog}>
                <i className="fa-solid fa-share"></i> {t("shareBlog")}
              </button>
            </div>
            <div className="col-lg-7 col-xl-7 p-2">
              <div className="blog" data-aos="fade-up">
                <div className="swiper blogSwiper">
                  {blog?.images && (
                    <Swiper
                      className="mySwiper"
                      slidesPerView={1}
                      effect="fade"
                      loop={true}
                      modules={[Navigation, EffectFade, Autoplay]}
                      navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                    >
                      {blog?.images?.map((image) => (
                        <SwiperSlide
                          key={image.image}
                          className="service-slide"
                        >
                          <img src={image.image} alt="service" />
                        </SwiperSlide>
                      ))}
                      <div className="swiper-button-next"></div>
                      <div className="swiper-button-prev"></div>
                    </Swiper>
                  )}
                </div>
                <p
                  className="description"
                  dangerouslySetInnerHTML={renderHTML(blog?.html)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
