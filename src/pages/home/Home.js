import React from "react";
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

const PageHeading = ({ heading, btnText, type }) => {
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
                type: type,
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
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getProducts({ sort: "", minAmount: 0, maxAmount: 1000000007 }));
  }, []);

  const { blogs } = useSelector((state) => state.blog);
  const { products } = useSelector((state) => state.product);

  //console.log("products", products);

  let popularProducts = [];
  let featureProducts = [];
  let specialProducts = [];
  let slider = [];
  let newLaunch = [];
  let latestProduct = [];

  if (!products || products?.length !== 0) {
    popularProducts = products?.filter((product) => product.tags === "popular");
  }

  if (!products || products?.length !== 0) {
    featureProducts = products?.filter(
      (product) => product.tags === "featured"
    );
  }

  if (!products || products?.length !== 0) {
    specialProducts = products?.filter((product) => product.tags === "special");
  }

  if (!products || products?.length !== 0) {
    slider = products?.filter((product) => product.tags === "slider");
  }
  if (!products || products?.length !== 0) {
    newLaunch = products?.filter((product) => product.tags === "newLaunch");
  }
  if (!products || products?.length !== 0) {
    latestProduct = products?.filter((product) => product.tags === "latest");
  }

  //console.log("New Launch", newLaunch);
  //console.log("Slider", slider);
  //console.log("Popular Product", popularProducts);
  //console.log("Featured Product", featureProducts);
  // console.log("Special Product",specialProducts);

  const latestProducts = latestProduct.map((item) => (
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
  featureProducts = featureProducts.map((item) => (
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
  popularProducts = popularProducts.map((item) => (
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

  specialProducts = specialProducts.map((item) => {
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

  //console.log(specialProducts);
  return (
    <>
      <Meta title="Shopito" />
      <Slider slider={slider} />
      <Container class1="py-5">
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
              {/* <div className="inner-container">
                <div className="small-banner position-relative">
                  <img
                    src="images/catbanner-02.jpg"
                    className="img-fluid rounded-3"
                    alt="Main Banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>15% OFF</h4>
                    <h5>Smartwatch 7</h5>
                    <p>
                      Shop the latet band <br />
                      styles and colors.
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src="images/catbanner-04.jpg"
                    className="img-fluid rounded-3"
                    alt="Main Banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>FREE ENGRAVING</h4>
                    <h5>AirPods Max</h5>
                    <p>
                      High-fidelity playback & <br />
                      ultra-low distortion
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
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
      {/* <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between align-items-center flex-wrap">
              <div className=" d-flex gap-30 align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Headphone</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Headphones</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      <div className="container-xxl py-5">
        <div className="container">
          <PageHeading
            heading={"Latest Products"}
            btnText={"Shop Now >>>"}
            type="latest"
          />
          <ProductCarousel products={latestProducts} />
        </div>
      </div>
      {/* <Container class1="home-wrapper-2 py-5">
        <div className="row home-container-2">
          <div className="">
            <div className="categories d-flex align-items-center flex-wrap">
              <div className="">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="">
                <div>
                  <h6>Headphones</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
        <div className="row home-container-2">
          <div className="">
            <div className="categories d-flex align-items-center flex-wrap">
              <div className="">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="">
                <div>
                  <h6>Headphones</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      {/* {featureProducts.length !== 0 && (
        <Container class1="featured-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12 --flex-between">
              <h3 className="section-heading">Featured Collection</h3>
              <button
                className="--btn"
                onClick={() =>
                  navigate("/products", {
                    state: {
                      type: "featured",
                    },
                  })
                }
              >
                Shop Now {">>>"}
              </button>
            </div>
            {featureProducts?.length !== 0 &&
              featureProducts.map((product) => {
                const { _id, description, title, price, totalrating } = product;
                return (
                  <ProductCard
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    price={price}
                    imgURL={product?.image?.[0].url}
                    rating={Number(totalrating)}
                  />
                );
              })}
          </div>
        </Container>
      )} */}
      <Container class1="py-5">
        <div className="container">
          <PageHeading
            heading={"Featured Products"}
            btnText={"Shop Now >>>"}
            type="featured"
          />
          <ProductCarousel products={featureProducts} />
        </div>
      </Container>
      <Container class1="py-5">
        <div className="container">
          <PageHeading
            heading={"Special Products"}
            btnText={"Shop Now >>>"}
            type="special"
          />
          <ProductCarousel products={specialProducts} />
        </div>
      </Container>
      {/* <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/SmartWatchSeries-07.webp"
                className="img-fluid"
                alt="Smart Watch"
              />
              <div className="famous-content position-absolute">
                <h5>BIG SCREEN</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399 or $16.62/mo for 24 mo.</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/macBook-01.webp"
                className="img-fluid"
                alt="Smart Watch"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">STUDIO DISPLAY</h5>
                <h6 className="text-dark">600 nits of brightness</h6>
                <p className="text-dark">27-inch 5K Retina Display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/iphone-01.webp"
                className="img-fluid"
                alt="I Phone"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">SMARTPHONES</h5>
                <h6 className="text-dark">I Phone 13 Pro</h6>
                <p className="text-dark">
                  Now in Green From $999.00 or $41.62/mo for 24 mo Footnote*
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/speaker.webp"
                className="img-fluid"
                alt="Smart Watch"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">HOME SPEAKERS</h5>
                <h6 className="text-dark">Room-filling sound</h6>
                <p className="text-dark">From $699 or $116.58/mo for 6 mo.*</p>
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      {/* {specialProducts.length !== 0 && (
        <Container class1="home-wrapper-2 py-5">
          <section className="special-product py-5 home-wrapper-2">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12 --flex-between">
                  <h3 className="section-heading">Special Products</h3>
                  <button
                    className="--btn"
                    onClick={() =>
                      navigate("/products", {
                        state: {
                          type: "special",
                        },
                      })
                    }
                  >
                    Shop Now {">>>"}
                  </button>
                </div>
              </div>
              <div className="row">
                {specialProducts.length !== 0 &&
                  specialProducts.map((product) => {
                    const {
                      _id,
                      sold,
                      quantity,
                      title,
                      price,
                      totalrating,
                      brand,
                    } = product;
                    return (
                      <SpecialProduct
                        key={_id}
                        id={_id}
                        brand={brand}
                        title={title}
                        sold={sold}
                        quantity={quantity}
                        price={price}
                        imgURL={product?.image?.[0].url}
                        rating={Number(totalrating)}
                      />
                    );
                  })}
              </div>
            </div>
          </section>
        </Container>
      )} */}
      {/* {popularProducts.length !== 0 && (
        <Container class1="popular-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12 --flex-between">
              <h3 className="section-heading">Our Popular Products</h3>
              <button
                className="--btn"
                onClick={() =>
                  navigate("/products", {
                    state: {
                      type: "popular",
                    },
                  })
                }
              >
                Shop Now {">>>"}
              </button>
            </div>
            {popularProducts?.length !== 0 &&
              popularProducts.map((product) => {
                const { _id, description, title, price, totalrating, color } =
                  product;
                return (
                  <ProductCard
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    price={price}
                    imgURL={product?.image?.[0].url}
                    rating={Number(totalrating)}
                    color={color?.[0]?.title}
                  />
                );
              })}
          </div>
        </Container>
      )} */}
      <Container class1="py-5">
        <div className="container">
          <PageHeading heading={"Popular Products"} btnText={"Shop Now >>>"} />
          <ProductCarousel products={popularProducts} />
        </div>
      </Container>
      <Container class1="marquee-wrapper py-5">
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
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
          <div className="row">
            {!blogs && blogs?.length !== 0 ? (
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
                It's a blog break today! Visit us again tomorrow for your daily
                dose of insights.
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
