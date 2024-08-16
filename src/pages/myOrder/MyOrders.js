import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { getOrders } from "../../features/user/userSlice";
import { Link, NavLink } from "react-router-dom";
import { formatDate } from "../../utils/importantFunctions";
import Container from "../../components/Container";
import "./MyOrder.css";
import Loader from "../../components/loader/Loader";
import dayjs from "dayjs";

const findDate = (number = 7) => {
  const today = dayjs();
  const deliveryDate = today.add(number, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");
  return dateString;
};

const MyOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  const { userOrders, isLoading } = useSelector((state) => state.auth);
  return (
    <>
      {isLoading && <Loader />}
      <div className="main">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {userOrders !== null && userOrders?.length !== 0 ? (
            userOrders?.map((order) => {
              return (
                <div className="order-container" key={order?._id}>
                  <div className="order-header">
                    <div className="order-header-left-section">
                      <div className="order-date">
                        <div className="order-header-label">Order Placed:</div>
                        <div>{`${formatDate(order?.createdAt)}`}</div>
                      </div>
                      <div className="order-total">
                        <div className="order-header-label">Total:</div>
                        <div>{`${order?.totalPrice}`}</div>
                      </div>
                    </div>

                    <div className="order-header-right-section">
                      <div className="order-header-label">Order ID:</div>
                      <div>{`${order?._id}`}</div>
                    </div>
                  </div>

                  <div className="order-details-grid">
                    {order?.orderItems?.map((orderedProduct) => {
                      return (
                        <>
                          <div
                            className="product-image-container"
                            key={orderedProduct?._id + "a"}
                          >
                            <img
                              src={`${orderedProduct?.product?.image?.[0]?.url}`}
                            />
                          </div>

                          <div
                            className="product-details"
                            key={orderedProduct?._id + "b"}
                          >
                            <div className="product-name">
                              {`${orderedProduct?.product?.title}`}
                            </div>
                            <div className="product-delivery-date">
                              Arriving on:{" "}
                              {`${formatDate(
                                orderedProduct?.product?.createdAt
                              )}`}
                            </div>
                            <div className="product-quantity">
                              Quantity: {`${orderedProduct?.product?.quantity}`}
                            </div>
                            <button className="buy-again-button button-primary">
                              <img
                                className="buy-again-icon"
                                src="../../images/icons/buy-again.png"
                              />
                              <span className="buy-again-message">
                                Buy it again
                              </span>
                            </button>
                          </div>

                          <div
                            className="product-actions"
                            key={orderedProduct?._id + "c"}
                          >
                            <a href="tracking.html">
                              <button className="track-package-button">
                                Track package
                              </button>
                            </a>
                          </div>
                        </>
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

// const MyOrders = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getOrders());
//   }, [dispatch]);

//   const { userOrders, isLoading } = useSelector((state) => state.auth);

//   let count = 0;
//   let sNumber = function increment() {
//     return ++count;
//   };

//   let data = [];

//   if (userOrders && userOrders?.length !== 0) {
//     for (let i = 0; i < userOrders?.length; i++) {
//       for (let j = 0; j < userOrders?.[i]?.orderItems?.length; j++) {
//         let order = userOrders?.[i]?.orderItems?.[j];
//         data.push(
//           <div className="card" key={order?._id}>
//             <NavLink
//               className="single-order"
//               to={`/my-order/${userOrders?.[i]?._id}/${order?._id}`}
//             >
//               <div className="card-img">
//                 <img
//                   src={`${order?.product?.image?.[0]?.url}`}
//                   alt="product-image"
//                 />
//               </div>
//               <div className="card-body">
//                 <span>{order?.product?.title}</span>
//                 <span className="card-price">{`₹${order?.product?.price}`}</span>
//               </div>
//               <div className="card-body">
//                 <span>{userOrders?.[i]?.orderStatus}</span>
//               </div>
//             </NavLink>
//           </div>
//         );
//       }
//     }
//   }
//   // console.log(userOrders);
//   // console.log(data);
//   return (
//     <>
//       {isLoading && <Loader />}
//       <div className="order-container">
//         <div className="container-xxl py-5">
//           {userOrders && userOrders?.length !== 0 ? (
//             data
//           ) : (
//             <div>Your order is patiently waiting for your treasures.</div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

export default MyOrders;
