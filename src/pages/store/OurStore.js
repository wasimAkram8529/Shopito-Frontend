import "./OurStore.css";
import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../../components/productCard/ProductCard";
import Color from "../../components/Color";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/products/productSlice";
import { useLocation } from "react-router-dom";
import { MdFilterAlt } from "react-icons/md";
import { IoMdClose, IoIosArrowDroprightCircle } from "react-icons/io";
import Loader from "../../components/loader/Loader";

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
  const [priceFilter, setPriceFilter] = useState({
    minAmount: 0,
    maxAmount: 100000,
  });
  const [sort, setSort] = useState("");
  const [filterMenu, setFilterMenu] = useState(false);

  //console.log(location?.state);

  // console.log(location?.state?.type, location?.state?.content);
  useEffect(() => {
    dispatch(
      getProducts({
        sort,
        minAmount: priceFilter.minAmount,
        maxAmount: priceFilter.maxAmount,
        [location?.state?.type]: location?.state?.content,
      })
    ).then(() => {
      //console.log(filterMenu);
    });
  }, [sort, priceFilter]);

  const { products, isLoading, isSuccess } = useSelector(
    (state) => state.product
  );

  // console.log("Min", minAmount);
  //console.log("Max", maxAmount);
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

  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

  const getValue = () => {
    if (
      minInputRef.current.value !== "min" &&
      maxInputRef.current.value !== "max"
    ) {
      setPriceFilter({
        minAmount: minInputRef.current.value,
        maxAmount: maxInputRef.current.value,
      });
    } else if (minInputRef.current.value !== "min") {
      setPriceFilter({
        minAmount: minInputRef.current.value,
        maxAmount: 100000,
      });
    } else if (maxInputRef.current.value !== "max") {
      setPriceFilter({
        minAmount: 0,
        maxAmount: maxInputRef.current.value,
      });
    }

    //console.log("max", maxInputRef.current.value);
  };
  const [grid, setGrid] = useState(12);
  //console.log(sort);

  //console.log(filterMenu);
  return (
    <>
      {isLoading && <Loader />}
      <Meta title="Shopito" />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="store">
          <div
            className={
              filterMenu
                ? "store-left-part"
                : "close-filter-menu store-left-part"
            }
            // onClick={(e) => {
            //   console.log(e.target);
            // }}
          >
            <div className="filter-card close-menu">
              <IoMdClose onClick={() => setFilterMenu(!filterMenu)} />
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <select
                  className="select"
                  onClick={(e) => {
                    setSelectedTags({
                      searchCategory: "category",
                      value: e.target.value,
                    });
                  }}
                >
                  <option>Choose</option>
                  {pCategories?.map((category, indx) => {
                    return (
                      <option
                        key={indx}
                        style={{ cursor: "pointer" }}
                        className="badge bg-light rounded-3 text-secondary py-2 px-3"
                        value={category}
                      >
                        {category}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="filter-card mb-3">
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
            {/* <div className="filter-card mb-3">
              <button
                className="button"
                style={{ width: "100%" }}
                onClick={() => {
                  setRelatedProducts([]);
                  setFilterMenu(!filterMenu);
                }}
              >
                Reset Tags
              </button>
            </div> */}
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
                    <option value="Features" style={{ cursor: "pointer" }}>
                      Features
                    </option>
                    <option value="title" style={{ cursor: "pointer" }}>
                      Alphabetically, A-Z
                    </option>
                    <option value="-title" style={{ cursor: "pointer" }}>
                      Alphabetically, Z-A
                    </option>
                    <option value="price" style={{ cursor: "pointer" }}>
                      Price, low to high
                    </option>
                    <option value="-price" style={{ cursor: "pointer" }}>
                      Price, high to low
                    </option>
                    <option value="createdAt" style={{ cursor: "pointer" }}>
                      Date, old to new
                    </option>
                    <option value="-createdAt" style={{ cursor: "pointer" }}>
                      Date, new to old
                    </option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10 grid store-top-right-part">
                  <p className="totalProducts mb-0">
                    {relatedProducts.length !== 0
                      ? relatedProducts?.length
                      : products?.length}{" "}
                    Products
                  </p>
                </div>
              </div>
            </div>
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
                  ? relatedProducts?.map((product) => {
                      return (
                        <ProductCard
                          grid={grid}
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
                    })
                  : products?.map((product) => {
                      return (
                        <ProductCard
                          baseURL="product"
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
