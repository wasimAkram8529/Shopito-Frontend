import React, { useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../../components/BlogCard";
import ProductCard from "../../components/productCard/ProductCard";
import SpecialProduct from "../../components/special-product/SpecialProduct";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import { services } from "../../utils/Data";
import Slider from "../../components/slider/Slider";
import CarouselItem from "../../components/corousel/CarouselItem";
import ProductCarousel from "../../components/corousel/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllBlogs } from "../../features/blogs/blogSlice";
import moment from "moment";
import { getProducts } from "../../features/products/productSlice";
import { shortenText } from "../../utils/Validator";
import Loader from "../../components/loader/Loader";
import { totalDisplayImg } from "../../utils/importantFunctions";
import ReactStars from "react-rating-stars-component";

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

const filterProduct = (products, filterType, filterOnWhich) => {
  let data = [];

  if (!products || products?.length !== 0) {
    data = products?.filter((product) => product[filterType] === filterOnWhich);
  }

  return data;
};

const generateCarouselItem = (products) => {
  let data = [];
  data = products.map((item) => (
    <div key={item?._id}>
      <CarouselItem
        name={item?.title}
        url={item?.image?.[0]?.url}
        price={item?.price}
        description={item?.description}
        _id={item?._id}
      />
    </div>
  ));
  return data;
};
const generateSpecialCarouselItem = (products) => {
  let data = [];
  data = products.map((item) => {
    const { totalrating, brand } = item;
    return (
      <div key={item?._id} className="special-product-slider">
        <SpecialProduct
          name={item?.title}
          url={item?.image?.[0]?.url}
          price={item?.price}
          description={item?.description}
          _id={item?._id}
          brand={brand}
          rating={Number(totalrating)}
        />
      </div>
    );
  });

  return data;
};
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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

  // console.log(mobilePhones);

  // console.log(bestSelling);
  //console.log(newArrivals);

  //console.log("New Launch", newLaunch);
  //console.log("Slider", slider);
  //console.log("Popular Product", popularProducts);
  //console.log("Featured Product", featureProducts);
  // console.log("Special Product",specialProducts);

  // newArrivals = totalDisplayImg(4, newArrivals);

  if (screenWidth > 576 && screenWidth <= 992) {
    newArrivals = totalDisplayImg(3, newArrivals);
  }
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
      <div className="home-container">
        {isLoading && <Loader />}
        <Meta title="Shopito" />
        <Slider slider={slider} />
        {/* <Container class1="container-padding">
        <div className="home-container-1">
          <div>
            <div className="main-banner position-relative">
              <div className="picture-container">
                <img
                  src="images/main-banner-1.jpg"
                  className="img-fluid rounded-3"
                  alt="Main Banner"
                />
              </div>
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>{newLaunch?.[0]?.title}</h5>
                <p>
                  From {`₹${newLaunch?.[0]?.price}`} or{" "}
                  {`₹${Math.round(newLaunch?.[0]?.price / 6)}`}/mo. <br />
                  for 6 mo. Footnote*
                </p>
                <Link className="button" to={`/product/${newLaunch?.[0]?._id}`}>
                  BUY NOW
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="main-banner-content-2">
              <div className="inner-container">
                <div
                  className="small-banner-content-2 position-relative"
                  onClick={() => navigate(`/product/${newLaunch?.[1]?._id}`)}
                >
                  <div className="picture-container">
                    <img
                      src="images/catbanner-01.jpg"
                      className="img-fluid rounded-3"
                      alt="Main Banner"
                    />
                  </div>
                  <div className="small-banner-content position-absolute">
                    <h4>BEST SALE</h4>
                    <h5>{shortenText(newLaunch?.[1]?.title, 10)}</h5>
                    <p>
                      From {`₹${newLaunch?.[1]?.price}`} or{" "}
                      {`₹${Math.round(newLaunch?.[1]?.price / 6)}`}/mo.
                    </p>
                  </div>
                </div>
                <div className="small-banner-content-2 position-relative">
                  <img
                    src="images/catbanner-03.jpg"
                    className="img-fluid rounded-3"
                    alt="Main Banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>{shortenText(newLaunch?.[2]?.title, 10)}</h5>
                    <p>
                      From {`₹${newLaunch?.[2]?.price}`} or{" "}
                      {`₹${Math.round(newLaunch?.[2]?.price / 6)}`}/mo.
                    </p>
                  </div>
                </div>
              </div>
              <div className="inner-container">
                <div className="small-banner-content-2 position-relative">
                  <div className="picture-container">
                    <img
                      src="images/catbanner-01.jpg"
                      className="img-fluid rounded-3"
                      alt="Main Banner"
                    />
                  </div>
                  <div className="small-banner-content position-absolute">
                    <h4>BEST SALE</h4>
                    <h5>{shortenText(newLaunch?.[3]?.title, 10)}</h5>
                    <p>
                      From {`₹${newLaunch?.[3]?.price}`} or{" "}
                      {`₹${Math.round(newLaunch?.[3]?.price / 6)}`}/mo.
                    </p>
                  </div>
                </div>
                <div className="small-banner-content-2 position-relative">
                  <img
                    src="images/catbanner-03.jpg"
                    className="img-fluid rounded-3"
                    alt="Main Banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>{shortenText(newLaunch?.[4]?.title, 10)}</h5>
                    <p>
                      From {`₹${newLaunch?.[4]?.price}`} or{" "}
                      {`₹${Math.round(newLaunch?.[4]?.price / 6)}`}/mo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container> */}
        <Container class1="home-wrapper-2 container-padding">
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
          <h3 className="section-heading">Our Brands</h3>
          <div className="row">
            <div className="col-12">
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
          </div>
        </Container>
        <div className="container-xxl container-padding">
          <PageHeading
            heading={"Latest Products"}
            btnText={"View all >>>"}
            type="tags"
            content="latest"
          />
          <ProductCarousel products={latestProducts} />
        </div>
        <div className="container-xxl container-padding">
          <PageHeading
            heading={"New arrivals"}
            btnText={"Shop now >>>"}
            type="tags"
            content="new_arrivals"
          />
          <ProductCarousel products={newArrivals} />
          {/* <div className="row">
          {newArrivals?.length !== 0 &&
            newArrivals?.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  baseURL="product"
                  id={product._id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  imgURL={product.image[0].url}
                  rating={Number(product.totalrating)}
                />
              );
            })}
        </div> */}
        </div>
        <Container class1="container-padding">
          <PageHeading
            heading={"Mobile Phones"}
            btnText={"View all >>>"}
            type="category"
            content="Mobile Phone"
          />
          <ProductCarousel products={mobilePhones} />
        </Container>
        <div className="container-xxl container-padding best-top-selling">
          <div className="">
            <PageHeading
              heading={"Best Selling"}
              btnText={"Shop now >>>"}
              type="tags"
              content="top_rated"
            />
            <div className="row">
              {bestSelling?.length !== 0 &&
                bestSelling?.map((product) => {
                  return (
                    <div
                      className="col-sm-6 col-12 best-selling-single-product"
                      key={product?._id}
                    >
                      <div className="card-img">
                        <img src={product?.image?.[0]?.url} alt="" />
                      </div>
                      <div className="card-body">
                        <div className="card-title">
                          {shortenText(product?.title, 15)}
                        </div>
                        {Number(product?.totalrating) != 0 && (
                          <div className="product-star">
                            <ReactStars
                              count={5}
                              size={24}
                              value={Number(product?.totalrating)}
                              edit={false}
                              activeColor="#ffd700"
                            />
                          </div>
                        )}
                        <div className="card-text">{`₹${product?.price}`}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="">
            <PageHeading
              heading={"Top rated"}
              btnText={"Shop now >>>"}
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
                      <div className="card-img">
                        <img src={product?.image?.[0]?.url} alt="" />
                      </div>
                      <div className="card-body">
                        <div className="card-title">
                          {shortenText(product?.title, 15)}
                        </div>
                        {Number(product?.totalrating) != 0 && (
                          <div className="product-star">
                            <ReactStars
                              count={5}
                              size={24}
                              value={Number(product?.totalrating)}
                              edit={false}
                              activeColor="#ffd700"
                            />
                          </div>
                        )}
                        <div className="card-text">{`₹${product?.price}`}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <Container class1="container-padding">
          <PageHeading
            heading={"Featured Products"}
            btnText={"Shop Now >>>"}
            type="tags"
            content="featured"
          />
          <ProductCarousel products={featureProducts} />
        </Container>
        <Container class1="container-padding">
          <PageHeading
            heading={"Special Products"}
            btnText={"Shop Now >>>"}
            type="tags"
            content="special"
          />
          <ProductCarousel products={specialProducts} />
        </Container>
        <Container class1="container-padding">
          <PageHeading
            heading={"Popular Products"}
            btnText={"Shop Now >>>"}
            type="tags"
            content="popular"
          />
          <ProductCarousel products={popularProducts} />
        </Container>
        <Container class1="container-padding">
          <PageHeading
            heading={"Men Collection"}
            btnText={"Shop Now >>>"}
            type="category"
            content="Men Collection"
          />
          <ProductCarousel products={menCollection} />
        </Container>
        <Container class1="container-padding">
          <PageHeading
            heading={"Women Collection"}
            btnText={"Shop Now >>>"}
            type="category"
            content="Women Collection"
          />
          <ProductCarousel products={womenCollection} />
        </Container>
        <Container class1="container-padding">
          <PageHeading
            heading={"Shoes"}
            btnText={"Shop Now >>>"}
            type="category"
            content="Shoes"
          />
          <ProductCarousel products={shoes} />
        </Container>
        <Container class1="container-padding">
          <PageHeading
            heading={"Watch"}
            btnText={"Shop Now >>>"}
            type="category"
            content="Watch"
          />
          <ProductCarousel products={watch} />
        </Container>
        <Container class1="container-padding">
          <PageHeading
            heading={"Home Appliances"}
            btnText={"Shop Now >>>"}
            type="category"
            content="Home and furniture"
          />
          <ProductCarousel products={homeAndFurniture} />
        </Container>
        <Container class1="blog-wrapper home-wrapper-2 container-padding">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Latest Blogs</h3>
            </div>
            <div className="row">
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
                <div className="text-center fs-5">
                  It's a blog break today! Visit us again tomorrow for your
                  daily dose of insights.
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;
