import "./specialProduct.css";
import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { shortenText } from "../../utils/Validator";
const SpecialProduct = ({
  url,
  name,
  price,
  description,
  _id,
  brand,
  rating,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card special-product">
        <NavLink to={`/product/${_id}`}>
          <div className="card-img-top">
            <img src={url} alt="" />
          </div>
          <div className="card-body">
            <div className="card-title">{shortenText(description, 15)}</div>
            <div className="card-text">{`₹${price}`}</div>
            {Number(rating) != 0 && (
              <div className="product-star">
                <ReactStars
                  count={5}
                  size={24}
                  value={Number(rating)}
                  edit={false}
                  activeColor="#ffd700"
                />
              </div>
            )}
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default SpecialProduct;
