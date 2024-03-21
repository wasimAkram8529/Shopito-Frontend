import "./specialProduct.css";
import React from "react";
import ReactStars from "react-rating-stars-component";
import { NavLink } from "react-router-dom";

const SpecialProduct = ({
  id,
  brand,
  title,
  sold = 0,
  quantity = 0,
  price,
  imgURL,
  rating,
}) => {
  const calPercentage = (num1, num2) => {
    if (num1 || num2) {
      return (num1 / (num1 + num2)) * 100;
    }

    return 0;
  };

  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="special-product">
          <div className="product-img">
            <img src={imgURL} alt="Watch" />
          </div>
          <div className="special-product-content">
            <h5 className="brand">{brand}</h5>
            <h6 className="title">{title}</h6>
            <ReactStars
              count={5}
              size={24}
              value={rating}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">
              <span className="red-p">{`₹${price}`}</span>&nbsp;
              <strike>₹16000</strike>
            </p>
            <div className="discount-till d-flex align-items-center gap-10">
              <p className="mb-0">
                <b>5 </b>days
              </p>
              <div className="d-flex gap-10 align-items-center">
                <span className="badge rounded-circle p-3 bg-warning">1</span>:
                <span className="badge rounded-circle p-3 bg-warning">1</span>:
                <span className="badge rounded-circle p-3 bg-warning">1</span>
              </div>
            </div>
            <div className="prod-count my-3">
              <p>Products: {quantity ? quantity : 0}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${calPercentage(quantity, sold)}%`,
                  }}
                  aria-valuenow={calPercentage(quantity, sold)}
                  aria-valuemin={quantity}
                  aria-valuemax={quantity + sold}
                ></div>
              </div>
            </div>
            <NavLink className="button" to={`/product/${id}`}>
              View
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
