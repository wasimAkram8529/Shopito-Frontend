import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./footer/Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ renderHeader, setRenderHeader }) => {
  //console.log("Layout", renderHeader);
  return (
    <>
      <Header renderHeader={renderHeader} setRenderHeader={setRenderHeader} />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
