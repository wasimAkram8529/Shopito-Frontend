import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, removeFromCart } from "../features/user/userSlice";
import CartComponent from "../components/CartComponent";

const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const { userCart } = useSelector((state) => state.auth);
  let initialTotalAmount = 0;

  const [totalAmount, setTotalAmount] = useState(initialTotalAmount);

  useEffect(() => {
    userCart?.forEach((cartItem) => {
      initialTotalAmount += cartItem?.quantity * cartItem?.productId?.price;
    });
    setTotalAmount(initialTotalAmount);
  }, [userCart]);

  //console.log(totalAmount);

  const handleTotalAmount = (newAmount = 0) => {
    setTotalAmount(totalAmount + newAmount);
  };

  const handleRemoveAProductFromCart = (productId) => {
    //console.log(productId);
    dispatch(removeFromCart(productId));
  };

  //console.log(userCart);

  // console.log(totalAmount);

  //console.log(userCart);
  return (
    <>
      <Meta title="ShopIto" />
      <BreadCrumb title=" Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
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
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/products" className="button">
                  Continue Shopping
                </Link>
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: {`₹${totalAmount}`}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">Your Cart is Empty</div>
        )}
      </Container>
    </>
  );
};

export default Cart;
