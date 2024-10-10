import React from "react";
import "./Carousel.css";
import { Link, useNavigate } from "react-router-dom";
import { shortenText } from "../../utils/Validator";
import { useTranslation } from "react-i18next";

const CarouselItem = ({ url, name, price, description, _id }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="carouselItem">
      <Link to={`/product/${_id}`}>
        <div className="carousel-card-top-img">
          <img className="product--image" src={url} alt="product" />
        </div>
        <p className="price">{`₹${price}`}</p>
        <h4>{shortenText(name, 10)}</h4>
        {/* <p className="--mb">{shortenText(description, 26)}</p> */}
      </Link>
      <button
        className="--btn --btn-primary --btn-block"
        onClick={() => navigate(`/product/${_id}`)}
      >
        {t("view")}
      </button>
    </div>
  );
};

export default CarouselItem;
