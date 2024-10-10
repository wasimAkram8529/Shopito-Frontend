import React, { useState } from "react";
import "./Home.css";
import { NavLink, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../../components/BlogCard";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import { services } from "../../utils/Data";
import Slider from "../../components/slider/Slider";
import ProductCarousel from "../../components/corousel/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllBlogs } from "../../features/blogs/blogSlice";
import moment from "moment";
import { getProducts } from "../../features/products/productSlice";
import { shortenText } from "../../utils/Validator";
import Loader from "../../components/loader/Loader";
import {
  filterProduct,
  generateCarouselItem,
  generateSpecialCarouselItem,
} from "../../utils/importantFunctions";
import ReactStars from "react-rating-stars-component";
import { useTranslation } from "react-i18next";

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

const Home = () => {
  const dispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { t } = useTranslation();

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    dispatch(getAllBlogs({}));
    dispatch(getProducts({ sort: "", minAmount: 0, maxAmount: 1000000007 }));
    window.addEventListener("resize", updateScreenWidth);
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  const { blogs } = useSelector((state) => state.blog);
  const { products, isLoading } = useSelector((state) => state.product);

  // console.log("products", products);

  let popularProducts = [];
  let featureProducts = [];
  let specialProducts = [];
  let slider = [];
  let newLaunch = [];
  let latestProduct = [];
  let newArrivals = [];
  let bestSelling = [];
  let topRated = [];
  let mobilePhones = [];
  let womenCollection = [];
  let menCollection = [];
  let shoes = [];
  let watch = [];
  let homeAndFurniture = [];

  popularProducts = filterProduct(products, "tags", "popular");

  featureProducts = filterProduct(products, "tags", "featured");

  specialProducts = filterProduct(products, "tags", "special");

  slider = filterProduct(products, "tags", "slider");

  newLaunch = filterProduct(products, "tags", "newLaunch");

  latestProduct = filterProduct(products, "tags", "latest");

  newArrivals = filterProduct(products, "tags", "new_arrivals");

  bestSelling = filterProduct(products, "tags", "best_selling");

  topRated = filterProduct(products, "tags", "top_rated");

  mobilePhones = filterProduct(products, "category", "Mobile Phone");

  menCollection = filterProduct(products, "category", "Men Collection");

  womenCollection = filterProduct(products, "category", "Women Collection");

  shoes = filterProduct(products, "category", "Shoes");

  watch = filterProduct(products, "category", "Watch");

  homeAndFurniture = filterProduct(products, "category", "Home and furniture");

  const latestProducts = generateCarouselItem(latestProduct);

  featureProducts = generateCarouselItem(featureProducts);

  popularProducts = generateCarouselItem(popularProducts);

  specialProducts = generateSpecialCarouselItem(specialProducts);

  mobilePhones = generateSpecialCarouselItem(mobilePhones);

  womenCollection = generateSpecialCarouselItem(womenCollection);

  menCollection = generateSpecialCarouselItem(menCollection);

  shoes = generateCarouselItem(shoes);

  newArrivals = generateSpecialCarouselItem(newArrivals);

  watch = generateSpecialCarouselItem(watch);

  homeAndFurniture = generateSpecialCarouselItem(homeAndFurniture);
  //console.log(specialProducts);

  return (
    <>
      {isLoading && <Loader />}
      <div className="home-container">
        <Meta title="Shopito" />
        <Slider slider={slider} />
        <Container>
          <div className="services">
            {services?.map((item, indx) => {
              return (
                <div className="d-flex align-items-center gap-15" key={indx}>
                  <img src={item.images} alt="Services" />
                  <div>
                    <h6>{item.title}</h6>
                    <p className="mb-0">{item.tagline}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
        <Container class1="marquee-wrapper container-padding">
          <div className="our-brands">
            <h3 className="section-heading">{t("our_brands")}</h3>
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </Container>
        <Container>
          <PageHeading
            heading={t("latest_products")}
            btnText={t("shop_now_>>>")}
            type="tags"
            content="latest"
          />
          <ProductCarousel products={latestProducts} />
        </Container>
        <Container>
          <PageHeading
            heading={t("new_arrivals")}
            btnText={t("shop_now_>>>")}
            type="tags"
            content="new_arrivals"
          />
          <ProductCarousel products={newArrivals} />
        </Container>
        <Container>
          <PageHeading
            heading={t("mobile_phones")}
            btnText={t("shop_now_>>>")}
            type="category"
            content="Mobile Phone"
          />
          <ProductCarousel products={mobilePhones} />
        </Container>
        <Container>
          <div className="best-top-selling-product">
            <div className="best-selling-product">
              <PageHeading
                heading={t("best_selling")}
                btnText={t("shop_now_>>>")}
                type="tags"
                content="best_selling"
              />
              <div className="row">
                {bestSelling?.length !== 0 &&
                  bestSelling?.map((product) => {
                    return (
                      <div
                        className="col-sm-6 col-12 best-selling-single-product"
                        key={product?._id}
                      >
                        <NavLink to={`/product/${product?._id}`}>
                          <div className="card-img">
                            <img src={product?.image?.[0]?.url} alt="" />
                          </div>
                          <div className="card-body">
                            <div className="card-title">
                              {shortenText(product?.title, 10)}
                            </div>
                            {Number(product?.totalRating) !== 0 && (
                              <div className="product-star">
                                <ReactStars
                                  count={5}
                                  size={24}
                                  value={Number(product?.totalRating)}
                                  edit={false}
                                  activeColor="#ffd700"
                                />
                              </div>
                            )}
                            <div className="card-text">{`₹${product?.price}`}</div>
                          </div>
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="top-rated-product">
              <PageHeading
                heading={t("top_rated")}
                btnText={t("shop_now_>>>")}
                type="tags"
                content="best_selling"
              />
              <div className="row">
                {bestSelling?.length !== 0 &&
                  bestSelling?.map((product) => {
                    return (
                      <div
                        className="col-sm-6 col-12 best-selling-single-product"
                        key={product?._id}
                      >
                        <NavLink to={`/product/${product?._id}`}>
                          <div className="card-img">
                            <img src={product?.image?.[0]?.url} alt="" />
                          </div>
                          <div className="card-body">
                            <div className="card-title">
                              {shortenText(product?.title, 15)}
                            </div>
                            {Number(product?.totalRating) !== 0 && (
                              <div className="product-star">
                                <ReactStars
                                  count={5}
                                  size={24}
                                  value={Number(product?.totalRating)}
                                  edit={false}
                                  activeColor="#ffd700"
                                />
                              </div>
                            )}
                            <div className="card-text">{`₹${product?.price}`}</div>
                          </div>
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          {/* <div className="best-top-selling">
            <div className="">
              <PageHeading
                heading={t("best_selling")}
                btnText={t("shop_now_>>>")}
                type="tags"
                content="best_selling"
              />
              <div className="row">
                {bestSelling?.length !== 0 &&
                  bestSelling?.map((product) => {
                    return (
                      <div
                        className="col-sm-6 col-12 best-selling-single-product"
                        key={product?._id}
                      >
                        <NavLink to={`/product/${product?._id}`}>
                          <div className="card-img">
                            <img src={product?.image?.[0]?.url} alt="" />
                          </div>
                          <div className="card-body">
                            <div className="card-title">
                              {shortenText(product?.title, 15)}
                            </div>
                            {Number(product?.totalRating) !== 0 && (
                              <div className="product-star">
                                <ReactStars
                                  count={5}
                                  size={24}
                                  value={Number(product?.totalRating)}
                                  edit={false}
                                  activeColor="#ffd700"
                                />
                              </div>
                            )}
                            <div className="card-text">{`₹${product?.price}`}</div>
                          </div>
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="">
              <PageHeading
                heading={t("top_rated")}
                btnText={t("shop_now_>>>")}
                type="tags"
                content="best_selling"
              />
              <div className="row">
                {bestSelling?.length !== 0 &&
                  bestSelling?.map((product) => {
                    return (
                      <div
                        className="col-sm-6 col-12 best-selling-single-product"
                        key={product?._id}
                      >
                        <NavLink to={`/product/${product?._id}`}>
                          <div className="card-img">
                            <img src={product?.image?.[0]?.url} alt="" />
                          </div>
                          <div className="card-body">
                            <div className="card-title">
                              {shortenText(product?.title, 15)}
                            </div>
                            {Number(product?.totalRating) !== 0 && (
                              <div className="product-star">
                                <ReactStars
                                  count={5}
                                  size={24}
                                  value={Number(product?.totalRating)}
                                  edit={false}
                                  activeColor="#ffd700"
                                />
                              </div>
                            )}
                            <div className="card-text">{`₹${product?.price}`}</div>
                          </div>
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div> */}
        </Container>
        <Container>
          <PageHeading
            heading={t("featured_products")}
            btnText={t("shop_now_>>>")}
            type="tags"
            content="featured"
          />
          <ProductCarousel products={featureProducts} />
        </Container>
        <Container>
          <PageHeading
            heading={t("special_products")}
            btnText={t("shop_now_>>>")}
            type="tags"
            content="special"
          />
          <ProductCarousel products={specialProducts} />
        </Container>
        <Container>
          <PageHeading
            heading={t("popular_products")}
            btnText={t("shop_now_>>>")}
            type="tags"
            content="popular"
          />
          <ProductCarousel products={popularProducts} />
        </Container>
        <Container>
          <PageHeading
            heading={t("men_collection")}
            btnText={t("shop_now_>>>")}
            type="category"
            content="Men Collection"
          />
          <ProductCarousel products={menCollection} />
        </Container>
        <Container>
          <PageHeading
            heading={t("women_collection")}
            btnText={t("shop_now_>>>")}
            type="category"
            content="Women Collection"
          />
          <ProductCarousel products={womenCollection} />
        </Container>
        <Container>
          <PageHeading
            heading={t("shoes")}
            btnText={t("shop_now_>>>")}
            type="category"
            content="Shoes"
          />
          <ProductCarousel products={shoes} />
        </Container>
        <Container>
          <PageHeading
            heading={t("watch")}
            btnText={t("shop_now_>>>")}
            type="category"
            content="Watch"
          />
          <ProductCarousel products={watch} />
        </Container>
        <Container>
          <PageHeading
            heading={t("home_appliances")}
            btnText={t("shop_now_>>>")}
            type="category"
            content="Home and furniture"
          />
          <ProductCarousel products={homeAndFurniture} />
        </Container>
        <Container class1="blog-wrapper">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">{t("our_latest_blogs")}</h3>
            </div>
            <div className="row blog-container">
              {blogs && blogs?.length !== 0 ? (
                blogs?.map((blog) => {
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
              ) : (
                <div className="text-center fs-5">{t("empty_blogs")}</div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;

//  return (
//    <>
//      {isLoading && <Loader />}
//      <div className="home-container">
//        <Meta title="Shopito" />
//        <Slider slider={slider} />
//        <Container class1="home-wrapper-2 container-padding">
//          <div className="services">
//            {services?.map((item, indx) => {
//              return (
//                <div className="d-flex align-items-center gap-15" key={indx}>
//                  <img src={item.images} alt="Services" />
//                  <div>
//                    <h6>{item.title}</h6>
//                    <p className="mb-0">{item.tagline}</p>
//                  </div>
//                </div>
//              );
//            })}
//          </div>
//        </Container>
//        <Container class1="marquee-wrapper container-padding">
//          <h3 className="section-heading">{t("our_brands")}</h3>
//          <div className="marquee-inner-wrapper card-wrapper">
//            <Marquee className="d-flex">
//              <div className="mx-4 w-25">
//                <img src="images/brand-01.png" alt="brand" />
//              </div>
//              <div className="mx-4 w-25">
//                <img src="images/brand-02.png" alt="brand" />
//              </div>
//              <div className="mx-4 w-25">
//                <img src="images/brand-03.png" alt="brand" />
//              </div>
//              <div className="mx-4 w-25">
//                <img src="images/brand-04.png" alt="brand" />
//              </div>
//              <div className="mx-4 w-25">
//                <img src="images/brand-05.png" alt="brand" />
//              </div>
//              <div className="mx-4 w-25">
//                <img src="images/brand-06.png" alt="brand" />
//              </div>
//              <div className="mx-4 w-25">
//                <img src="images/brand-07.png" alt="brand" />
//              </div>
//              <div className="mx-4 w-25">
//                <img src="images/brand-08.png" alt="brand" />
//              </div>
//            </Marquee>
//          </div>
//        </Container>
//        <div className="container-xxl container-padding">
//          <PageHeading
//            heading={t("latest_products")}
//            btnText={t("shop_now_>>>")}
//            type="tags"
//            content="latest"
//          />
//          <ProductCarousel products={latestProducts} />
//        </div>
//        <div className="container-xxl container-padding">
//          <PageHeading
//            heading={t("new_arrivals")}
//            btnText={t("shop_now_>>>")}
//            type="tags"
//            content="new_arrivals"
//          />
//          <ProductCarousel products={newArrivals} />
//        </div>
//        <Container class1="container-padding">
//          <PageHeading
//            heading={t("mobile_phones")}
//            btnText={t("shop_now_>>>")}
//            type="category"
//            content="Mobile Phone"
//          />
//          <ProductCarousel products={mobilePhones} />
//        </Container>
//        <div className="container-xxl container-padding best-top-selling">
//          <div className="">
//            <PageHeading
//              heading={t("best_selling")}
//              btnText={t("shop_now_>>>")}
//              type="tags"
//              content="best_selling"
//            />
//            <div className="row">
//              {bestSelling?.length !== 0 &&
//                bestSelling?.map((product) => {
//                  return (
//                    <div
//                      className="col-sm-6 col-12 best-selling-single-product"
//                      key={product?._id}
//                    >
//                      <NavLink to={`/product/${product?._id}`}>
//                        <div className="card-img">
//                          <img src={product?.image?.[0]?.url} alt="" />
//                        </div>
//                        <div className="card-body">
//                          <div className="card-title">
//                            {shortenText(product?.title, 15)}
//                          </div>
//                          {Number(product?.totalRating) !== 0 && (
//                            <div className="product-star">
//                              <ReactStars
//                                count={5}
//                                size={24}
//                                value={Number(product?.totalRating)}
//                                edit={false}
//                                activeColor="#ffd700"
//                              />
//                            </div>
//                          )}
//                          <div className="card-text">{`₹${product?.price}`}</div>
//                        </div>
//                      </NavLink>
//                    </div>
//                  );
//                })}
//            </div>
//          </div>
//          <div className="">
//            <PageHeading
//              heading={t("top_rated")}
//              btnText={t("shop_now_>>>")}
//              type="tags"
//              content="best_selling"
//            />
//            <div className="row">
//              {bestSelling?.length !== 0 &&
//                bestSelling?.map((product) => {
//                  return (
//                    <div
//                      className="col-sm-6 col-12 best-selling-single-product"
//                      key={product?._id}
//                    >
//                      <NavLink to={`/product/${product?._id}`}>
//                        <div className="card-img">
//                          <img src={product?.image?.[0]?.url} alt="" />
//                        </div>
//                        <div className="card-body">
//                          <div className="card-title">
//                            {shortenText(product?.title, 15)}
//                          </div>
//                          {Number(product?.totalRating) !== 0 && (
//                            <div className="product-star">
//                              <ReactStars
//                                count={5}
//                                size={24}
//                                value={Number(product?.totalRating)}
//                                edit={false}
//                                activeColor="#ffd700"
//                              />
//                            </div>
//                          )}
//                          <div className="card-text">{`₹${product?.price}`}</div>
//                        </div>
//                      </NavLink>
//                    </div>
//                  );
//                })}
//            </div>
//          </div>
//        </div>
//        <Container class1="container-padding">
//          <PageHeading
//            heading={t("featured_products")}
//            btnText={t("shop_now_>>>")}
//            type="tags"
//            content="featured"
//          />
//          <ProductCarousel products={featureProducts} />
//        </Container>
//        <Container class1="container-padding">
//          <PageHeading
//            heading={t("special_products")}
//            btnText={t("shop_now_>>>")}
//            type="tags"
//            content="special"
//          />
//          <ProductCarousel products={specialProducts} />
//        </Container>
//        <Container class1="container-padding">
//          <PageHeading
//            heading={t("popular_products")}
//            btnText={t("shop_now_>>>")}
//            type="tags"
//            content="popular"
//          />
//          <ProductCarousel products={popularProducts} />
//        </Container>
//        <Container class1="container-padding">
//          <PageHeading
//            heading={t("men_collection")}
//            btnText={t("shop_now_>>>")}
//            type="category"
//            content="Men Collection"
//          />
//          <ProductCarousel products={menCollection} />
//        </Container>
//        <Container class1="container-padding">
//          <PageHeading
//            heading={t("women_collection")}
//            btnText={t("shop_now_>>>")}
//            type="category"
//            content="Women Collection"
//          />
//          <ProductCarousel products={womenCollection} />
//        </Container>
//        <Container class1="container-padding">
//          <PageHeading
//            heading={t("shoes")}
//            btnText={t("shop_now_>>>")}
//            type="category"
//            content="Shoes"
//          />
//          <ProductCarousel products={shoes} />
//        </Container>
//        <Container class1="container-padding">
//          <PageHeading
//            heading={t("watch")}
//            btnText={t("shop_now_>>>")}
//            type="category"
//            content="Watch"
//          />
//          <ProductCarousel products={watch} />
//        </Container>
//        <Container class1="container-padding">
//          <PageHeading
//            heading={t("home_appliances")}
//            btnText={t("shop_now_>>>")}
//            type="category"
//            content="Home and furniture"
//          />
//          <ProductCarousel products={homeAndFurniture} />
//        </Container>
//        <Container class1="blog-wrapper home-wrapper-2 container-padding">
//          <div className="row">
//            <div className="col-12">
//              <h3 className="section-heading">{t("our_latest_blogs")}</h3>
//            </div>
//            <div className="row">
//              {blogs && blogs?.length !== 0 ? (
//                blogs?.map((blog) => {
//                  return (
//                    <BlogCard
//                      title={blog?.title}
//                      key={blog?._id}
//                      description={blog?.description}
//                      id={blog?._id}
//                      imgURL={blog?.image?.[0]?.url}
//                      date={moment(blog?.createAt).format("DD-MMMM-YYYY")}
//                    />
//                  );
//                })
//              ) : (
//                <div className="text-center fs-5">{t("empty_blogs")}</div>
//              )}
//            </div>
//          </div>
//        </Container>
//      </div>
//    </>
//  );
