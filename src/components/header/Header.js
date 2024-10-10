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
import { MdOutlineStorefront } from "react-icons/md";
import MenuBar from "./../menuBar/MenuBar";
import ShowOnLogin, { ShowOnLogout } from "./../hiddenLink/hiddenLink";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoListOrdered } from "react-icons/go";
import {
  getUserCart,
  getUserWishList,
  logout,
} from "../../features/user/userSlice";
import { Loader, Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getProducts } from "../../features/products/productSlice";
import { shortenText } from "../../utils/Validator";
import { useTranslation } from "react-i18next";

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
const Header = ({ renderHeader, setRenderHeader }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setScrollPage] = useState(false);
  const [openSearchBar, setSearchBar] = useState(false);
  const [paginate, setPaginate] = useState(true);
  const [searchOptions, setSearchOptions] = useState([]);
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const { isLoggedIn } = useSelector((state) => state.auth);
  //console.log(isLoggedIn);

  useEffect(() => {
    //console.log("1");
    dispatch(getProducts());
    if (isLoggedIn) {
      dispatch(getUserWishList());
      dispatch(getUserCart());
    }
  }, [renderHeader, isLoggedIn]);

  const { products } = useSelector((state) => state.product);
  //console.log(products);

  useEffect(() => {
    let options = [];
    for (let i = 0; i < products?.length; i++) {
      const product = products?.[i];
      options.push({
        id: i,
        productId: product?._id,
        name: shortenText(product?.title, 15),
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
    dispatch(logout())
      .then((data) => {
        setRenderHeader(!renderHeader);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { wishList, userCart, userOrders, isLoading } = useSelector(
    (state) => state.auth
  );
  // console.log(order, userOrders);
  const cart = (
    <div className="cart-container">
      <div>
        <NavLink to={`/cart/${userOrders?.[0]?.user?._id}`} className="cart">
          <FaShoppingCart className="icons" />
          <span>{userCart?.length}</span>
        </NavLink>
      </div>
      <div className="tooltip-cart">{t("cart")}</div>
    </div>
  );
  return (
    <>
      <div className="header-container">
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
                // console.log("id", selected[0].productId);
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
            <div className="header-top-section">
              <div className="shipping-text">
                <p className="mb-0">
                  {t("free_shipping_over_₹100_&_free_returns")}
                </p>
              </div>
              <div className="language-selector">
                <select
                  onChange={handleLanguageChange}
                  defaultValue={i18n.language}
                  className="language-change"
                >
                  <option value="en">English</option>
                  <option value="fr">Hindi</option>
                  <option value="tg">Telugu</option>
                  <option value="tm">Tamil</option>
                  <option value="my">Malayalam</option>
                  <option value="bn">Bengali</option>
                  <option value="ud">Urdu</option>
                  <option value="kd">Kannada</option>
                  <option value="gt">Gujarati</option>
                  <option value="marathi">Marathi</option>
                </select>
                {/* <p className="text-end mb-0">
                    Hotline:{" "}
                    <a className="" href="tel:+91 8529922324">
                      +91 XXXXXXXX24
                    </a>
                  </p> */}
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
                  onChange={(selected) => {
                    setSearchBar(false);
                    navigate(`/product/${selected[0].productId}`);
                  }}
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
                    <div className="tooltip-search">{t("search")}</div>
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
                      <div className="tooltip-logout">{t("log_out")}</div>
                    </div>
                  </ShowOnLogin>
                  <ShowOnLogin>
                    <div className="wishlist-container">
                      <div>
                        <NavLink
                          to={`/user-profile/${userOrders?.[0]?.user?._id}`}
                          className={`wishlist ${activeLink}`}
                        >
                          <CiUser className="icons" />
                        </NavLink>
                      </div>
                      <div className="tooltip-wishlist">{t("my_profile")}</div>
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
                          <span>{wishList?.length || 0}</span>
                        </NavLink>
                      </div>
                      <div className="tooltip-wishlist">{t("wishlist")}</div>
                    </div>
                  </ShowOnLogin>
                  <ShowOnLogout>
                    <div className="login-container">
                      <div>
                        <NavLink to={"login"} className={activeLink}>
                          <CiLogin className="icons" />
                        </NavLink>
                      </div>
                      <div className="tooltip-login">{t("login")}</div>
                    </div>
                  </ShowOnLogout>
                  <ShowOnLogout>
                    <div className="register-container">
                      <div>
                        <NavLink to={"signup"} className={activeLink}>
                          <FaUser className="icons" />
                        </NavLink>
                      </div>
                      <div className="tooltip-register">{t("register")}</div>
                    </div>
                  </ShowOnLogout>
                  <ShowOnLogin>{cart}</ShowOnLogin>
                  <div className="menu-bar" onClick={toggleMenu}>
                    <CiMenuBurger className="icons" />
                  </div>
                </span>
              </div>
            </div>
          </header>
        </Container>
        <header className="header-bottom py-3">
          <div className="container-xxl">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink className="text-white" to="/">
                      {t("home")}
                    </NavLink>
                    <NavLink className="text-white" to="/products">
                      {t("our_store")}
                    </NavLink>
                    <NavLink className="text-white" to="/blog">
                      {t("blogs")}
                    </NavLink>
                    <NavLink className="text-white" to="/contact">
                      {t("contact")}
                    </NavLink>
                    <ShowOnLogin>
                      <NavLink
                        className="text-white"
                        to={`/my-orders/${userOrders?.[0]?.user?._id}`}
                      >
                        {t("my_order")}
                      </NavLink>
                    </ShowOnLogin>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div
          className={showMenu ? "show-menu" : "hide-menu"}
          onClick={() => setShowMenu(false)}
        >
          <div className="close-menu-icon" onClick={hideMenu}>
            <FaTimes />
          </div>
          <MenuBar
            click={handleClick}
            handleLogout={handleLogout}
            userOrders={userOrders}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
