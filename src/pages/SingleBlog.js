import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import blog from "../images/blog-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import { RESET_BLOG, getABlog } from "../features/blogs/blogSlice";
import { useEffect } from "react";
import Loader from "../components/loader/Loader";

const SingleBlog = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const getBlogId = location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(getABlog(getBlogId));
    return () => {
      RESET_BLOG();
    };
  }, [getBlogId]);

  const { blog, isLoading } = useSelector((state) => state.blog);
  // console.log(blog);
  return (
    <>
      {isLoading && <Loader />}
      <Meta title="Shopito" />
      <BreadCrumb title=" Daily Blog" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to={-1} className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" /> Go back to blogs
              </Link>
              <h3 className="title">
                {blog ? blog.title : "A Beautiful Sunday Morning Renaissance"}
              </h3>
              <img
                src={blog ? blog.image?.[0]?.url : "../images/blog-1.jpg"}
                className="blog-img"
                alt="Blog"
              />
              <p>
                {blog
                  ? blog.description
                  : `You're only as good as your last collection, which i an enormous
                pressure. I think there is something about luxury-it's not
                something people need, but it's what they want. It really pulls
                at their heart. I have a fantastic relationship with money.`}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
