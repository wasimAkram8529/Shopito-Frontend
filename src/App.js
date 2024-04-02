import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/store/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermsAndCondition from "./pages/TermsAndCondition";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./features/user/userSlice";
import MyOrders from "./pages/MyOrders";
import ViewOrder from "./pages/ViewOrder";
import Profile from "./pages/profile/Profile";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import BuyNow from "./pages/buyNow/BuyNow";

function App() {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  const [renderHeader, setRenderHeader] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                renderHeader={renderHeader}
                setRenderHeader={setRenderHeader}
              />
            }
          >
            <Route index element={<Home />} />
            <Route path="shop" element={<Home />} />

            <Route path="about" element={<About />} />

            <Route path="contact" element={<Contact />} />

            <Route path="products" element={<OurStore />} />
            <Route
              path="product/:id"
              element={
                <SingleProduct
                  renderHeader={renderHeader}
                  setRenderHeader={setRenderHeader}
                />
              }
            />
            <Route path="product/buy-now/:id" element={<BuyNow />} />

            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<SingleBlog />} />

            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />

            <Route path="my-orders" element={<MyOrders />} />
            <Route path="my-orders/:id" element={<ViewOrder />} />

            <Route path="compare-product" element={<CompareProduct />} />

            <Route path="wishlist" element={<Wishlist />} />

            <Route
              path="login"
              element={<Login setRenderHeader={setRenderHeader} />}
            />

            <Route path="signup" element={<SignUp />} />
            <Route path="user-profile" element={<Profile />} />

            <Route path="forgot-password" element={<ForgotPassword />} />

            <Route path="reset-password/:token" element={<ResetPassword />} />

            <Route path="privacy-policy" element={<PrivacyPolicy />} />

            <Route path="refund-policy" element={<RefundPolicy />} />

            <Route path="shipping-policy" element={<ShippingPolicy />} />

            <Route path="terms-and-condition" element={<TermsAndCondition />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
