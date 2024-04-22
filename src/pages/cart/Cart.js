import "./Cart.css";
import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, removeFromCart } from "../../features/user/userSlice";
import CartComponent from "../../components/cartComponent/CartComponent";
import { formateCurrency } from "../../utils/money";
import { updateCartQuantity } from "../../features/user/userSlice";
import Loader from "../../components/loader/Loader";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const { userCart, isLoading } = useSelector((state) => state.auth);
  let initialTotalAmount = 0;

  const [shipping, setShipping] = useState({
    id: "",
    deliveryDays: 0,
    price: 0,
  });
  const [countCartItem, setCartItem] = useState(0);
  const [totalAmount, setTotalAmount] = useState(initialTotalAmount);
  const [totalBeforeTax, setTotalBeforeTax] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalAfterTax, setTotalAfterTax] = useState(0);

  useEffect(() => {
    let count = 0;
    userCart?.forEach((cartItem) => {
      count++;
      initialTotalAmount += cartItem?.quantity * cartItem?.productId?.price;
    });
    setTotalAmount(initialTotalAmount);
    const totalBeforeTax_ = initialTotalAmount + shipping.price;
    const tax_ = totalBeforeTax_ * 0.1;
    const total = totalBeforeTax_ + tax;
    setCartItem(count);
    setTotalBeforeTax(totalBeforeTax_);
    setTax(tax_);
    setTotalAfterTax(total);
  }, [userCart, shipping]);

  //console.log(totalAmount);

  const handleRemoveAProductFromCart = (productId) => {
    //console.log(productId);
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (id, quantity) => {
    const data = { id: id, quantity };
    dispatch(updateCartQuantity(data));
  };

  //console.log(userCart);

  // console.log(totalAmount);

  //console.log(userCart);

  //console.log(shipping);
  return (
    <>
      {isLoading && <Loader />}
      <Meta title="ShopIto" />
      <BreadCrumb title=" Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        {userCart && userCart?.length !== 0 ? (
          <div className="main">
            <div className="page-title">Review your order</div>

            <div className="checkout-grid">
              <div className="order-summary">
                {userCart?.length !== 0 &&
                  userCart?.map((cartItem) => {
                    return (
                      <div key={cartItem?._id}>
                        <CartComponent
                          matchingProduct={cartItem}
                          setShipping={setShipping}
                          handleRemoveAProductFromCart={
                            handleRemoveAProductFromCart
                          }
                          handleQuantityChange={handleQuantityChange}
                        />
                      </div>
                    );
                  })}
              </div>

              <div className="payment-summary">
                <div className="payment-summary-title">Order Summary</div>

                <div className="payment-summary-row">
                  <div>Items ({countCartItem}):</div>
                  <div className="payment-summary-money">
                    {`₹${formateCurrency(totalAmount)}`}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {`₹${formateCurrency(shipping?.price)}`}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {`₹${formateCurrency(totalBeforeTax)}`}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {`₹${formateCurrency(tax)}`}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {`₹${formateCurrency(totalAfterTax)}`}
                  </div>
                </div>

                <button
                  className="place-order-button button-primary"
                  onClick={() => {
                    navigate("/checkout", {
                      state: {
                        totalAmount: totalBeforeTax,
                      },
                    });
                  }}
                >
                  Place your order
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>Your Cart is Empty</div>
        )}
      </Container>
    </>
  );
};

export default Cart;
