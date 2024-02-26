import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useLocation, NavLink } from "react-router-dom";
import { formatDate } from "../utils/importantFunctions";
import { getAOrder } from "../features/user/userSlice";
import Container from "../components/Container";

const columns = [
  {
    title: "Full Name",
    dataIndex: "name",
    width: 100,
    key: "name",
    fixed: "left",
  },
  {
    title: "SNo",
    dataIndex: "key",
    width: 100,
    key: "key",
    fixed: "left",
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    key: "1",
    width: 150,
  },
  {
    title: "Order Category",
    dataIndex: "orderCategory",
    key: "2",
    width: 150,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "3",
    width: 150,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "4",
    width: 150,
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "5",
    width: 150,
  },
  {
    title: "Order Category",
    dataIndex: "orderCategory",
    key: "6",
    width: 150,
  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
    key: "7",
    width: 150,
  },
  {
    title: "Order Status",
    dataIndex: "orderStatus",
    key: "8",
    width: 150,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 100,
  },
];
const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getOrderId = location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(getAOrder(getOrderId));
  }, [getOrderId]);

  const { order, isLoading } = useSelector((state) => state.auth);
  //console.log(order);

  let count = 0;
  let sNumber = function increment() {
    return ++count;
  };
  const data1 = [];
  if (!isLoading && order?.length !== 0) {
    for (let i = 0; i < order?.[0]?.orderItems?.length; i++) {
      const product = order?.[0]?.orderItems[i];
      //console.log(product);
      data1.push({
        key: sNumber(),
        orderDate: formatDate(order?.[0]?.createdAt),
        image: (
          <img
            className="rounded"
            style={{ width: "50px", height: "50px" }}
            src={product?.product?.image?.[0]?.url}
            alt={product?.product?.title}
          ></img>
        ),
        quantity: product?.quantity,
        color: (
          <span
            style={{
              backgroundColor: `${product?.color?.title}`,
              width: "30px",
              height: "30px",
              borderRadius: "15px",
            }}
            className="colors"
          ></span>
        ),
        orderCategory: product?.product?.category,
        totalAmount: product?.price,
        orderStatus: order?.[0]?.orderStatus,
        name: order?.[0]?.user?.firstName + " " + order?.[0]?.user?.lastName,
        action: (
          <div className="action-menu">
            <NavLink
              className="ms-3 fs-2 text-danger"
              to={`/product/${product?.product?._id}`}
            >
              <AiOutlineEye className="fs-5" />
            </NavLink>
            <button className="border-0 bg-white ms-3 fs-2 text-danger">
              <AiFillDelete className="fs-5" />
            </button>
          </div>
        ),
      });
    }
  }
  return (
    <Container class1="py-5">
      <div>
        <h3 className="mb-4 title">View Order</h3>
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

export default ViewOrder;
