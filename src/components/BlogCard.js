import React from "react";
import { NavLink } from "react-router-dom";
import { shortenText } from "../utils/Validator";

const BlogCard = ({ id, title, description, imgURL, date }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-4 col-6 card blog-card">
      <NavLink to={`/blog/${id}`}>
        <div className="card-img-top">
          <img src={imgURL} className="image-size" alt={title} />
        </div>
        <div className="card-body">
          <p className="card-date">{date}</p>
          <h5 className="card-title">{shortenText(title, 15)}</h5>
        </div>
      </NavLink>
    </div>
  );
};

export default BlogCard;
