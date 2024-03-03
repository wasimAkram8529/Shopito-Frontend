import React, { useEffect, useState } from "react";
import "./Slider.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate, NavLink } from "react-router-dom";
import { shortenText } from "../../utils/Validateor";

const Slider = ({ slider }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const slideLength = slider?.length;
  const autoScroll = true;
  let slideInterval;
  const intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, intervalTime, autoScroll]);

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {slider?.map((slide, indx) => {
        const { title, description } = slide;
        return (
          <div
            key={indx}
            className={indx === currentSlide ? "slide current" : "slide"}
          >
            {indx === currentSlide && (
              <>
                <img className="" src={slide?.image?.[0]?.url} alt="slide" />
                <div
                  style={{ cursor: "pointer" }}
                  className="content"
                  onClick={() => navigate(`/product/${slide?._id}`)}
                >
                  <span className="span1"></span>
                  <span className="span2"></span>
                  <span className="span3"></span>
                  <span className="span4"></span>
                  <h2>{title}</h2>
                  <p>{shortenText(description, 20)}</p>
                  <hr />
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className="--btn --btn-primary"
                    to={`/product/${slide?._id}`}
                  >
                    Shop Now
                  </NavLink>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
