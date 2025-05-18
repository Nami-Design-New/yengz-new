import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useRemoveCartItem from "../../hooks/carts/useRemoveCartItem";
import useUpdateCartDevelopments from "../../hooks/carts/useUpdateCartDevelopments";
import CartItemOperations from "./CartItemOperations";

function CartBox({ item, cartObjList, setTotalCartPrice, totalCartPrice }) {
  const { t } = useTranslation();
  const [totalPrice, setTotalPrice] = useState(0);
  const [boxDevs, setBoxDevs] = useState([]);

  // Use hooks for cart operations
  const { removeItem, isRemoving } = useRemoveCartItem();
  const { updateDevelopments } = useUpdateCartDevelopments();

  useEffect(() => {
    if (cartObjList && item) {
      setBoxDevs(
        cartObjList.filter((i) => {
          return i.service_id === item.service_id;
        })
      );
    }
  }, [item, cartObjList]);

  useEffect(() => {
    const developmentsPrice = item?.service?.developments
      ?.filter((dev) => dev.in_cart)
      .reduce((acc, dev) => acc + dev.price, 0);
    setTotalPrice(
      item?.quantity * item?.service?.price + developmentsPrice * item?.quantity
    );
  }, [item]);

  const handleQuantityChange = (newQuantity) => {
    // Calculate price difference and update total cart price
    const priceDifference = (newQuantity - item.quantity) * item.service.price;
    setTotalCartPrice(totalCartPrice + priceDifference);
  };

  // Handle updating developments in cart
  const handleCheckboxChange = (dev_id, cart_id) => {
    updateDevelopments({
      development_id: dev_id,
      cart_id,
    });
  };

  return (
    <div className="service container">
      <div className="row">
        <div className="col-lg-7 col-12">
          <div className="service-head">
            <Link to={`/services/${item?.service?.id}`} className="img">
              <img src={item?.service?.image} alt="service" />
            </Link>
            <div className="title">
              <h5>{item?.service?.title}</h5>
              <div className="owner">
                <div className="owner-avatar">
                  <img src={item?.service?.user?.image} alt="owner" />
                </div>
                <span>{item?.service?.user?.name}</span>
              </div>
            </div>
          </div>
          <div className="more-develop">
            {item?.service?.developments &&
              item?.service?.developments.length > 0 && (
                <div className="more-develop">
                  {item?.service?.developments.map((dev) => (
                    <div
                      className="d-flex input-field align-items-baseline"
                      key={dev?.id}
                    >
                      <input
                        type="checkbox"
                        id={`check-${dev.id}`}
                        name={`check-${dev.id}`}
                        checked={boxDevs[0]?.developments?.includes(dev.id)}
                        onChange={() => handleCheckboxChange(dev.id, item?.id)}
                      />
                      <div className="label">
                        <label htmlFor={`check-${dev.id}`}>
                          {dev.description}
                        </label>
                        <p>
                          {t("services.compare")} {dev.price}${" "}
                          {t("services.percentageofExtraService")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
        <div className="col-lg-5 col-12">
          <div className="add-cart">
            {/* Use the CartItemOperations component */}
            <CartItemOperations
              item={item}
              onQuantityChange={handleQuantityChange}
            />
            <div className="total d-flex justify-content-between align-items-center">
              <p>
                {t("services.total")} : <br />
                {item?.service?.developments?.filter((e) => e.in_cart).length >
                  0 && (
                  <span>
                    +{" "}
                    <span id="num">
                      {
                        item?.service?.developments.filter((e) => e.in_cart)
                          .length
                      }
                    </span>{" "}
                    {t("services.extraService")}
                  </span>
                )}
              </p>
              <div className="d-flex gap-3 align-items-center">
                <h6 className="mb-0">
                  {totalPrice}
                  <i className="fa-solid fa-dollar-sign"></i>
                </h6>
                <button
                  className="delete_btn"
                  onClick={() => removeItem(item?.id)}
                  disabled={isRemoving}
                >
                  <i className="fa-regular fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartBox;
