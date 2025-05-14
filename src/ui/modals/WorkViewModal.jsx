import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "sonner";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAddLike } from "../../hooks/favorites/useAddLike";
import { useIncreaseViewCount } from "../../hooks/favorites/useIncreaseViewCount";
import { useRemoveLike } from "../../hooks/favorites/useRemoveLike";
import useSearchWorks from "../../hooks/portfolio/useSearchWorks";
import { calculateDate, truncateText } from "../../utils/helpers";

function WorkViewModal({ showModal, setShowModal, targetWork }) {
  const { t } = useTranslation();
  const { refetch } = useSearchWorks();
  const lang = useSelector((state) => state.language.lang);
  const user = useSelector((state) => state.authedUser.user);
  const [isLike, setIsLike] = useState(targetWork?.liked);

  const { increaseViewCount, isIncreaseingViewCount } = useIncreaseViewCount();
  const { addLike, isAddingLike } = useAddLike();
  const { removeLike, isRemovingLike } = useRemoveLike();

  useEffect(() => {
    if (targetWork?.id && !targetWork?.viewed) {
      increaseViewCount(targetWork?.id, {
        onSuccess: () => {
          refetch();
        },
      });
    }
  }, [targetWork?.viewed, increaseViewCount, targetWork?.id, refetch]);

  const handleAddLike = () => {
    addLike(targetWork?.id, {
      onSuccess: () => {
        setIsLike(true);
        toast.success("Work added to favorites ");
        refetch();
      },
      onError: (error) => {
        console.error(error.message);
      },
    });
  };

  const handleRemoveLike = () => {
    removeLike(targetWork?.id, {
      onSuccess: () => {
        setIsLike(false);
        toast.success("Work removed from favorites ");
        refetch();
      },
      onError: (error) => {
        console.error(error.message);
      },
    });
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      centered
      size="lg"
    >
      <Modal.Header className="pb-0" closeButton />
      <Modal.Body className="col-12 p-2">
        <div className="work__view--modal">
          <Swiper
            spaceBetween={4}
            slidesPerView={1}
            speed={1000}
            loop={true}
            modules={[Autoplay]}
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="worksViewModalSwiper"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {targetWork?.images &&
              targetWork?.images?.map((image) => (
                <SwiperSlide key={image.id} className="row p-0 m-0">
                  <div className="work-modal-img-box">
                    <img src={image.image} alt="work" />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="work-modal-content">
            <div className="d-flex align-items-center justify-content-between">
              <h3>{targetWork?.title}</h3>
              {user && !targetWork?.is_my_work && (
                <>
                  {isLike ? (
                    <button
                      className="like-btn liked can-like"
                      onClick={handleRemoveLike}
                      disabled={isRemovingLike}
                    >
                      <i className="fa-sharp fa-solid fa-heart can-like"></i>{" "}
                      {t("likeIt")}
                    </button>
                  ) : (
                    <button
                      className="like-btn"
                      onClick={handleAddLike}
                      disabled={isAddingLike}
                    >
                      <i className="fa-sharp fa-solid fa-heart"></i>{" "}
                      {t("notLikeIt")}
                    </button>
                  )}
                </>
              )}
            </div>
            <h5>{targetWork?.description}</h5>
            <div className="modal-info-item">
              <i className="fa-solid fa-clipboard"></i>
              <Link
                target="_blank"
                to={targetWork?.link}
                className="m-0 item-value"
              >
                {truncateText(targetWork?.link, 35)}
              </Link>
            </div>
            <div className="modal-info-items">
              <div className="modal-info-item">
                <i className="fa-solid fa-calendar-days"></i>
                <p className="m-0 item-value">
                  {calculateDate(targetWork?.start_date)}
                </p>
              </div>
              <div className="modal-info-item">
                <i className="fa-solid fa-calendar-days"></i>
                <p className="m-0 item-value">
                  {calculateDate(targetWork?.end_date)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default WorkViewModal;
