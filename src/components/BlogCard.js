import React from "react";
import { Link } from "react-router-dom";
import { shortenText } from "../utils/Validateor";

const BlogCard = ({ id, title, description, imgURL, date }) => {
  return (
    <div className="blog-card product-card">
      <div className="card-image product-image-box">
        <img
          src={imgURL ? imgURL : "images/blog-1.jpg"}
          className="image-size"
          alt={title}
        />
      </div>
      <div className="blog-content">
        <p className="date">{date ? date : "12 Nov 2023"}</p>
        <h5 className="title">
          {title ? title : "A beautiful sunday morning renaissance"}
        </h5>
        <p className="desc">
          {description
            ? shortenText(description, 10)
            : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
          suscipit vero accusamus libero quaerat explicabo totam a quibusdam`}
        </p>
        <Link to={`/blog/${id}`} className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
