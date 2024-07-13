import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import Container from "../../components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAProduct } from "../../features/products/productSlice";
import { formateCurrency } from "../../utils/money";
import dayjs from "dayjs";

const findDate = (number = 7) => {
  const today = dayjs();
  const deliveryDate = today.add(number, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");
  return dateString;
};

const BuyNow = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productId = location?.pathname.split("/")[3];
  const product = location?.state?.product;
  //console.log(product);
  //console.log(product);

  const quantity = location?.state?.quantity;
  const [shipping, setShipping] = useState({
    id: "",
    deliveryDays: 0,
    price: 0,
  });

  const [totalBeforeTax, setTotalBeforeTax] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalAfterTax, setTotalAfterTax] = useState(0);
  const [shippingDateString, setDateString] = useState(findDate(7));
  const { isLoggedIn } = useSelector((state) => state.auth);

  let totalAmount = quantity * product?.price;

  useEffect(() => {
    const totalBeforeTax_ = quantity * product?.price + shipping?.price;
    const tax_ = totalBeforeTax_ * 0.1;
    const total = totalBeforeTax_ + tax;
    setTotalBeforeTax(totalBeforeTax_);
    setTax(tax_);
    setTotalAfterTax(total);
  }, [product, shipping]);

  //console.log(totalAfterTax);
  //console.log(product);
  return (
    <>
      <Meta title="ShopIto" />
      <BreadCrumb title="Buy Now" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div class="main">
          <div class="page-title">Review your order</div>

          <div class="checkout-grid">
            <div class="order-summary">
              <div class="cart-item-container">
                <div class="delivery-date">
                  Delivery date: {shippingDateString}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image" src={product?.image?.[0]?.url} />

                  <div class="cart-item-details">
                    <div class="product-name">{product?.title}</div>
                    <div class="product-price">{`₹${formateCurrency(
                      totalAmount
                    )}`}</div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">{quantity}</span>
                      </span>
                      {/* <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary">
                        Delete
                      </span> */}
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>

                    <div class="delivery-option">
                      <input
                        type="radio"
                        class="delivery-option-input"
                        name="delivery-option-2"
                        onClick={() => {
                          setDateString(findDate(7));
                          setShipping({
                            id: "",
                            deliveryDays: 7,
                            price: 0,
                          });
                        }}
                      />
                      <div>
                        <div class="delivery-option-date">{findDate(7)}</div>
                        <div class="delivery-option-price">FREE Shipping</div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input
                        type="radio"
                        class="delivery-option-input"
                        name="delivery-option-2"
                        onClick={() => {
                          setDateString(findDate(3));
                          setShipping({
                            id: "",
                            deliveryDays: 3,
                            price: 49,
                          });
                        }}
                      />
                      <div>
                        <div class="delivery-option-date">{findDate(3)}</div>
                        <div class="delivery-option-price">
                          ₹49.00 - Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input
                        type="radio"
                        class="delivery-option-input"
                        name="delivery-option-2"
                        onClick={() => {
                          setDateString(findDate(1));
                          setShipping({
                            id: "",
                            deliveryDays: 1,
                            price: 99,
                          });
                        }}
                      />
                      <div>
                        <div class="delivery-option-date">{findDate(1)}</div>
                        <div class="delivery-option-price">
                          ₹99.00 - Shipping
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="payment-summary">
              <div class="payment-summary-title">Order Summary</div>

              <div class="payment-summary-row">
                <div>Items (1):</div>
                <div class="payment-summary-money">
                  {`₹${formateCurrency(totalAmount)}`}
                </div>
              </div>

              <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">
                  {`₹${formateCurrency(shipping?.price)}`}
                </div>
              </div>

              <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">
                  {`₹${formateCurrency(totalBeforeTax)}`}
                </div>
              </div>

              <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">{`₹${formateCurrency(
                  tax
                )}`}</div>
              </div>

              <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">
                  {`₹${formateCurrency(totalAfterTax)}`}
                </div>
              </div>

              {isLoggedIn ? (
                <button
                  class="place-order-button button-primary"
                  onClick={() => {
                    navigate("/checkout", {
                      state: {
                        totalAmount: formateCurrency(totalAfterTax),
                        product,
                        quantity,
                      },
                    });
                  }}
                >
                  Place your order
                </button>
              ) : (
                <button
                  class="place-order-button button-primary"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Please login
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BuyNow;
