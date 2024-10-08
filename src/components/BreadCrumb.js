import React from "react";
import { Link } from "react-router-dom";
import { shortenText } from "../utils/Validator";

const BreadCrumb = (props) => {
  const { title } = props;
  return (
    <div className="breadcrumb mb-0 py-4">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className="text-center mb-0 bread-crumb-text">
              <Link to="/">Home &nbsp;</Link> / {shortenText(title, 15)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
