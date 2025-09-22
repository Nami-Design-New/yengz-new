import React, { useState } from "react";
import { Modal, Nav, Row, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useBanksList from "../../hooks/banks/useBanksList";
import useWithdraw from "../../hooks/banks/useWithdraw";
import { withdrawFormSchema } from "../../validations/withdrawFormSchema";
import InputField from "../forms/InputField";
import BankTransferCard from "../cards/BankTransferCard";

const WithdrawModal = ({ showModal, setShowModal, cartTotalPrice }) => {
  const { t } = useTranslation();
  const { data: banks } = useBanksList();
  const { withdraw, isPending } = useWithdraw();
  const [activeTab, setActiveTab] = useState("bankTransfer");

  // Create form with validation schema
  const methods = useForm({
    resolver: yupResolver(withdrawFormSchema(t)),
    defaultValues: {
      amount: "",
      bank_id: "",
      paypal: "",
      responsibility: false,
      duration: false,
      fees: false,
      activeTab: activeTab,
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = methods;

  // Update activeTab in form when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setValue("activeTab", tab);
  };

  const onSubmit = (data) => {
    const requestBody = {};

    if (activeTab === "bankTransfer") {
      requestBody.amount = data.amount;
      requestBody.bank_id = data.bank_id;
    }
    if (activeTab === "paypal") {
      requestBody.amount = data.amount;
      requestBody.paypal = data.paypal;
    }

    withdraw(requestBody, {
      onSettled: () => {
        setShowModal(false);
      },
    });
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton>
        <h5>{t("balance.withdrawBalance")}</h5>
      </Modal.Header>
      <Modal.Body className="pay_modal">
        {cartTotalPrice && (
          <h3 className="text-center">
            {t("cart.youDontHaveEnoughBallance")}{" "}
            <span>
              {cartTotalPrice}
              <i className="fa-solid fa-dollar-sign"></i>
            </span>
          </h3>
        )}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="form_ui">
            <Tab.Container
              id="left-tabs-example"
              activeKey={activeTab}
              onSelect={(k) => handleTabChange(k)}
            >
              <Row>
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="bankTransfer">
                      <i className="fa-sharp fa-regular fa-building-columns"></i>
                      {t("balance.bankTransfer")}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="paypal">
                      <i className="fa-brands fa-paypal"></i>
                      Paypal
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="bankTransfer">
                    <Controller
                      name="amount"
                      control={control}
                      render={({ field }) => (
                        <InputField
                          type="number"
                          id="amount"
                          name="amount"
                          placeholder={"00"}
                          value={field.value}
                          label={`${t("balance.amount")} *`}
                          onChange={field.onChange}
                          disabled={isPending}
                          required={true}
                          error={errors.amount?.message}
                        />
                      )}
                    />

                    {banks &&
                      banks?.length > 0 &&
                      banks.map((bank) => (
                        <BankTransferCard
                          key={bank.id}
                          bank={bank}
                          bankTransfer={watch("bank_id")}
                          onChange={(id) => setValue("bank_id", id)}
                          disabled={isPending}
                          required={true}
                        />
                      ))}

                    {errors.bank_id && (
                      <p className="text-danger">{errors.bank_id.message}</p>
                    )}

                    <Link to="/manage-accounts" className="btn">
                      {t("manageAccount")}
                    </Link>

                    <div className="conditions-wrapper">
                      <div className="checkbox-group">
                        <Controller
                          name="fees"
                          control={control}
                          render={({ field: { onChange, value, ref } }) => (
                            <>
                              <input
                                type="checkbox"
                                id="fees"
                                checked={value}
                                onChange={(e) => onChange(e.target.checked)}
                                disabled={isPending}
                                ref={ref}
                              />
                              <label htmlFor="fees">
                                {t("balance.feesCondition")}
                              </label>
                            </>
                          )}
                        />
                        {errors.fees && (
                          <p className="text-danger">{errors.fees.message}</p>
                        )}
                      </div>
                      <div className="checkbox-group">
                        <Controller
                          name="duration"
                          control={control}
                          render={({ field: { onChange, value, ref } }) => (
                            <>
                              <input
                                type="checkbox"
                                id="duration"
                                checked={value}
                                onChange={(e) => onChange(e.target.checked)}
                                disabled={isPending}
                                ref={ref}
                              />
                              <label htmlFor="duration">
                                {t("balance.durationCondition")}
                              </label>
                            </>
                          )}
                        />
                        {errors.duration && (
                          <p className="text-danger">
                            {errors.duration.message}
                          </p>
                        )}
                      </div>
                      <div className="checkbox-group">
                        <Controller
                          name="responsibility"
                          control={control}
                          render={({ field: { onChange, value, ref } }) => (
                            <>
                              <input
                                type="checkbox"
                                id="responsibility"
                                checked={value}
                                onChange={(e) => onChange(e.target.checked)}
                                disabled={isPending}
                                ref={ref}
                              />
                              <label htmlFor="responsibility">
                                {t("balance.responsibilityCondition")}
                              </label>
                            </>
                          )}
                        />
                        {errors.responsibility && (
                          <p className="text-danger">
                            {errors.responsibility.message}
                          </p>
                        )}
                      </div>
                      <p className="condition-note">
                        الحوالات البنكية التي ترسلها دولية، وحسب البنك الذي
                        تتعامل معه. قد تمر الحوالة عبر بنك وسيط لاتمام التحويل
                        مما يؤدي لاقتطاع رسوم إضافية.
                      </p>
                      <p className="condition-note">
                        قد يقتطع البنك المحلي الذي تستخدمه رسوم إضافية لاستقبال
                        حوالات بنكية دولية أو رسوم لتحويل العملة من الدولار إلى
                        العملة المحلية.
                      </p>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="paypal">
                    <Controller
                      name="amount"
                      control={control}
                      render={({ field }) => (
                        <InputField
                          type="number"
                          id="amount"
                          name="amount"
                          placeholder={"00"}
                          value={field.value}
                          label={`${t("balance.amount")} *`}
                          onChange={field.onChange}
                          disabled={isPending}
                          required={true}
                          error={errors.amount?.message}
                        />
                      )}
                    />
                    <Controller
                      name="paypal"
                      control={control}
                      render={({ field }) => (
                        <InputField
                          type="text"
                          id="paypal"
                          name="paypal"
                          placeholder={"001321913231"}
                          value={field.value}
                          label={`${t("balance.paypalAccount")} *`}
                          onChange={field.onChange}
                          disabled={isPending}
                          required={true}
                          error={errors.paypal?.message}
                        />
                      )}
                    />
                    <div className="conditions-wrapper">
                      <div className="checkbox-group">
                        <Controller
                          name="fees"
                          control={control}
                          render={({ field: { onChange, value, ref } }) => (
                            <>
                              <input
                                type="checkbox"
                                id="fees"
                                checked={value}
                                onChange={(e) => onChange(e.target.checked)}
                                disabled={isPending}
                                ref={ref}
                              />
                              <label htmlFor="fees">
                                {t("balance.feesCondition")}
                              </label>
                            </>
                          )}
                        />
                        {errors.fees && (
                          <p className="text-danger">{errors.fees.message}</p>
                        )}
                      </div>
                      <div className="checkbox-group">
                        <Controller
                          name="duration"
                          control={control}
                          render={({ field: { onChange, value, ref } }) => (
                            <>
                              <input
                                type="checkbox"
                                id="duration"
                                checked={value}
                                onChange={(e) => onChange(e.target.checked)}
                                disabled={isPending}
                                ref={ref}
                              />
                              <label htmlFor="duration">
                                {t("balance.durationCondition")}
                              </label>
                            </>
                          )}
                        />
                        {errors.duration && (
                          <p className="text-danger">
                            {errors.duration.message}
                          </p>
                        )}
                      </div>
                      <div className="checkbox-group">
                        <Controller
                          name="responsibility"
                          control={control}
                          render={({ field: { onChange, value, ref } }) => (
                            <>
                              <input
                                type="checkbox"
                                id="responsibility"
                                checked={value}
                                onChange={(e) => onChange(e.target.checked)}
                                disabled={isPending}
                                ref={ref}
                              />
                              <label htmlFor="responsibility">
                                {t("balance.responsibilityCondition")}
                              </label>
                            </>
                          )}
                        />
                        {errors.responsibility && (
                          <p className="text-danger">
                            {errors.responsibility.message}
                          </p>
                        )}
                      </div>
                      <p className="condition-note">
                        الحوالات البنكية التي ترسلها دولية، وحسب البنك الذي
                        تتعامل معه. قد تمر الحوالة عبر بنك وسيط لاتمام التحويل
                        مما يؤدي لاقتطاع رسوم إضافية.
                      </p>
                      <p className="condition-note">
                        قد يقتطع البنك المحلي الذي تستخدمه رسوم إضافية لاستقبال
                        حوالات بنكية دولية أو رسوم لتحويل العملة من الدولار إلى
                        العملة المحلية.
                      </p>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Row>
            </Tab.Container>

            <div className="d-flex justify-content-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="cancel-btn"
                type="button"
              >
                {t("cancel")}
              </button>
              <button
                className="order-now text-center"
                type="submit"
                disabled={isPending}
              >
                {t("balance.withdrawBalance")}
              </button>
            </div>
          </form>
        </FormProvider>
      </Modal.Body>
    </Modal>
  );
};

export default WithdrawModal;
