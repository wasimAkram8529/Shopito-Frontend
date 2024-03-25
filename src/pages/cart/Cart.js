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

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const { userCart } = useSelector((state) => state.auth);
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
    //calculateAmount(initialTotalAmount, shipping, count);
  }, [userCart, shipping]);

  //console.log(totalAmount);

  // const handleTotalAmount = (newAmount = 0) => {
  //   calculateAmount(totalAmount + newAmount, shipping, countCartItem);
  // };

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
      <Meta title="ShopIto" />
      <BreadCrumb title=" Cart" />
      {/* <Container class1="cart-wrapper home-wrapper-2 py-5">
        <p>Taxes and shipping calculated at checkout</p>
        {userCart.length !== 0 ? (
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>
              {userCart &&
                userCart?.map((cartItem) => {
                  return (
                    <CartComponent
                      key={cartItem?._id}
                      cartItem={cartItem}
                      handleTotalAmount={handleTotalAmount}
                      handleRemoveAProductFromCart={
                        handleRemoveAProductFromCart
                      }
                    />
                  );
                })}
            </div>
            <h4>SubTotal: {`₹${totalAmount}`}</h4>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-center cart-total-price">
                <Link to="/products" className="button">
                  Continue Shopping
                </Link>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">Your Cart is Empty</div>
        )}
      </Container> */}
      <Container class1="cart-wrapper home-wrapper-2 py-5">
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
      </Container>
    </>
  );
};

export default Cart;
