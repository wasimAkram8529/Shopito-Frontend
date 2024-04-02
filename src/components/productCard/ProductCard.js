import "./ProductCard.css";
import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, addToWishList } from "../../features/user/userSlice";
import { shortenText } from "../../utils/Validator";

const ProductCard = ({
  baseURL,
  id,
  imgURL,
  description,
  title,
  price,
  rating,
  colNumber,
  color,
}) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToWishListHandler = (productId) => {
    dispatch(addToWishList(productId));
  };
  const updateCart = (cartItem) => {
    if (!cartItem.quantity || !cartItem.color) {
      cartItem.quantity = 1;
    }
    //console.log(cartItem);
    // dispatch(addToCart(cartItem));
    // // setIsAvailable(true);
    // navigate("/cart");
  };
  return (
    <div className="col-lg-3 col-md-4 col-sm-4 col-6 card">
      <NavLink to={`/${baseURL}/${id}`}>
        <div className="card-img-top">
          <img src={imgURL} alt="" />
        </div>
        <div className="card-body">
          <div className="card-title">{shortenText(title, 15)}</div>
          <div className="card-text">{price}</div>
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
  );
};

export default ProductCard;
