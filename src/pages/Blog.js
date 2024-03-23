import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import BlogCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RESET_BLOG, getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";

const Blog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
    return () => {
      RESET_BLOG();
    };
  }, []);

  const { blogs } = useSelector((state) => state.blog);
  //console.log(blogs);
  return (
    <>
      <Meta title="Blog" />
      <BreadCrumb title="Blog" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Find By Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>Home</li>
                    <li>Our Store</li>
                    <li>Blogs</li>
                    <li>Contact</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                {!blogs || blogs?.length !== 0 ? (
                  blogs?.map((blog) => {
                    return (
                      <div key={blog?._id} className="col-6 mb-3">
                        <BlogCard
                          title={blog?.title}
                          description={blog?.description}
                          id={blog?._id}
                          imgURL={blog?.image?.[0]?.url}
                          date={moment(blog?.createAt).format("DD-MMMM-YYYY")}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center fs-5">
                    It's a blog break today! Visit us again tomorrow for your
                    daily dose of insights.
                  </div>
                )}
                {/* <div className="col-6 mb-3">
                  <BlogCard />
                </div>
                <div className="col-6 mb-3">
                  <BlogCard />
                </div>
                <div className="col-6 mb-3">
                  <BlogCard />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
