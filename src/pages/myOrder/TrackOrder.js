import React, { useEffect } from "react";
import "./TrackOrder.css";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useLocation, NavLink } from "react-router-dom";
import { formatDate } from "../../utils/importantFunctions";
import { getAOrder } from "../../features/user/userSlice";
import Container from "../../components/Container";
import "./MyOrder.css";
import { Timeline } from "antd";
import { shortenText } from "../../utils/Validator";
import Loader from "../../components/loader/Loader";

const TrackOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getOrderId = location.pathname.split("/")[2];
  const productId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getAOrder(getOrderId));
  }, [getOrderId]);

  // console.log(productId);
  const { order, isLoading } = useSelector((state) => state.auth);
  // console.log(order);

  const product = order?.[0]?.orderItems?.filter((item) => {
    return item?.product?._id === productId;
  });

  // console.log(product);
  console.log(order?.[0]?.createdAt);
  return (
    <>
      {isLoading && <Loader />}
      <div className="main">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/my-orders">
            View all orders
          </a>
          <div className="delivery-date">
            Arriving on {`${formatDate(order?.[0]?.createdAt)}`}
          </div>

          <div className="product-info">{`${product?.[0]?.product?.title}`}</div>

          <div className="product-info">Quantity: 1</div>

          <img
            className="product-image"
            src={`${product?.[0]?.product?.image?.[0]?.url}`}
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
};

// const ViewOrder = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const getOrderId = location.pathname.split("/")[2];
//   const productId = location.pathname.split("/")[3];

//   useEffect(() => {
//     dispatch(getAOrder(getOrderId));
//   }, [getOrderId]);

//   const { order, isLoading } = useSelector((state) => state.auth);
//   // console.log(order);

//   const product = order?.[0]?.orderItems.filter((item) => {
//     return item?._id == productId;
//   });

//   console.log(product);

//   let count = 0;
//   let sNumber = function increment() {
//     return ++count;
//   };
//   let userName =
//     order?.[0]?.shippingInfo?.firstName +
//     " " +
//     order?.[0]?.shippingInfo?.lastName;

//   let address =
//     order?.[0]?.shippingInfo?.address +
//     " " +
//     order?.[0]?.shippingInfo?.city +
//     " " +
//     order?.[0]?.shippingInfo?.pinCode +
//     "," +
//     "India";
//   return (
//     <div className="order-container py-5">
//       {order ? (
//         <>
//           <div className="container-xxl order pt-3">
//             <p>Delivery Details</p>
//             <p>{userName}</p>
//             <p className="address">{address}</p>
//           </div>
//           <div className="container-xxl order order-details py-3">
//             <div className="card">
//               <div className="card-img">
//                 <img
//                   src={product?.[0]?.product?.image?.[0]?.url}
//                   alt="product-image"
//                 />
//               </div>
//               <div className="card-body">
//                 <div className="card-title">
//                   {shortenText(product?.[0]?.product?.title, 10)}
//                 </div>
//                 <div className="card-price">{`₹${product?.[0]?.product?.price}`}</div>
//               </div>
//             </div>
//             <div className="shipment-status">
//               <div className="order-status">
//                 <span>Order Confirmed</span>
//                 <span>Shipped</span>
//                 <span>Out for delivery</span>
//                 <span>Delivery</span>
//               </div>
//               <div className="order-status-line">
//                 <div>
//                   <p className="dot"></p>
//                   <div>
//                     <p className="line"></p>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="dot"></p>
//                   <div>
//                     <p className="line"></p>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="dot"></p>
//                   <div>
//                     <p className="line"></p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <Timeline
//               items={[
//                 {
//                   children: "Order Confirmed",
//                 },
//                 {
//                   children: "Shipped",
//                 },
//                 {
//                   children: "Out for delivery",
//                 },
//                 {
//                   children: "Delivery",
//                 },
//               ]}
//               className="vertical-shipment-status"
//             />
//           </div>
//         </>
//       ) : (
//         <div>Please Select a order</div>
//       )}
//     </div>
//   );
// };

export default TrackOrder;
