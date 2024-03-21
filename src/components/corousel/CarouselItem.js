import React from "react";
import "./Carousel.css";
import { Link, useNavigate } from "react-router-dom";
import { shortenText } from "../../utils/Validator";

const CarouselItem = ({ url, name, price, description, _id }) => {
  const navigate = useNavigate();
  return (
    <div className="carouselItem">
      <Link to={`/product/${_id}`}>
        <img className="product--image" src={url} alt="product" />
        <p className="price">{`₹${price}`}</p>
        <h4>{shortenText(name, 18)}</h4>
        <p className="--mb">{shortenText(description, 26)}</p>
      </Link>
      <button
        className="--btn --btn-primary --btn-block"
        onClick={() => navigate(`/product/${_id}`)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CarouselItem;
