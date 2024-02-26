import React from "react";
import ReactDOM from "react-dom";
import loaderImage from "../../assets/loader.gif";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImage} alt="loading" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const Spinner = () => {
  return (
    <div className="--center-all">
      <img src={loaderImage} alt="loading" width={40} />
    </div>
  );
};

export default Loader;
