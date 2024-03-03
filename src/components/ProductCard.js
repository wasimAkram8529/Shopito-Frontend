import React from "react";
import ReactStars from "react-rating-stars-component";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWishList } from "../features/user/userSlice";
import { shortenText } from "../utils/Validateor";

const ProductCard = ({
  grid,
  id,
  imgURL,
  description,
  title,
  price,
  rating,
  colNumber,
}) => {
  let location = useLocation();
  const dispatch = useDispatch();

  const addToWishListHandler = (productId) => {
    dispatch(addToWishList(productId));
  };
  return (
    <>
      <div
        className={`${
          location.pathname === "/products"
            ? `gr-${grid}`
            : `col-${colNumber ? colNumber : 3}`
        }`}
      >
        <NavLink
          to={`/product/${id}`}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button
              className="border-0 bg-transparent"
              onClick={(e) => {
                e.preventDefault();
                addToWishListHandler(id);
              }}
            >
              <img src="../images/wish.svg" alt="Wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img className="image-size" src={imgURL} alt={title} />
            <img className="image-size" src={imgURL} alt={title} />
          </div>
          <div className="product-details">
            <h6 className="brand">{title}</h6>
            <h5 className="product-title">
              {shortenText((description = ""), 20)}
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={Number(rating)}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? `d-block` : `d-none`}`}>
              {title}
            </p>
            <p className="price">{`₹${price}`}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src="../images/prodcompare.svg" alt="ProductCompare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src="../images/view.svg" alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src="../images/add-cart.svg" alt="addCart" />
              </button>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default ProductCard;
