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
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getProducts } from "../../features/products/productSlice";
import { shortenText } from "../../utils/Validator";

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

  const { wishList, userCart } = useSelector((state) => state.auth);
  //console.log(userCart);
  const cart = (
    <div className="cart-container">
      <div>
        <NavLink to={`/cart/${userCart?.[0]?.userId}`} className="cart">
          <FaShoppingCart className="icons" />
          <span>{userCart?.length}</span>
        </NavLink>
      </div>
      <div className="tooltip-cart">Cart</div>
    </div>
  );
  return (
    <>
      <div className="new-header-container">
        <Container class1="middle-header">
          <header>
            <div className="new-header">
              {logo}
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
                          <span>{wishList?.length || 0}</span>
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
                  {/* <ShowOnLogout>
                  <div className="register-container">
                    <div>
                      <NavLink to={"signup"} className={activeLink}>
                        <FaUser className="icons" />
                      </NavLink>
                    </div>
                    <div className="tooltip-register">Register</div>
                  </div>
                </ShowOnLogout> */}
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
                      <NavLink
                        className="text-white"
                        to={`/my-orders/${userCart?.[0]?.userId}`}
                      >
                        My Order
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
            userCart={userCart}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
