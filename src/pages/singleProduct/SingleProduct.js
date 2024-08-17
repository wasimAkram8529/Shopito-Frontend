import "./SingleProduct.css";
import React, { useCallback, useEffect, useState } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import ProductCard from "../../components/productCard/ProductCard";
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
import CustomModel from "../../components/CustomModel";
import {
  generateSpecialCarouselItem,
  totalDisplayImg,
} from "../../utils/importantFunctions";
import Loader from "../../components/loader/Loader";
import SpecialProduct from "../../components/special-product/SpecialProduct";
import ProductCarousel from "../../components/corousel/Carousel";
import CreateOrUpdateReview from "./CreateOrUpdateReview";

const PageHeading = ({ heading, btnText, type, content }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{heading}</h2>
        <button
          className="--btn"
          onClick={() =>
            navigate("/products", {
              state: {
                type,
                content,
              },
            })
          }
        >
          {btnText}
        </button>
      </div>
      <div className="--hr"></div>
    </>
  );
};

const SingleProduct = ({ renderHeader, setRenderHeader }) => {
  //console.log(props);
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleWriteReview = (newReview) => {
    dispatch(writeProductReview(newReview));
  };

  const handleUpdateReview = (newReview) => {
    dispatch(updateProductReview(newReview));
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
  }, [productId]);

  useEffect(() => {
    dispatch(getAUser());
  }, [edit]);

  const addToWishListHandler = useCallback(
    (id) => {
      dispatch(addToWishList(id)).then(() => {
        setRenderHeader(!renderHeader);
      });
    },
    [renderHeader]
  );

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
  const { isLoggedIn, userCart } = useSelector((state) => state.auth);

  // console.log(product);
  //console.log(userCart);

  const [isAvailable, setIsAvailable] = useState(false);

  const updateCart = (cartItem) => {
    if (!cartItem.quantity || !cartItem.color) {
      toast.error(`Please Choose Product Quantity and Color`);
      return;
    }
    dispatch(addToCart(cartItem)).then(() => {
      setRenderHeader(!renderHeader);
    });
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

  popularProducts = generateSpecialCarouselItem(popularProducts);
  return (
    <>
      {isLoading && <Loader />}
      <Meta title="ShopIto" />
      {!isLoading && (
        <>
          <BreadCrumb title={`${product?.title}`} />
          <Container class1="main-container">
            <div className="product-summary">
              <div className="product-img-box">
                <div className="product-img">
                  <div className="product-other-img">
                    <div>
                      <img
                        src={product?.image?.[0]?.url}
                        className=""
                        alt={product?.title}
                      />
                    </div>
                    <div>
                      <img
                        src={product?.image?.[0]?.url}
                        className=""
                        alt={product?.title}
                      />
                    </div>
                    <div>
                      <img
                        src={product?.image?.[0]?.url}
                        className=""
                        alt={product?.title}
                      />
                    </div>
                    <div>
                      <img
                        src={product?.image?.[0]?.url}
                        className=""
                        alt={product?.title}
                      />
                    </div>
                  </div>
                  <div className="main-product-image">
                    <img src={`${product?.image?.[0]?.url}`} alt="" />
                  </div>
                </div>
                <div className="buy-product gap-15 mt-3 mb-3 w-100">
                  <button
                    className="button signup w-50"
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
                  {isLoggedIn &&
                    (!isAvailable ? (
                      <button
                        className="button border-0 w-50"
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
                    ))}
                </div>
              </div>
              <div className="product-detail-summary">
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
                        value={Number(product?.totalRating)}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0 t-review">{`(${product?.ratings?.length} review)`}</p>
                    </div>
                    <a href="#review">Write a Review</a>
                  </div>
                  <div className="py-3">
                    <div className="d-flex gap-10 align-items-center my-2">
                      {/* <h3 className="product-heading">Type:</h3> */}
                      {/* <p className="product-data">{product?.title}</p> */}
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
                        Free shipping and returns available on all orders! we
                        ship all us domestic orders within{" "}
                        <b>5-10 business days!</b>
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
                <details className="product-description description-wrapper">
                  <summary className="">Description</summary>
                  <div className="product-description-content">
                    <p>{product?.description}</p>
                  </div>
                </details>
                <div className="product-review">
                  <div className="">
                    <h3 id="review">Reviews</h3>
                    <div className="review-inner-wrapper">
                      <div className="review-head d-flex justify-content-between align-items-end">
                        <div>
                          <h4 className="mb-2">Customer Review</h4>
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
                                      {user?.[0]?._id === review?.userId ? (
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
                                      ) : (
                                        <div></div>
                                      )}
                                    </div>
                                    <p className="mt-0">{review?.reviewDate}</p>
                                    <p className="mt-3">{review?.review}</p>
                                  </div>
                                );
                              })}
                          </div>
                          {!isLoading && (
                            <div className="d-flex gap-10 align-items-center">
                              <ReactStars
                                count={5}
                                size={24}
                                value={Number(product?.totalRating)}
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
                      </div>
                      <CreateOrUpdateReview
                        handleUpdateReview={handleUpdateReview}
                        handleWriteReview={handleWriteReview}
                        edit={edit}
                        user={user}
                        productId={productId}
                        setEdit={setEdit}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-recommendation">
              <div>
                <PageHeading
                  heading={"Popular Products"}
                  btnText={"Shop Now >>>"}
                  type="tags"
                  content="featured"
                />
                <ProductCarousel products={popularProducts} />
              </div>
              <CustomModel
                open={open}
                hideModal={hideModal}
                performAction={() => deleteReviewHandler(reviewId)}
                title="Are you sure want to delete this review"
              />
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default SingleProduct;
