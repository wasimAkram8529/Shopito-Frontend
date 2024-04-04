import React, { useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import BlogCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RESET_BLOG, getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";
import { MdFilterAlt } from "react-icons/md";
import { IoMdClose, IoIosArrowDroprightCircle } from "react-icons/io";
import Container from "../components/Container";
import ProductCard from "../components/productCard/ProductCard";
import Loader from "../components/loader/Loader";

const Blog = () => {
  const dispatch = useDispatch();
  const [filterMenu, setFilterMenu] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    dispatch(getAllBlogs({ category, sort }));
    return () => {
      RESET_BLOG();
    };
  }, [category, sort]);

  const { blogs, isSuccess, isLoading } = useSelector((state) => state.blog);
  //console.log(blogs);
  return (
    <>
      {isLoading && <Loader />}
      <Meta title="Shopito" />
      <BreadCrumb title="Blog" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="store">
          <div
            className={
              filterMenu
                ? "store-left-part"
                : "close-filter-menu store-left-part"
            }
          >
            <div className="filter-card close-menu">
              <IoMdClose onClick={() => setFilterMenu(!filterMenu)} />
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Find By Category</h3>
              <div>
                <select
                  className="select"
                  onClick={(e) => {
                    if (e.target.value !== "Choose") {
                      setCategory(e.target.value);
                    }
                  }}
                >
                  <option>Choose</option>
                  {blogs?.map((blog, indx) => {
                    return (
                      <option
                        key={indx}
                        style={{ cursor: "pointer" }}
                        className=""
                        value={blog?.category}
                      >
                        {blog?.category}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {/*<div className="filter-card mb-3">
              <h3 className="filter-title">Product Tag</h3>
              <div>
                <select
                  className="select"
                  onClick={(e) => {
                    setSelectedTags({
                      searchCategory: "tags",
                      value: e.target.value,
                    });
                  }}
                >
                  <option>Choose</option>
                  {pTags?.map((tag, indx) => {
                    return (
                      <option
                        key={indx}
                        style={{ cursor: "pointer" }}
                        className="badge bg-light rounded-3 text-secondary py-2 px-3"
                        value={tag}
                      >
                        {tag}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Brands</h3>
              <div>
                <select
                  className="select"
                  onClick={(e) => {
                    setSelectedTags({
                      searchCategory: "brand",
                      value: e.target.value,
                    });
                  }}
                >
                  <option>Choose</option>
                  {brands?.map((brand, indx) => {
                    return (
                      <option
                        key={indx}
                        style={{ cursor: "pointer" }}
                        className="badge bg-light rounded-3 text-secondary py-2 px-3"
                        value={brand}
                      >
                        {brand}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Price</h5>
                <div className="price-filter-box">
                  <input type="text" placeholder="Min" ref={minInputRef} />
                  <span>To</span>
                  <input type="text" placeholder="Max" ref={maxInputRef} />
                  <div>
                    <IoIosArrowDroprightCircle
                      onClick={() => {
                        getValue();
                        setFilterMenu(!filterMenu);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="store-right-part">
            {/* <div className="filter-sort-grid mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    className="form-control form-select"
                    id=""
                    onChange={(e) => {
                      if (e.target.value !== "Features") {
                        setSort(e.target.value);
                      } else {
                        setSort("");
                      }
                    }}
                  >
                    <option value="Features">Features</option>
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">Alphabetically, Z-A</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10 grid store-top-right-part">
                  <p className="totalProducts mb-0">
                    {relatedProducts.length !== 0
                      ? relatedProducts?.length
                      : blogs?.length}{" "}
                    Blogs
                  </p>
                </div>
              </div>
            </div> */}
            <div className="store-middle-right-part">
              <p className="mb-0 d-block" style={{ width: "100px" }}>
                Apply filters {">"}
              </p>
              <div
                className="open-filter"
                onClick={() => setFilterMenu(!filterMenu)}
              >
                <MdFilterAlt />
              </div>
            </div>
            <div className="container-xxl">
              <div className="row">
                {isSuccess && relatedProducts?.length !== 0
                  ? relatedProducts?.map((blog) => {
                      return (
                        <BlogCard
                          title={blog?.title}
                          key={blog?._id}
                          description={blog?.description}
                          id={blog?._id}
                          imgURL={blog?.image?.[0]?.url}
                          date={moment(blog?.createAt).format("DD-MMMM-YYYY")}
                        />
                      );
                    })
                  : blogs?.map((blog) => {
                      return (
                        <BlogCard
                          title={blog?.title}
                          key={blog?._id}
                          description={blog?.description}
                          id={blog?._id}
                          imgURL={blog?.image?.[0]?.url}
                          date={moment(blog?.createAt).format("DD-MMMM-YYYY")}
                        />
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
