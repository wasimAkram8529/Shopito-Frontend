import "./OurStore.css";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../../components/ProductCard";
import Color from "../../components/Color";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/products/productSlice";
import { useLocation } from "react-router-dom";

const OurStore = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [brands, setBrands] = useState([]);
  const [pCategories, setPCategories] = useState([]);
  const [pTags, setProductTags] = useState([]);
  const [pColors, setPColors] = useState([]);
  const [selectedTags, setSelectedTags] = useState({
    searchCategory: "",
    value: "",
  });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(1000000007);
  const [sort, setSort] = useState("");
  const [filterMenu, setFilterMenu] = useState(false);

  //console.log(location?.state);

  useEffect(() => {
    dispatch(
      getProducts({ sort, minAmount, maxAmount, tags: location?.state?.type })
    );
  }, [sort, minAmount, maxAmount]);

  const { products, isLoading, isSuccess } = useSelector(
    (state) => state.product
  );

  // console.log("Min", minAmount);
  // console.log("Max", maxAmount, typeof maxAmount);
  //console.log(products);
  useEffect(() => {
    let availableMinAmount = 1e9 + 7;
    let availableMaxAmount = 0;
    let allBrands = [];
    let allPCategory = [];
    let allPTags = [];
    let allColors = [];

    for (let i = 0; i < products?.length; i++) {
      if (products?.[i]?.price <= availableMinAmount) {
        availableMinAmount = products?.[i]?.price;
      }
      if (products?.[i]?.price >= availableMaxAmount) {
        availableMaxAmount = products?.[i]?.price;
      }
      allBrands.push(products?.[i]?.brand);
      allPCategory.push(products?.[i]?.category);
      allPTags.push(products?.[i]?.tags);
      allColors.push(products?.[i]?.color);
    }

    allBrands = Array.from(new Set(allBrands));
    allPCategory = Array.from(new Set(allPCategory));
    allPTags = Array.from(new Set(allPTags));
    allColors = Array.from(new Set(allColors));

    setBrands(allBrands);
    setPCategories(allPCategory);
    setProductTags(allPTags);
    setPColors(allColors);
  }, [products]);

  //console.log(selectedTags);

  useEffect(() => {
    const searchedProduct = products?.filter((product) => {
      if (
        selectedTags.searchCategory === "category" &&
        selectedTags.value === product.category
      ) {
        return true;
      } else if (
        selectedTags.searchCategory === "brand" &&
        selectedTags.value === product.brand
      ) {
        return true;
      } else if (
        selectedTags.searchCategory === "tags" &&
        selectedTags.value === product.tags
      ) {
        return true;
      } else {
        return false;
      }
    });
    setRelatedProducts(searchedProduct);
  }, [selectedTags]);

  // useEffect(() => {
  //   let filteredProduct = [];
  //   if (minAmount && maxAmount) {
  //     filteredProduct = products.filter((product) => {
  //       if (product?.price >= minAmount && product?.price <= maxAmount) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   } else if (minAmount && !maxAmount) {
  //     filteredProduct = products.filter((product) => {
  //       if (product?.price >= minAmount) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   } else if (!minAmount && maxAmount) {
  //     filteredProduct = products.filter((product) => {
  //       if (product?.price <= maxAmount) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   }
  //   setRelatedProducts(filteredProduct);
  // }, [minAmount, maxAmount]);

  const [grid, setGrid] = useState(12);
  //console.log(sort);

  //console.log(filterMenu);
  return (
    <>
      <Meta title="Shopito" />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="store">
          <div className={filterMenu ? "store-left-part" : "close-filter-menu"}>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {pCategories?.map((category, indx) => {
                    return (
                      <span
                        key={indx}
                        style={{ cursor: "pointer" }}
                        className="badge bg-light rounded-3 text-secondary py-2 px-3"
                        onClick={(e) => {
                          setFilterMenu(false);
                          setSelectedTags({
                            searchCategory: "category",
                            value: e.target.innerText,
                          });
                        }}
                      >
                        {category}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tag</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {pTags?.map((tag, indx) => {
                    return (
                      <span
                        key={indx}
                        style={{ cursor: "pointer" }}
                        className="badge bg-light rounded-3 text-secondary py-2 px-3"
                        onClick={(e) => {
                          setFilterMenu(false);
                          setSelectedTags({
                            searchCategory: "tags",
                            value: e.target.innerText,
                          });
                        }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* <div className="filter-card mb-3">
              <h3 className="filter-title">Product Colors</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {pColors?.map((color, indx) => {
                    return (
                      <span
                        key={indx}
                        style={{ cursor: "pointer" }}
                        className="badge bg-light rounded-3 text-secondary py-2 px-3"
                        onClick={(e) => {
                          setSelectedTags({
                            searchCategory: "color",
                            value: e.target.innerText,
                          });
                        }}
                      >
                        {color}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div> */}
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Brands</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {brands?.map((brand, indx) => {
                    return (
                      <span
                        key={indx}
                        style={{ cursor: "pointer" }}
                        className="badge bg-light rounded-3 text-secondary py-2 px-3"
                        onClick={(e) => {
                          setFilterMenu(false);
                          setSelectedTags({
                            searchCategory: "brand",
                            value: e.target.innerText,
                          });
                        }}
                      >
                        {brand}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="text-center mb-3">
              <button
                className="button"
                style={{ width: "100%" }}
                onClick={() => setRelatedProducts([])}
              >
                Reset Tags
              </button>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                {/* <h5 className="sub-title">Availability</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      In Stock (10)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      Out Of Stock (0)
                    </label>
                  </div>
                </div> */}
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center">
                  <div className="form-floating" style={{ flex: "1" }}>
                    <select
                      onChange={(e) => {
                        setFilterMenu(false);
                        if (e.target.value !== "Min") {
                          setMinAmount(Number(e.target.value));
                        } else {
                          setMinAmount(0);
                        }
                      }}
                      className="price-available-option"
                    >
                      <option value="Min" selected>
                        Min
                      </option>
                      <option value="500">₹500</option>
                      <option value="700">₹700</option>
                      <option value="1000">₹1000</option>
                      <option value="1500">₹1500</option>
                      <option value="1800">₹1800</option>
                      <option value="2000">₹2000</option>
                      <option value="2500">₹2500</option>
                      <option value="3000">₹3000</option>
                      <option value="4000">₹4000</option>
                      <option value="5000">₹5000</option>
                    </select>
                  </div>
                  <div className="form-floating to" style={{ flex: "1" }}>
                    <h6>To</h6>
                  </div>
                  <div className="form-floating" style={{ flex: "1" }}>
                    <select
                      onChange={(e) => {
                        if (e.target.value !== "Max") {
                          setMaxAmount(Number(e.target.value));
                        } else {
                          setMaxAmount(0);
                        }
                      }}
                      className="price-available-option"
                    >
                      <option value="Max" selected>
                        Max
                      </option>
                      <option value="7000">₹7000</option>
                      <option value="10000">₹10000</option>
                      <option value="15000">₹15000</option>
                      <option value="20000">₹20000</option>
                      <option value="25000">₹25000</option>
                      <option value="40000">₹40000</option>
                      <option value="50000">₹50000</option>
                      <option value="70000">₹70000</option>
                      <option value="100000">₹100000</option>
                      <option value="1000000">₹100000</option>
                    </select>
                    {/* <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      value={maxAmount}
                      max={possibleMaxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">To</label> */}
                  </div>
                </div>
                {/* <h5 className="sub-title">Colors</h5>
                <div>
                  <Color />
                </div>
                <h5 className="sub-title">Size</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-1"
                    />
                    <label className="form-check-label" htmlFor="color-1">
                      S (10)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-2"
                    />
                    <label className="form-check-label" htmlFor="color-2">
                      M (10)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-2"
                    />
                    <label className="form-check-label" htmlFor="color-2">
                      L (10)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-2"
                    />
                    <label className="form-check-label" htmlFor="color-2">
                      XL (10)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-2"
                    />
                    <label className="form-check-label" htmlFor="color-2">
                      XXL (10)
                    </label>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="store-right-part">
            <div className="filter-sort-grid mb-3">
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
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10 grid store-top-right-part">
                  <p className="totalProducts mb-0">
                    {relatedProducts.length !== 0
                      ? relatedProducts?.length
                      : products?.length}{" "}
                    Products
                  </p>
                  <div className="d-flex align-items-center gap-10 layout-selector">
                    <img
                      onClick={() => setGrid(3)}
                      src="images/gr4.svg"
                      className="d-block img-fluid fourProduct"
                      alt="grid"
                    />
                    <img
                      onClick={() => setGrid(4)}
                      src="images/gr3.svg"
                      className="d-block img-fluid threeProduct"
                      alt="grid"
                    />
                    <img
                      onClick={() => setGrid(6)}
                      src="images/gr2.svg"
                      className="d-block img-fluid twoProduct"
                      alt="grid"
                    />
                    <img
                      onClick={() => setGrid(12)}
                      src="images/gr.svg"
                      className="d-block img-fluid oneProduct"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="store-middle-right-part">
              <p className="mb-0 d-block" style={{ width: "100px" }}>
                Apply filters {">"}
              </p>
              <img
                src="images/gr.svg"
                className=""
                alt="grid"
                onClick={() => setFilterMenu(!filterMenu)}
              />
            </div>
            <div className="product-list pb-5">
              <div className="d-flex flex-wrap">
                {isSuccess && relatedProducts?.length !== 0
                  ? relatedProducts?.map((product) => {
                      return (
                        <ProductCard
                          grid={grid}
                          key={product._id}
                          id={product._id}
                          title={product.title}
                          description={product.description}
                          price={product.price}
                          imgURL={product.image[0].url}
                          rating={Number(product.totalrating)}
                        />
                      );
                    })
                  : products?.map((product) => {
                      return (
                        <ProductCard
                          grid={grid}
                          key={product._id}
                          id={product._id}
                          title={product.title}
                          description={product.description}
                          price={product.price}
                          imgURL={product.image[0].url}
                          rating={Number(product.totalrating)}
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

export default OurStore;
