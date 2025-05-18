import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import useCartList from "../hooks/carts/useCartList";
import useDeleteCart from "../hooks/carts/useDeleteCart";
import usePlaceOrder from "../hooks/carts/usePlaceOrder";
import ChargeModal from "../ui/cards/ChargeModal";
import OrderModal from "../ui/cards/OrderModal";
import CartBox from "../ui/cart/CartBox";
import DataLoader from "../ui/DataLoader";
import SubmitButton from "../ui/forms/SubmitButton";
import CollectionModal from "../ui/modals/CollectionModal";

const Cart = () => {
  const { data: cartQuery, isLoading } = useCartList();
  const { t } = useTranslation();
  const user = useSelector((state) => state.authedUser.user);

  // Custom hooks for cart operations
  const { deleteCart, isDeleting } = useDeleteCart();
  const { placeOrder, isPlacingOrder } = usePlaceOrder();

  // Derived state from cart data
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartObjList, setCartObjList] = useState([]);

  // Modal states
  const [showConfirmPayModel, setShowConfirmPayModel] = useState(false);
  const [showCollectionModel, setShowCollectionModel] = useState(false);
  const [showChargeModel, setShowChargeModel] = useState(false);

  // Calculate cart total price and prepare cart object list when cart data changes
  useEffect(() => {
    if (cartQuery?.data?.length > 0) {
      // Prepare cart object list for CartBox component
      const newCartObjList = cartQuery.data.map((item) => ({
        service_id: item?.service?.id,
        quantity: item?.quantity,
        developments: item?.service?.developments
          ?.filter((dev) => dev.in_cart !== false)
          .map((dev) => dev.id),
      }));
      setCartObjList(newCartObjList);

      // Calculate total cart price
      setTotalCartPrice(
        cartQuery?.data?.reduce((acc, item) => {
          return acc + item?.total;
        }, 0)
      );
    } else {
      // Reset state when cart is empty
      setCartObjList([]);
      setTotalCartPrice(0);
    }
  }, [cartQuery]);

  // Handle order placement
  const handlePlaceOrder = () => {
    placeOrder(undefined, {
      onSettled: () => {
        setShowConfirmPayModel(false);
      },
    });
  };

  // Check if user has enough balance before placing order
  const handleOrder = () => {
    user?.wallet < totalCartPrice
      ? setShowChargeModel(true)
      : setShowConfirmPayModel(true);
  };

  return isLoading ? (
    <DataLoader />
  ) : (
    <section className="cart-section container">
      <div className="row">
        {cartQuery?.data && cartQuery?.data?.length > 0 ? (
          <>
            <div className="cart-header col-12 p-2">
              <span
                className="add-to-collection-btn mx-2"
                onClick={() => setShowCollectionModel(true)}
              >
                {t("cart.addToCollection")}
              </span>
            </div>
            <div className="col-12 p-2">
              {cartQuery?.data?.map((item) => (
                <CartBox
                  item={item}
                  key={item.id}
                  cartObjList={cartObjList}
                  setTotalCartPrice={setTotalCartPrice}
                  totalCartPrice={totalCartPrice}
                />
              ))}
              <div className="col-lg-5 col-12 p-2">
                <div className="cartTotalPrice">
                  <p>{t("cart.totalCart")}:</p>
                  <h6 className="mb-0">
                    {totalCartPrice}
                    <i className="fa-solid fa-dollar-sign"></i>
                  </h6>
                </div>
              </div>
              <div className="container">
                <div className="row justify-content-center responsive-gap">
                  <div className="col-lg-6 col-md-6 col-12">
                    <button className="order-now" onClick={handleOrder}>
                      {t("services.orderNow")}
                    </button>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <SubmitButton
                      className="order-now delete"
                      name={t("cart.deleteCart")}
                      onClick={deleteCart}
                      loading={isDeleting}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="col-12 p-2">
            <div className="empty_cart">
              <img src="/images/empty-cart.svg" alt="empty-cart" />
              <h3>{t("cart.empty")}</h3>
              <Link to="/services">{t("cart.exploreServices")}</Link>
            </div>
          </div>
        )}
      </div>
      <OrderModal
        setShowModal={setShowConfirmPayModel}
        showModal={showConfirmPayModel}
        ballance={user?.wallet}
        cartTotalPrice={totalCartPrice}
        eventFunction={handlePlaceOrder}
        loading={isPlacingOrder}
      />
      <CollectionModal
        setShowModal={setShowCollectionModel}
        showModal={showCollectionModel}
        showDeleteFromCart={true}
      />
      <ChargeModal
        showModal={showChargeModel}
        setShowModal={setShowChargeModel}
        cartTotalPrice={totalCartPrice}
      />
    </section>
  );
};

export default Cart;
