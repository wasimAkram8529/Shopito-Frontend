import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/importantFunctions";
import "./MyOrder.css";
import Loader from "../../components/loader/Loader";
import buyItAgainImg from "../../images/buy-again.png";
import { shortenText } from "../../utils/Validator";
import { useTranslation } from "react-i18next";

const MyOrders = () => {
  const { t } = useTranslation(); // Initialize the translation hook
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const { userOrders, isLoading } = useSelector((state) => state.auth);

  return (
    <>
      {isLoading && <Loader />}
      <div className="main">
        <div className="page-title">{t("your_orders")}</div>

        <div className="orders-grid">
          {userOrders !== null && userOrders?.length !== 0 ? (
            userOrders?.map((order) => {
              return (
                <div className="order-container" key={order?._id}>
                  <div className="order-header">
                    <div className="order-header-left-section">
                      <div className="order-date">
                        <div className="order-header-label">
                          {t("order_placed")}
                        </div>
                        <div>{`${formatDate(order?.createdAt)}`}</div>
                      </div>
                      <div className="order-total">
                        <div className="order-header-label">{t("total")}</div>
                        <div>{`₹${order?.totalPrice}`}</div>
                      </div>
                    </div>

                    <div className="order-header-right-section">
                      <div className="order-header-label">{t("order_id")}</div>
                      <div>{`${order?._id}`}</div>
                    </div>
                  </div>

                  <div className="order-details-grid">
                    {order?.orderItems?.map((orderedProduct) => {
                      return (
                        <React.Fragment key={orderedProduct?._id}>
                          <div className="product-image-container">
                            <img
                              src={`${orderedProduct?.product?.image?.[0]?.url}`}
                            />
                          </div>

                          <div className="product-details">
                            <div className="product-name">
                              {`${shortenText(
                                orderedProduct?.product?.title,
                                15
                              )}`}
                            </div>
                            <div className="product-delivery-date">
                              {t("arriving_on", {
                                date:
                                  order?.deliveryDate === null
                                    ? formatDate(order?.createdAt)
                                    : order?.deliveryDate,
                              })}{" "}
                            </div>
                            <div className="product-quantity">
                              {t("quantity", {
                                count: orderedProduct?.quantity,
                              })}
                            </div>
                            <button
                              className="buy-again-button button-primary"
                              onClick={() => {
                                navigate(
                                  `/product/${orderedProduct?.product?._id}`
                                );
                              }}
                            >
                              <img
                                className="buy-again-icon"
                                src={buyItAgainImg}
                              />
                              <span className="buy-again-message">
                                {t("buy_again")}
                              </span>
                            </button>
                          </div>

                          <div className="product-actions">
                            <a
                              href={`/my-order/${order?._id}/${orderedProduct?.product?._id}`}
                            >
                              <button className="track-package-button button-secondary">
                                {t("track_package")}
                              </button>
                            </a>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrders;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrders } from "../../features/user/userSlice";
// import { useNavigate } from "react-router-dom";
// import { formatDate } from "../../utils/importantFunctions";
// import "./MyOrder.css";
// import Loader from "../../components/loader/Loader";
// import buyItAgainImg from "../../images/buy-again.png";
// import { shortenText } from "../../utils/Validator";

// const MyOrders = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(getOrders());
//   }, [dispatch]);
//   const { userOrders, isLoading } = useSelector((state) => state.auth);
//   return (
//     <>
//       {isLoading && <Loader />}
//       <div className="main">
//         <div className="page-title">Your Orders</div>

//         <div className="orders-grid">
//           {userOrders !== null && userOrders?.length !== 0 ? (
//             userOrders?.map((order) => {
//               return (
//                 <div className="order-container" key={order?._id}>
//                   <div className="order-header">
//                     <div className="order-header-left-section">
//                       <div className="order-date">
//                         <div className="order-header-label">Order Placed:</div>
//                         <div>{`${formatDate(order?.createdAt)}`}</div>
//                       </div>
//                       <div className="order-total">
//                         <div className="order-header-label">Total:</div>
//                         <div>{`₹${order?.totalPrice}`}</div>
//                       </div>
//                     </div>

//                     <div className="order-header-right-section">
//                       <div className="order-header-label">Order ID:</div>
//                       <div>{`${order?._id}`}</div>
//                     </div>
//                   </div>

//                   <div className="order-details-grid">
//                     {order?.orderItems?.map((orderedProduct) => {
//                       return (
//                         <>
//                           <div
//                             className="product-image-container"
//                             key={orderedProduct?._id + 1}
//                           >
//                             <img
//                               src={`${orderedProduct?.product?.image?.[0]?.url}`}
//                             />
//                           </div>

//                           <div
//                             className="product-details"
//                             key={orderedProduct?._id + 2}
//                           >
//                             <div className="product-name">
//                               {`${shortenText(
//                                 orderedProduct?.product?.title,
//                                 15
//                               )}`}
//                             </div>
//                             <div className="product-delivery-date">
//                               Arriving on:{" "}
//                               {order?.deliveryDate === null
//                                 ? formatDate(order?.createdAt)
//                                 : order?.deliveryDate}
//                             </div>
//                             <div className="product-quantity">
//                               Quantity: {`${orderedProduct?.quantity}`}
//                             </div>
//                             <button
//                               className="buy-again-button button-primary"
//                               onClick={() => {
//                                 navigate(
//                                   `/product/${orderedProduct?.product?._id}`
//                                 );
//                               }}
//                             >
//                               <img
//                                 className="buy-again-icon"
//                                 src={buyItAgainImg}
//                               />
//                               <span className="buy-again-message">
//                                 Buy it again
//                               </span>
//                             </button>
//                           </div>

//                           <div
//                             className="product-actions"
//                             key={orderedProduct?._id + 3}
//                           >
//                             <a
//                               href={`/my-order/${order?._id}/${orderedProduct?.product?._id}`}
//                             >
//                               <button className="track-package-button button-secondary">
//                                 Track package
//                               </button>
//                             </a>
//                           </div>
//                         </>
//                       );
//                     })}
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div></div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyOrders;
