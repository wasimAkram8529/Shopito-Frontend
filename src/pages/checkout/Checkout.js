import "./Checkout.css";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { indianStates } from "../../utils/Data";
import axios from "axios";
import { clearCart, createOrder } from "../../features/user/userSlice";
import { formateCurrency } from "../../utils/money";
import Loader from "../../components/loader/Loader";
import { useTranslation } from "react-i18next";

let shippingAddressSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is Required"),
  address: Yup.string().required("Address is Required"),
  city: Yup.string().required("City is Required"),
  pinCode: Yup.string().required("Pin Code is Required"),
  state: Yup.string().required("State is Required"),
  country: Yup.string().required("Country is Required"),
});

const Checkout = (props) => {
  const location = useLocation();
  const productAmount = location.state.totalAmount;
  const deliveryDate = location.state.deliveryDate;
  const product = location.state.product;
  const quantity = location.state.quantity;
  //console.log(product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userCart, userOrders, isLoading } = useSelector(
    (state) => state.auth
  );
  const { t } = useTranslation();
  // const [shippingInfo, setShippingInfo] = useState({});

  let totalAmount = productAmount;

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const checkOutHandler = async (shippingInfo) => {
    // Load Razorpay SDK
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    // console.log(res);
    if (!res) {
      alert("Razorpay SDK failed to Load");
      return;
    }
    // Make request to create a checkout order
    try {
      const result = await axios.post(
        `${BACKEND_URL}/api/user/order/checkout`,
        { amount: totalAmount }
      );

      //console.log(result.status !== 200);
      if (result.status !== 200) {
        alert("Failed to create checkout order");
        return;
      }

      //console.log(result.data);
      // Extract data from the response
      const { amount, id: order_id, currency } = result.data.order;

      // Configure options for Razorpay payment
      //console.log(amount);
      const options = {
        key: "rzp_test_WSxAAGxZXsLTOQ", // Enter the Key ID generated from the Dashboard
        amount: amount,
        currency: currency,
        name: "ShopIto",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          // Verify the payment
          try {
            const result = await axios.post(
              `${BACKEND_URL}/api/user/order/paymentVerification`,
              data
            );

            // Display result of payment verification
            // console.log(result);
            // alert(JSON.stringify(result.data));
            if (result.data) {
              let totalPrice = totalAmount;
              const orderDetails = [
                {
                  product: product?._id,
                  color: product?.color?.[0]?._id,
                  quantity: quantity,
                  price: totalAmount,
                },
              ];
              const orderItems = product
                ? orderDetails
                : userCart.map((cartItem) => {
                    return {
                      product: cartItem?.productId?._id,
                      color: cartItem?.color?._id,
                      quantity: cartItem?.quantity,
                      price: cartItem?.quantity * cartItem?.price,
                    };
                  });

              const data = {
                shippingInfo,
                orderItems,
                totalPrice,
                totalPriceAfterDiscount: totalAmount - 500,
                paymentInfo: result.data,
                deliveryDate,
              };
              //console.log(data);
              dispatch(createOrder(data)).then((response) => {
                if (!product && response.payload.status === "ok") {
                  dispatch(clearCart());
                }
              });
              // dispatch(clearCart());
              setTimeout(() => {
                navigate(`/my-orders/${userOrders?.[0]?.user?._id}`);
              }, 2000);
            }
          } catch (error) {
            alert("Failed to verify payment");
          }
        },
        prefill: {
          name: "ShopIto",
          email: "shopito@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Under Development",
        },
        theme: {
          color: "#61dafb",
        },
      };

      // Create payment object and open payment modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
      alert("Failed to create checkout order");
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      state: "",
      pinCode: "",
      city: "",
      address: "",
      others: "",
      country: "",
    },
    validationSchema: shippingAddressSchema,
    onSubmit: (values) => {
      // setShippingInfo(values);
      checkOutHandler(values);
    },
  });

  return (
    <>
      {isLoading && <Loader />}
      <Container class1="checkout-wrapper home-wrapper-2 py-5">
        <div>
          <div>
            <div>
              <h3 className="website-name">ShopIto</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/cart" className="text-dark">
                      {t("cart")}
                    </Link>
                  </li>
                  <span className="divider">/</span>
                  <li className="breadcrumb-item active" aria-current="page">
                    {t("information")}
                  </li>
                  <span className="divider">/</span>
                  <li className="breadcrumb-item active">{"shipping"}</li>
                  <span className="divider">/</span>
                  <li className="breadcrumb-item active" aria-current="page">
                    {t("payment")}
                  </li>
                </ol>
              </nav>
              {/* <h4 className="total">Contact Information</h4>
              <p className="user-details">
                Wasim Akram(codelikearockstar@gmail.com)
              </p> */}
              <h4 className="mb-3">{t("shipping_address")}</h4>
            </div>
          </div>
          <div>
            <div className="checkout">
              <div
                className="product-details"
                style={{ backgroundColor: "lightgray" }}
              >
                {product ? (
                  <div className="border-bottom py-4">
                    <div className="d-flex mb-2 align-items-center justify-content-between">
                      <div className="d-flex gap-10 w-75">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-14px", right: "-3px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {quantity}
                          </span>
                          <img
                            className="img-fluid"
                            src={product?.image?.[0]?.url}
                            alt="Headphone"
                          />
                        </div>
                        <div>
                          <h5 className="title">{product?.title}</h5>
                          <p
                            className="size-color"
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "10px",
                              backgroundColor: `${product?.color?.[0]?.title}`,
                            }}
                          ></p>
                        </div>
                      </div>
                      <h5 className="total-price">{`₹${formateCurrency(
                        quantity * product?.price
                      )}`}</h5>
                    </div>
                  </div>
                ) : (
                  userCart?.length !== 0 &&
                  userCart?.map((cartItem) => {
                    return (
                      <div key={cartItem?._id} className="border-bottom py-4">
                        <div className="d-flex mb-2 align-items-center justify-content-between">
                          <div className="d-flex gap-10 w-75">
                            <div className="w-25 position-relative">
                              <span
                                style={{ top: "-14px", right: "-3px" }}
                                className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                              >
                                {cartItem?.quantity}
                              </span>
                              <img
                                className="img-fluid"
                                src={cartItem?.productId?.image?.[0]?.url}
                                alt="Headphone"
                              />
                            </div>
                            <div>
                              <h5 className="title">
                                {cartItem?.productId?.title}
                              </h5>
                              <p
                                className="size-color"
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "10px",
                                  backgroundColor: `${cartItem?.color?.title}`,
                                }}
                              ></p>
                            </div>
                          </div>
                          <h5 className="total-price">{`₹${
                            cartItem?.quantity * cartItem?.productId?.price
                          }`}</h5>
                        </div>
                      </div>
                    );
                  })
                )}
                <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                  <h4 className="total">{t("Total")}</h4>
                  <h5 className="total-price">{`₹${totalAmount}`}</h5>
                </div>
              </div>
              <div className=" address">
                <div>
                  <form
                    onSubmit={formik.handleSubmit}
                    action=""
                    className="d-flex flex-wrap gap-15 justify-content-between align-items-center"
                  >
                    <div className="flex-grow-1">
                      <select
                        name="country"
                        id="country"
                        className="form-control 
                  form-select"
                        value={formik.values.country}
                        onChange={formik.handleChange("country")}
                        onBlur={formik.handleBlur("country")}
                      >
                        <option value="" defaultValue="Select Country">
                          {t("select_country")}
                        </option>
                        <option>{t("india")}</option>
                      </select>
                      <div className="error">
                        {formik.touched.country && formik.errors.country ? (
                          <div>{formik.errors.country}</div>
                        ) : null}
                      </div>
                    </div>
                    <CustomInput
                      type="text"
                      placeholder={t("first_name")}
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                      className="w-100"
                    />
                    <div className="error">
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <div>{formik.errors.firstName}</div>
                      ) : null}
                    </div>
                    <CustomInput
                      type="text"
                      placeholder={t("last_name")}
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                      className="w-100"
                    />
                    <div className="error">
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <div>{formik.errors.lastName}</div>
                      ) : null}
                    </div>
                    <CustomInput
                      type="text"
                      placeholder={t("address")}
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                      className="w-100"
                    />
                    <div className="error">
                      {formik.touched.address && formik.errors.address ? (
                        <div>{formik.errors.address}</div>
                      ) : null}
                    </div>
                    {/* <CustomInput
                  type="text"
                  className="w-100"
                  placeholder="Apartment, Suite, etc (Optional)"
                /> */}
                    <CustomInput
                      type="text"
                      placeholder={t("apartment_Suite_etc_Optional")}
                      name="others"
                      value={formik.values.others}
                      onChange={formik.handleChange("others")}
                      onBlur={formik.handleBlur("others")}
                      className="w-100"
                    />
                    <div className="flex-grow-1">
                      <CustomInput
                        type="text"
                        placeholder={t("city")}
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange("city")}
                        onBlur={formik.handleBlur("city")}
                        className="flex-grow-1"
                      />
                      <div className="error">
                        {formik.touched.city && formik.errors.city ? (
                          <div>{formik.errors.city}</div>
                        ) : null}
                      </div>
                    </div>
                    {/* <CustomInput
                  type="text"
                  className="flex-grow-1"
                  placeholder="City"
                  required
                /> */}
                    <div className="flex-grow-1">
                      <select
                        name={t("state")}
                        id="state"
                        className="form-control 
                  form-select"
                        value={formik.values.state}
                        onChange={formik.handleChange("state")}
                        onBlur={formik.handleBlur("state")}
                      >
                        <option value="" defaultValue="Select State">
                          Select State
                        </option>
                        {indianStates.map((state, index) => (
                          <option key={index} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      <div className="error">
                        {formik.touched.state && formik.errors.state ? (
                          <div>{formik.errors.state}</div>
                        ) : null}
                      </div>
                    </div>
                    <CustomInput
                      type="text"
                      placeholder={t("pin_code")}
                      name="pinCode"
                      value={formik.values.pinCode}
                      onChange={formik.handleChange("pinCode")}
                      onBlur={formik.handleBlur("pinCode")}
                      className="w-100"
                    />
                    <div className="error">
                      {formik.touched.pinCode && formik.errors.pinCode ? (
                        <div>{formik.errors.pinCode}</div>
                      ) : null}
                    </div>
                    <div className="w-100" style={{ marginTop: "10px" }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/cart" className="text-dark">
                          <BiArrowBack /> {t("back")}
                        </Link>
                        <button
                          type="submit"
                          className=" border-0 bg-danger button"
                        >
                          {t("continue_to_payment")}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
