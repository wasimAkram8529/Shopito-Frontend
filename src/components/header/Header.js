import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import Container from "./../Container";
import {
  CiLogin,
  CiHeart,
  CiMenuBurger,
  CiLogout,
  CiUser,
} from "react-icons/ci";
import MenuBar from "./../MenuBar";
import ShowOnLogin, { ShowOnLogout } from "./../hiddenLink/hiddenLink";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoListOrdered } from "react-icons/go";
import {
  getUserCart,
  getUserWishList,
  logout,
} from "../../features/user/userSlice";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getProducts } from "../../features/products/productSlice";

export const logo = (
  <div className="logo">
    <Link to="/">
      <h2>
        Shop<span>Ito</span>
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `active` : "");
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setScrollPage] = useState(false);
  const [openSearchBar, setSearchBar] = useState(false);
  const [paginate, setPaginate] = useState(true);
  const [searchOptions, setSearchOptions] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const { products } = useSelector((state) => state.product);
  //console.log(products);

  useEffect(() => {
    let options = [];
    for (let i = 0; i < products?.length; i++) {
      const product = products?.[i];
      options.push({
        id: i,
        productId: product?._id,
        name: product?.title,
      });
    }
    //console.log(options);
    setSearchOptions(options);
  }, [products]);

  //console.log(searchOptions);

  const fixNavbar = () => {
    if (window.scrollY > -0.1) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };

  window.addEventListener("scroll", fixNavbar);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  //console.log(openSearchBar);

  const handleClick = (e) => {
    hideMenu();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(getUserWishList());
    dispatch(getUserCart());
  }, []);

  const { wishList, userCart } = useSelector((state) => state.auth);
  //console.log(userCart);
  const cart = (
    <div className="cart-container">
      <div>
        <NavLink to={"/cart"} className="cart">
          <FaShoppingCart className="icons" />
          <span>{userCart?.length}</span>
        </NavLink>
      </div>
      <div className="tooltip-cart">Cart</div>
    </div>
  );
  return (
    <>
      <div
        className={
          openSearchBar
            ? `open-search-bar pop-up-search-bar`
            : `close-search-bar pop-up-search-bar`
        }
      >
        <div className="cross-sign">
          <IoMdClose
            className="close-search-bar-icon"
            onClick={() => setSearchBar(!openSearchBar)}
          />
        </div>
        <div className="input-group search-bar">
          <Typeahead
            id="pagination-example"
            onPaginate={() => console.log("Results paginated")}
            options={searchOptions}
            paginate={paginate}
            labelKey={"name"}
            placeholder="Search..."
            onChange={(selected) => {
              setSearchBar(false);
              navigate(`/product/${selected[0].productId}`);
            }}
          />
          <span className="input-group-text" id="basic-addon2">
            <BsSearch className="fs-6" />
          </span>
        </div>
      </div>
      <Container class1="top-header">
        <header className="header-top-strip py-3">
          <div className="container-xxl">
            <div className="row">
              <div className="col-6 shipping-text">
                <p className="mb-0">Free Shipping Over $100 & Free Returns</p>
              </div>
              <div className="col-6 contact-number">
                <p className="text-end mb-0">
                  Hotline:{" "}
                  <a className="" href="tel:+91 8529922324">
                    +91 8529922324
                  </a>
                </p>
              </div>
            </div>
          </div>
        </header>
      </Container>
      <Container class1="middle-header">
        <header>
          <div className="header">
            {logo}
            <div className="input-group search-bar header-middle-section">
              <Typeahead
                id="pagination-example"
                onPaginate={() => console.log("Results paginated")}
                options={searchOptions}
                paginate={paginate}
                labelKey={"name"}
                placeholder="search..."
              />
              <span className="input-group-text" id="basic-addon2">
                <BsSearch className="fs-6" />
              </span>
            </div>
            <div className="header-last-section">
              <span className="links">
                <div
                  className="search-bar-icon"
                  onClick={() => setSearchBar(true)}
                >
                  <div className="header-right-options">
                    <BsSearch color="#1455AC" className="icons" />
                  </div>
                  <div className="tooltip-search">Search</div>
                </div>
                <ShowOnLogin>
                  <div className="logout-container">
                    <div>
                      <button
                        onClick={handleLogout}
                        className={`border-0 wishlist ${activeLink}`}
                      >
                        <CiLogout className="icons" />
                      </button>
                    </div>
                    <div className="tooltip-logout">Log Out</div>
                  </div>
                </ShowOnLogin>
                <ShowOnLogin>
                  <div className="wishlist-container">
                    <div>
                      <NavLink
                        to={"user-profile"}
                        className={`wishlist ${activeLink}`}
                      >
                        <CiUser className="icons" />
                      </NavLink>
                    </div>
                    <div className="tooltip-wishlist">My Profile</div>
                  </div>
                </ShowOnLogin>
                <ShowOnLogin>
                  <div className="wishlist-container">
                    <div>
                      <NavLink
                        to={"wishlist"}
                        className={`wishlist ${activeLink}`}
                      >
                        <CiHeart className="icons" />
                        <span>{wishList?.length}</span>
                      </NavLink>
                    </div>
                    <div className="tooltip-wishlist">Wishlist</div>
                  </div>
                </ShowOnLogin>
                <ShowOnLogout>
                  <div className="login-container">
                    <div>
                      <NavLink to={"login"} className={activeLink}>
                        <CiLogin className="icons" />
                      </NavLink>
                    </div>
                    <div className="tooltip-login">Login</div>
                  </div>
                </ShowOnLogout>
                <ShowOnLogout>
                  <div className="register-container">
                    <div>
                      <NavLink to={"signup"} className={activeLink}>
                        <FaUser className="icons" />
                      </NavLink>
                    </div>
                    <div className="tooltip-register">Register</div>
                  </div>
                </ShowOnLogout>
                <ShowOnLogout>
                  <div className="register-container">
                    <div>
                      <NavLink to={"signup"} className={activeLink}>
                        <FaUser className="icons" />
                      </NavLink>
                    </div>
                    <div className="tooltip-register">Register</div>
                  </div>
                </ShowOnLogout>
                {cart}
                <div className="menu-bar" onClick={toggleMenu}>
                  <CiMenuBurger className="icons" />
                </div>
                {/* <NavLink to={"compare-product"} className={activeLink}>
                    Compare Products
                  </NavLink>
                  <NavLink to={"order-history"} className={activeLink}>
                    My Order
                  </NavLink> */}
              </span>
            </div>
          </div>
        </header>
      </Container>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="col-12">
            <div className="menu-bottom d-flex align-items-center gap-30">
              {/* <div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-15 align-items-center"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src="/images/menu.svg" alt="" />
                    <span className="me-5 d-inline-block">Shop Categories</span>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link className="dropdown-item text-white" to="#">
                        Action
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="#">
                        Another action
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="#">
                        Something else here
                      </Link>
                    </li>
                  </ul>
                </div>
              </div> */}
              <div className="menu-links">
                <div className="d-flex align-items-center gap-15">
                  <NavLink className="text-white" to="/">
                    Home
                  </NavLink>
                  <NavLink className="text-white" to="/products">
                    Our Store
                  </NavLink>
                  <NavLink className="text-white" to="/blog">
                    Blogs
                  </NavLink>
                  <NavLink className="text-white" to="/contact">
                    Contact
                  </NavLink>
                  <ShowOnLogin>
                    <NavLink className="text-white" to="/my-orders">
                      My Order
                    </NavLink>
                  </ShowOnLogin>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={showMenu ? "show-menu" : "hide-menu"}>
        <div className="close-menu-icon" onClick={hideMenu}>
          <FaTimes />
        </div>
        <MenuBar click={handleClick} />
      </div>
    </>
  );
};

export default Header;

/*  <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h1>
                <Link className="text-white">Shopito</Link>
              </h1>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here"
                  aria-label="Search Product Here"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-item-center gap-10 text-white"
                  >
                    <img src="../images/compare.svg" alt="compare" />
                    <p className="mb-0">
                      Compare <br />
                      Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-item-center gap-10 text-white"
                  >
                    <img src="../images/wishlist.svg" alt="Wishlist" />
                    <p className="mb-0">
                      Favourite <br />
                      Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/login"
                    className="d-flex align-item-center gap-10 text-white"
                  >
                    <img src="../images/user.svg" alt="User" />
                    <p className="mb-0">
                      Log in <br />
                      My Account
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-item-center gap-10 text-white"
                  >
                    <img src="../images/cart.svg" alt="Cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">0</span>
                      <p className="mb-0">$ 500</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header> */

/* <div className="input-group search-bar">
              <input
                type="text"
                className="form-control py-2"
                placeholder="Search Product Here"
                aria-label="Search Product Here"
                aria-describedby="basic-addon2"
              />
              <span className="input-group-text p-3" id="basic-addon2">
                <BsSearch className="fs-6" />
              </span>
            </div> */

/* <nav className={showMenu ? `show-nav` : `hide-nav`}>
              <div
                className={
                  showMenu ? `nav-wrapper show-nav-wrapper` : `nav-wrapper`
                }
                onClick={hideMenu}
              ></div>
              <ul>
                <li className="logo-mobile">
                  {logo}
                  <FaTimes size={22} color="#fff" onClick={hideMenu} />
                </li>
              </ul>
              <div className="header-right">
                <span className="links">
                  <NavLink to={"login"} className={activeLink}>
                    <FaUserCircle size={16} color="#ff7722" />
                  </NavLink>
                  <NavLink to={"login"} className={activeLink}>
                    <span>
                      <CiLogin />
                    </span>
                  </NavLink>
                  <NavLink to={"signup"} className={activeLink}>
                    <FaUser />
                  </NavLink>
                  {/* <NavLink to={"compare-product"} className={activeLink}>
                    Compare Products
                  </NavLink>
                  <NavLink to={"wishlist"} className={activeLink}>
                    Favourite Wishlist
                  </NavLink>
                  <NavLink to={"order-history"} className={activeLink}>
                    My Order
                  </NavLink> */

/* <Link to={"/"}>Logout</Link> */

/* </span>
                {cart}
              </div>
            </nav>
            <div className="menu-icon">
              {cart}
              <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
            </div> */
