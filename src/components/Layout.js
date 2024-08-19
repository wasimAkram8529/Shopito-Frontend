import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import NewHeader from "./header/NewHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./footer/Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ renderHeader, setRenderHeader }) => {
  const location = useLocation();
  const newHeaderPaths = ["/cart", "/checkout", "/contact"];

  const isNewHeader = newHeaderPaths.includes(location.pathname);

  return (
    <>
      <div>
        {isNewHeader ? (
          <NewHeader
            renderHeader={renderHeader}
            setRenderHeader={setRenderHeader}
          />
        ) : (
          <Header
            renderHeader={renderHeader}
            setRenderHeader={setRenderHeader}
          />
        )}
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
      </div>
    </>
  );
};

export default Layout;
