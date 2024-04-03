import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { getOrders } from "../../features/user/userSlice";
import { Link, NavLink } from "react-router-dom";
import { formatDate } from "../../utils/importantFunctions";
import Container from "../../components/Container";
import "./MyOrder.css";

const MyOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const { userOrders, isLoading } = useSelector((state) => state.auth);

  let count = 0;
  let sNumber = function increment() {
    return ++count;
  };

  let data = [];

  if (userOrders && userOrders?.length !== 0) {
    for (let i = 0; i < userOrders?.length; i++) {
      for (let j = 0; j < userOrders?.[i]?.orderItems?.length; j++) {
        let order = userOrders?.[i]?.orderItems?.[j];
        data.push(
          <div className="card" key={order?._id}>
            <NavLink
              className="single-order"
              to={`/my-order/${userOrders?.[i]?._id}/${order?._id}`}
            >
              <div className="card-img">
                <img
                  src={`${order?.product?.image?.[0]?.url}`}
                  alt="product-image"
                />
              </div>
              <div className="card-body">
                <span>{order?.product?.title}</span>
                <span className="card-price">{`₹${order?.product?.price}`}</span>
              </div>
              <div className="card-body">
                <span>{userOrders?.[i]?.orderStatus}</span>
              </div>
            </NavLink>
          </div>
        );
      }
    }
  }
  // console.log(userOrders);
  // console.log(data);
  return (
    <div className="order-container">
      <div className="container-xxl py-5">
        {userOrders && userOrders?.length !== 0 ? (
          data
        ) : (
          <div>Your order is patiently waiting for your treasures.</div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
