import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { getOrders } from "../features/user/userSlice";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/importantFunctions";
import Container from "../components/Container";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
    width: 25,
    key: "key",
    fixed: "left",
  },
  {
    title: "Order ID",
    dataIndex: "orderId",
    width: 30,
    key: "orderId",
    fixed: "left",
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    key: "1",
    width: 100,
  },
  {
    title: "Customer Info",
    dataIndex: "customerInfo",
    key: "2",
    width: 100,
  },
  {
    title: "View Order",
    dataIndex: "viewOrder",
    key: "3",
    width: 100,
  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
    key: "4",
    width: 100,
  },
  {
    title: "Order Status",
    dataIndex: "orderStatus",
    key: "orderStatus",
    fixed: "right",
    width: 50,
  },
];

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
  const data1 = [];
  //console.log(userOrders);

  if (!isLoading && userOrders?.length !== 0) {
    for (let i = 0; i < userOrders?.length; i++) {
      const inputDateString = userOrders?.[i]?.createdAt;
      const formattedDateString = formatDate(inputDateString);

      data1.push({
        key: sNumber(),
        orderId: userOrders?.[i]?.paymentInfo?.razorpayOrderId,
        orderDate: formattedDateString,
        customerInfo:
          userOrders?.[i]?.user?.firstName + userOrders?.[i]?.user?.lastName,
        viewOrder: (
          <Link className="" to={`/my-orders/${userOrders?.[i]?._id}`}>
            Click Here
          </Link>
        ),
        totalAmount: userOrders?.[i]?.totalPrice,
        orderStatus: userOrders?.[i]?.orderStatus,
      });
    }
  }
  return (
    <Container class1="py-5">
      <div>
        <h3 className="mb-4 title">Orders</h3>
        <div>
          <Table
            columns={columns}
            dataSource={data1}
            scroll={{
              x: 1500,
              y: 300,
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default MyOrders;
