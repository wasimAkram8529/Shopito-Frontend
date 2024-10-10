import React, { useEffect } from "react";
import "./TrackOrder.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { formatDate } from "../../utils/importantFunctions";
import { getAOrder } from "../../features/user/userSlice";
import "./MyOrder.css";
import { shortenText } from "../../utils/Validator";
import Loader from "../../components/loader/Loader";
import { useTranslation } from "react-i18next";

const TrackOrder = () => {
  const { t } = useTranslation(); // Initialize the translation hook
  const dispatch = useDispatch();
  const location = useLocation();
  const getOrderId = location.pathname.split("/")[2];
  const productId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getAOrder(getOrderId));
  }, [getOrderId]);

  const { order, isLoading } = useSelector((state) => state.auth);

  const product = order?.[0]?.orderItems?.filter((item) => {
    return item?.product?._id === productId;
  });

  return (
    <>
      {isLoading && <Loader />}
      <div className="main">
        <div className="order-tracking">
          <a
            className="back-to-orders-link link-primary"
            href={`/my-orders/${order?.[0]?.user?._id}`}
          >
            {t("back_to_orders")}
          </a>
          <div className="delivery-date">
            {t("arriving_on", { date: formatDate(order?.[0]?.createdAt) })}
          </div>

          <div className="product-info">{`${product?.[0]?.product?.title}`}</div>

          <div className="product-info">{t("quantity", { count: 1 })}</div>

          <img
            className="product-image"
            src={`${product?.[0]?.product?.image?.[0]?.url}`}
          />

          <div className="progress-labels-container">
            <div className="progress-label">{t("preparing")}</div>
            <div
              className={
                order?.[0]?.orderStatus === "Delivered"
                  ? "progress-label"
                  : "progress-label current-status"
              }
            >
              {t("shipped")}
            </div>
            <div
              className={
                order?.[0]?.orderStatus === "Delivered"
                  ? "progress-label current-status"
                  : "progress-label"
              }
            >
              {t("delivered")}
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className={
                order?.[0]?.orderStatus === "Delivered"
                  ? "progress-bar progress-bar-delivered"
                  : "progress-bar progress-bar-shipped"
              }
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackOrder;
