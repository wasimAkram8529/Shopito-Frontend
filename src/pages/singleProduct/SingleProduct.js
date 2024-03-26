import "./SingleProduct.css";
import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import ProductCard from "../../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import Color from "../../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
//import ReactImageMagnify from "react-image-magnify";
import ReactImageZoom from "react-image-zoom";

import {
  deleteProductReview,
  getAProduct,
  getProducts,
  updateProductReview,
  writeProductReview,
} from "../../features/products/productSlice";
import {
  addToCart,
  addToWishList,
  getAUser,
  getUserCart,
} from "../../features/user/userSlice";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomModel from "../../components/CustomModel";
import { totalDisplayImg } from "../../utils/importantFunctions";

const reviewSchema = Yup.object().shape({
  review: Yup.string().required("Product Review is Required"),
});
const SingleProduct = () => {
  //console.log(props);
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [star, setRating] = useState(0);
  const [edit, setEdit] = useState(false);

  const [open, setOpen] = useState(false);
  const [reviewId, setReviewId] = useState();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const showModal = (id) => {
    setOpen(true);
    setReviewId(id);
  };

  const handleRatingChange = (newStar) => {
    setRating(newStar);
  };

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(0);
  const [colorName, setColorName] = useState("");

  const setColorHandler = (colorId, colorTitle) => {
    setColor(colorId);
    setColorName(colorTitle);
  };

  useEffect(() => {
    dispatch(getAProduct(productId));
    dispatch(getProducts({ sort: "", minAmount: 0, maxAmount: 1000000007 }));
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    dispatch(getAUser());
  }, [edit]);

  const addToWishListHandler = (id) => {
    dispatch(addToWishList(id));
  };

  const { products } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  //console.log(products);
  let popularProducts = [];

  if (products.length !== 0) {
    popularProducts = products.filter((product) => product.tags === "popular");
  }

  if (screenWidth <= 800) {
    popularProducts = totalDisplayImg(2, popularProducts);
  }

  const { product, isLoading } = useSelector((state) => state.product);
  const { userCart } = useSelector((state) => state.auth);

  //console.log(product);
  //console.log(userCart);
  const formik = useFormik({
    initialValues: {
      review: "",
    },
    validationSchema: reviewSchema,
    onSubmit: (values) => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;

      values.reviewDate = formattedDate;
      values.star = star;
      values.userId = user ? user?.[0]?._id : "";

      //console.log(newReview);
      if (!edit) {
        const newReview = {
          id: productId,
          review: values,
        };
        dispatch(writeProductReview(newReview));
      } else {
        const newReview = {
          id: productId,
          review: values,
        };
        //console.log(newReview);
        dispatch(updateProductReview(newReview));
        setEdit(false);
      }
      formik.resetForm();
    },
  });

  const [isAvailable, setIsAvailable] = useState(false);

  const updateCart = (cartItem) => {
    if (!cartItem.quantity || !cartItem.color) {
      toast.error(`Please Choose Product Quantity and Color`);
      return;
    }
    dispatch(addToCart(cartItem));
    //props.setRender(true);
    // setIsAvailable(true);
    navigate("/cart");
  };

  useEffect(() => {
    userCart.forEach((cartItem) => {
      if (cartItem?.productId?._id === product?._id) {
        setIsAvailable(true);
      }
    });
    window.addEventListener("resize", updateScreenWidth);
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, [userCart]);

  const handleEditReview = () => {
    setEdit(true);
  };

  const [orderedProduct, setOrderedProduct] = useState(true);

  const copyToClipboard = (text) => {
    //console.log("text", text);
    let textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("Copy");
    textField.remove();
  };

  const deleteReviewHandler = async (id) => {
    const payload = { id: productId, userId: user?.[0]?._id };
    await dispatch(deleteProductReview(payload));
    //console.log(payload);
    hideModal();
  };
  const propsZoom = {
    // width: 650,
    // height: 400,
    zoomWidth: 500,
    img: `${product?.image?.[0]?.url}`,
  };
  return (
    <>
      <Meta title="ShopIto" />
      {!isLoading && (
        <>
          <BreadCrumb title={`${product?.title}`} />
          <Container class1="main-product-wrapper home-wrapper-2 py-5">
            <div className="product-with-details">
              <div className="product-img">
                <div className="main-product-image">
                  {/* <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: `Product Image`,
                        isFluidWidth: true,
                        src: `${product?.image?.[0]?.url}`,
                      },
                      largeImage: {
                        src: `${product?.image?.[0]?.url}`,
                        width: 1200,
                        height: 1200,
                      },
                    }}
                  /> */}
                  <ReactImageZoom {...propsZoom} />
                </div>
                <div className="others-product-images d-flex flex-wrap justify-content-between">
                  <div>
                    <img
                      src={product?.image?.[0]?.url}
                      className="img-fluid"
                      alt={product?.title}
                    />
                  </div>
                  <div>
                    <img
                      src={product?.image?.[0]?.url}
                      className="img-fluid"
                      alt={product?.title}
                    />
                  </div>
                  <div>
                    <img
                      src={product?.image?.[0]?.url}
                      className="img-fluid"
                      alt={product?.title}
                    />
                  </div>
                  <div>
                    <img
                      src={product?.image?.[0]?.url}
                      className="img-fluid"
                      alt={product?.title}
                    />
                  </div>
                </div>
              </div>
              <div className="product-details">
                <div className="border-bottom">
                  <h3 className="title">{product?.title}</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">{`₹${product?.price}`}</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={Number(product?.totalrating)}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 t-review">{`(${product?.ratings?.length} review)`}</p>
                  </div>
                  <a href="#review">Write a Review</a>
                </div>
                <div className="py-3">
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Type:</h3>
                    <p className="product-data">{product?.title}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Brand:</h3>
                    <p className="product-data">{product?.brand}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Category:</h3>
                    <p className="product-data">{product?.category}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Tags:</h3>
                    <p className="product-data">{product?.tags}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Availability:</h3>
                    <p className="product-data">
                      {product?.quantity ? `In Stock` : `Out of Stock`}
                    </p>
                  </div>
                  {/* <div className="d-flex gap-10 flex-column mt-2 mb-3 product-size">
                    <h3 className="product-heading">Size:</h3>
                    <div className="d-flex flex-wrap gap-15">
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        S
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        M
                      </span>
                      <span className="badge border border-1 bg- text-dark border-secondary">
                        L
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XL
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XXl
                      </span>
                    </div>
                  </div> */}
                  {!isAvailable && (
                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                      <h3 className="product-heading">Color:</h3>
                      <Color
                        colorData={product?.color}
                        setColorHandler={setColorHandler}
                      />
                    </div>
                  )}
                  <div className="">
                    {!isAvailable && (
                      <>
                        <div className="product-quantity gap-15">
                          <h3 className="product-heading">Quantity:</h3>
                          <div>
                            <input
                              type="number"
                              min={1}
                              max={product?.quantity}
                              className="form-control"
                              style={{ width: "70px" }}
                              name="quantity"
                              id="quantity"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="d-flex align-items-center gap-15 mt-3 mb-3">
                      {!isAvailable ? (
                        <button
                          className="button border-0"
                          // data-bs-toggle="modal"s
                          // data-bs-target="#staticBackdrop"
                          type="button"
                          onClick={() => {
                            const price = product?.price * quantity;
                            let cartData = {
                              productId,
                              price,
                              quantity,
                              color,
                            };
                            updateCart(cartData);
                          }}
                        >
                          ADD TO CART
                        </button>
                      ) : (
                        <NavLink to={`/cart`} className="button border-0">
                          GO TO CART
                        </NavLink>
                      )}
                      <button
                        className="button signup"
                        onClick={() => {
                          if (!color) {
                            toast.error("Please select color and quantity");
                          } else {
                            navigate(`/product/buy-now/${product?._id}`, {
                              state: {
                                quantity: quantity,
                                product,
                              },
                            });
                          }
                        }}
                      >
                        BUY IT NOW
                      </button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-15">
                    <div>
                      <NavLink to="">
                        <TbGitCompare className="fs-5 me-2" />
                        Add to Compare
                      </NavLink>
                    </div>
                    <div>
                      <button className="border-0 bg-transparent">
                        <AiOutlineHeart
                          className="fs-5 me-2"
                          onClick={(e) => {
                            e.preventDefault();
                            addToWishListHandler(productId);
                          }}
                        />
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-10 my-3">
                    <h3 className="product-heading">Shipping & Returns :</h3>
                    <p className="product-data">
                      Free shipping and returns available on all orders! we ship
                      all us domestic orders within <b>5-10 business days!</b>
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-3">
                    <h3 className="product-heading">Product Link :</h3>
                    <NavLink
                      to="#"
                      onClick={() => {
                        copyToClipboard(window.location.href);
                      }}
                    >
                      Copy Product Link
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Container className="description-wrapper home-wrapper-2 py-5">
            <div className="row">
              <div className="col-12">
                <h4>Description</h4>
                <div className="bg-white p-3">
                  <p>{product?.description}</p>
                </div>
              </div>
            </div>
          </Container>
          <Container className="reviews-wrapper home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h3 id="review">Reviews</h3>
                <div className="review-inner-wrapper">
                  <div className="review-head d-flex justify-content-between align-items-end">
                    <div>
                      <h4 className="mb-2">Customer Review</h4>
                      {!isLoading && (
                        <div className="d-flex gap-10 align-items-center">
                          <ReactStars
                            count={5}
                            size={24}
                            value={Number(product?.totalrating)}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          <p className="mb-0">
                            Based on{" "}
                            {`${
                              product?.ratings?.length
                                ? product?.ratings?.length
                                : "0"
                            }`}
                            {"  "}
                            reviews
                          </p>
                        </div>
                      )}
                    </div>
                    {orderedProduct && (
                      <div>
                        <NavLink
                          className="text-dark text-decoration-underline"
                          to="#review"
                        >
                          Write a review
                        </NavLink>
                      </div>
                    )}
                  </div>
                  <div className="review-form py-4">
                    <h4>{edit ? "Update Your Review" : "Write a Review"}</h4>
                    <form
                      action=""
                      onSubmit={formik.handleSubmit}
                      className="d-flex flex-column gap-15"
                    >
                      <div>
                        <ReactStars
                          count={5}
                          size={24}
                          value={star}
                          edit={true}
                          onChange={handleRatingChange}
                          activeColor="#ffd700"
                        />
                      </div>
                      <div>
                        <textarea
                          name="review"
                          id="review"
                          className="w-100 form-control"
                          cols="30"
                          rows="4"
                          value={formik.values.review}
                          onChange={formik.handleChange("review")}
                          onBlur={formik.handleBlur("review")}
                          placeholder="Comments..."
                        ></textarea>
                        {formik.touched.review && formik.errors.review ? (
                          <div>{formik.errors.review}</div>
                        ) : null}
                      </div>
                      <div className="d-flex justify-content-end">
                        <button className="button border-0" type="submit">
                          {edit ? "Update Review" : "Submit Review"}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="reviews mt-4">
                    {!isLoading &&
                      product?.ratings?.map((review, index) => {
                        return (
                          <div key={index} className="review">
                            <div className="d-flex gap-10 align-items-center justify-content-between">
                              <div className="d-flex gap-10 align-items-center">
                                <h6 className="mb-0">{review?.name}</h6>
                                <ReactStars
                                  count={5}
                                  size={24}
                                  value={review?.star}
                                  edit={false}
                                  activeColor="#ffd700"
                                />
                              </div>
                              <div>
                                <FaEdit
                                  className="fs-5 mx-3"
                                  style={{ cursor: "pointer" }}
                                  onClick={handleEditReview}
                                />
                                <MdDelete
                                  className="fs-5"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    showModal(review?.userId);
                                  }}
                                />
                              </div>
                            </div>
                            <p className="mt-0">{review?.reviewDate}</p>
                            <p className="mt-3">{review?.review}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Container className="popular-wrapper home-wrapper-2 py-5">
            <div className="row recommend-popular-product">
              <div className="col-12">
                <h3 className="section-heading">Our Popular Products</h3>
              </div>
              {popularProducts?.length !== 0 &&
                popularProducts.map((product) => {
                  const { _id, description, title, price, totalrating } =
                    product;
                  return (
                    <ProductCard
                      key={_id}
                      id={_id}
                      title={title}
                      description={description}
                      price={price}
                      imgURL={product?.image?.[0].url}
                      rating={totalrating ? totalrating : ""}
                      colNumber={Math.round(12 / popularProducts?.length)}
                    />
                  );
                })}
            </div>
            <CustomModel
              open={open}
              hideModal={hideModal}
              performAction={() => deleteReviewHandler(reviewId)}
              title="Are you sure want to delete this review"
            />
          </Container>
        </>
      )}
    </>
  );
};

export default SingleProduct;
