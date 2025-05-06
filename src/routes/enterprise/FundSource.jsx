import React, { useState } from "react";
import AddButton from "../../ui/enterprise/AddButton ";
import { useTranslation } from "react-i18next";
import ChangeFunderModal from "../../ui/modals/enterprise/ChangeFunderModal";

const FundSource = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  return (
    <section className="funding">
      <h3 className="funding__title">مصدر التمويل الحالي</h3>
      <div className="funders__list">
        <div className="funder">
          <img
            src="/images/enterprise/img_avatar.png"
            alt="funder"
            className="funder__image"
          />
          <div className="funder__info">
            <p className="funders__info--name">Mahmoud Abbas</p>
            <div className="funders__info--job">
              <span>
                <i className="fa-solid fa-briefcase"></i>
                <span>مطور واجهات أمامية</span>
              </span>
            </div>
          </div>
          <AddButton
            icon={<i className="fa-solid fa-arrows-rotate"></i>}
            text={t("enterprise.teams.addFunding", "تغير الممول")}
            onClick={() => {
              console.log("clikced");
              setShowModal(true);
            }}
          />
        </div>
      </div>

      <ChangeFunderModal setShowModal={setShowModal} showModal={showModal} />
    </section>
  );
};

export default FundSource;
