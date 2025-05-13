import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import useServiceDetails from "../hooks/services/useGetSerciveDetails";
import useGetComments from "../hooks/comments/useGetComments";
import useCartList from "../hooks/carts/useCartList";
import useGetRates from "../hooks/rates/useGetRates";
import DataLoader from "../ui/DataLoader";
import ErrorPage from "./ErrorPage";
import { updateEntireCart } from "../redux/slices/cart";
import ServiceSlider from "../ui/services/ServiceSlider";
import ServiceOwnerCard from "../ui/services/ServiceOwnerCard";
import SimilarServices from "../ui/cards/SimilarServices";
import CollectionModal from "../ui/modals/CollectionModal";
import UserServiceCard from "../ui/services/UserServiceCard";
import RateCard from "../ui/cards/RateCard";
import { addToCart } from "../services/apiCart";
import { toast } from "sonner";

function ServiceDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [showCollectionModel, setShowCollectionModel] = useState(false);

  const [inCart, setInCart] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const { data: rates } = useGetRates();
  const { data: service, isLoading } = useServiceDetails();
  const { data: cartQuery } = useCartList();
  const { data: comments } = useGetComments();

  const cart = useSelector((state) => state.cart.cartList);
  const user = useSelector((state) => state.authedUser.user);

  const [cartObj, setCartObj] = useState({
    service_id: service?.id,
    quantity: 1,
    developments: [],
  });

  useEffect(() => {
    if (cartQuery) {
      dispatch(
        updateEntireCart(
          cartQuery?.data?.map((item) => ({
            id: item.id,
            service_id: item.service?.id,
            quantity: item.quantity,
            developments: item?.service?.developments
              ?.filter((dev) => dev.in_cart)
              .map((dev) => dev.id),
          }))
        )
      );
    }
  }, [cartQuery, dispatch]);

  useEffect(() => {
    if (
      service?.accepted === 0 &&
      service?.refuse_reason !== null &&
      service?.user_id !== user?.id
    ) {
      navigate("/services");
    }
  }, [service, user]);

  useEffect(() => {
    if (cart && service) {
      const itemFromCart = cart?.find(
        (item) => item?.service_id === service?.id
      );
      const servicePrice = itemFromCart
        ? itemFromCart?.quantity * service?.price
        : service?.price;
      const developmentsTotalPrice =
        itemFromCart?.developments?.reduce((acc, devId) => {
          const development = service?.developments?.find(
            (dev) => dev.id === devId
          );
          return acc + (development?.price || 0);
        }, 0) || 0;
      setCartObj({
        id: itemFromCart?.id,
        service_id: service.id,
        quantity: itemFromCart ? itemFromCart.quantity : 1,
        developments: itemFromCart ? itemFromCart.developments : [],
      });
      setTotalPrice(
        (servicePrice || 0) +
          (developmentsTotalPrice || 0) * (itemFromCart?.quantity || 1)
      );
      if (itemFromCart?.id) {
        setInCart(true);
      }
    }
  }, [cart, service]);

  // increase quantity
  const handleIncreaseQuantity = async () => {
    if (inCart) {
      try {
        setFormLoading(true);
        await increaseCartQuantity(cartObj?.id, queryClient);
      } catch (error) {
        console.error(error);
      } finally {
        setFormLoading(false);
      }
    } else {
      setCartObj((prevCartObj) => ({
        ...prevCartObj,
        quantity: prevCartObj.quantity + 1,
      }));
    }
    const newQuantity = cartObj.quantity + 1;
    const developmentsTotalPrice =
      cartObj.developments.reduce((acc, devId) => {
        const development = service?.developments?.find(
          (dev) => dev.id === devId
        );
        return acc + (development?.price || 0);
      }, 0) * newQuantity;
    setTotalPrice((service?.price || 0) * newQuantity + developmentsTotalPrice);
  };
  // decrease quantity
  const handleDecreaseQuantity = async () => {
    if (cartObj.quantity > 1) {
      if (inCart) {
        try {
          setFormLoading(true);
          await decreaseCartQuantity(cartObj?.id, queryClient);
        } catch (error) {
          console.error(error);
        } finally {
          setFormLoading(false);
        }
      } else {
        setCartObj((prevCartObj) => ({
          ...prevCartObj,
          quantity: prevCartObj.quantity - 1,
        }));
      }
      const newQuantity = cartObj.quantity - 1;
      const developmentsTotalPrice =
        cartObj.developments.reduce((acc, devId) => {
          const development = service?.developments?.find(
            (dev) => dev.id === devId
          );
          return acc + (development?.price || 0);
        }, 0) * newQuantity;
      setTotalPrice(
        (service?.price || 0) * newQuantity + developmentsTotalPrice
      );
    } else return;
  };
  // developments

  const handleCheckboxChange = async (id) => {
    const isChecked = cartObj.developments.includes(id);
    if (inCart) {
      try {
        await updateDevelopmentsInCart(
          {
            cart_id: cartObj?.id,
            development_id: id,
          },
          queryClient
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      setCartObj((prevCartObj) => ({
        ...prevCartObj,
        developments: isChecked
          ? prevCartObj.developments.filter((item) => item !== id)
          : [...prevCartObj.developments, id],
      }));
    }
    setTotalPrice((prevTotalPrice) =>
      isChecked
        ? prevTotalPrice -
          (service?.developments?.find((item) => item?.id === id)?.price *
            cartObj?.quantity || 0)
        : prevTotalPrice +
          (service?.developments?.find((item) => item?.id === id)?.price *
            cartObj?.quantity || 0)
    );
  };
  // add to cart
  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
    } else {
      try {
        await addToCart(cartObj, queryClient);
        toast.success(t("cart.addToCartSuccess"));
        navigate("/cart");
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isLoading) {
    return <DataLoader />;
  }

  if (!isLoading && !service) {
    return <ErrorPage />;
  }
  return (
    <>
      <section className="service-details container">
        <div className="row">
          {service?.refuse_reason !== null && (
            <div className="col-12 p-2 mb-3">
              <div className="refuse_reason">
                <p>
                  {t("services.refuseReason")}: {service?.refuse_reason}
                </p>
              </div>
            </div>
          )}

          <div className="col-lg-7 col-12 p-2">
            <div className="service-content">
              <ServiceSlider images={service?.images} />
              <div className="content">
                <ServiceOwnerCard service={service} />
                <h4>{service?.title}</h4>
                <p>
                  <Link to={`/services?categories=${service?.category?.id}`}>
                    {service?.category?.name}
                  </Link>{" "}
                  /{" "}
                  <Link
                    to={`/services?sub_categories=${service?.sub_category_id}`}
                  >
                    {service?.sub_category?.name}
                  </Link>
                </p>
                <p>{service?.description}</p>
                {service?.is_my_service === false && (
                  <>
                    {service?.developments &&
                      service?.developments.length > 0 && (
                        <div className="more-develop">
                          <h6>
                            <img src={"/images/vector88.png"} alt="icon" />{" "}
                            {t("services.developmentsAvailable")}
                          </h6>
                          {service?.developments.map((development) => (
                            <div
                              className="d-flex input-field align-items-baseline"
                              key={development?.id}
                            >
                              <input
                                type="checkbox"
                                id={`check-${development.id}`}
                                name={`check-${development.id}`}
                                checked={cartObj.developments.includes(
                                  development.id
                                )}
                                onChange={() =>
                                  handleCheckboxChange(development.id)
                                }
                              />
                              <div className="label">
                                <label htmlFor={`check-${development.id}`}>
                                  {development.description}
                                </label>
                                <p>
                                  {t("services.compare")} {development.price}{" "}
                                  {t("services.percentageofExtraService")}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    <div className="add-cart">
                      <div className="input-field">
                        <button
                          className="add"
                          disabled={formLoading}
                          onClick={handleIncreaseQuantity}
                        >
                          <i className="fa-regular fa-plus"></i>
                        </button>
                        <input
                          type="number"
                          min={1}
                          readOnly
                          value={cartObj.quantity}
                          onChange={(e) =>
                            setCartObj({
                              ...cartObj,
                              quantity: e.target.value,
                            })
                          }
                        />
                        <button
                          className="minus"
                          onClick={handleDecreaseQuantity}
                        >
                          <i className="fa-regular fa-minus"></i>
                        </button>
                      </div>
                      <div className="total d-flex justify-content-between align-items-center">
                        <p>
                          {t("services.total")} : <br />
                          {cartObj.developments.length > 0 && (
                            <span>
                              +{" "}
                              <span id="num">
                                {cartObj.developments.length}
                              </span>{" "}
                              {t("services.extraService")}
                            </span>
                          )}
                        </p>
                        <h6>
                          {totalPrice || 0}
                          <i className="fa-solid fa-dollar-sign"></i>
                        </h6>
                      </div>
                      <div className="d-flex w-100 gap-2">
                        {!inCart && (
                          <button
                            className="request-order"
                            onClick={handleAddToCart}
                          >
                            <i className="fa-regular fa-cart-plus"></i>{" "}
                            {t("services.addToCart")}
                          </button>
                        )}
                        <button
                          className="request-order"
                          onClick={() => {
                            if (!user) {
                              navigate("/login");
                            } else {
                              setShowCollectionModel(true);
                            }
                          }}
                        >
                          <i className="fa-light fa-plus"></i>
                          {t("cart.addToCollection")}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-12 p-2">
            <UserServiceCard service={service} />

            <Link to="/terms-conditions" className="warrenty_container">
              <img src="/images/warrenty.png" alt="warrenty" />
            </Link>

            <div className="rating-cards-container">
              {rates?.data?.map((rate) => (
                <RateCard key={rate?.id} rate={rate} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {service?.similar_services?.length > 0 && (
        <SimilarServices services={service?.similar_services} />
      )}
      <CollectionModal
        setShowModal={setShowCollectionModel}
        showModal={showCollectionModel}
        showDeleteFromCart={false}
      />
    </>
  );
}

export default ServiceDetails;
