import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContactsOutlined,
  HomeOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { FaBloggerB } from "react-icons/fa";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { CiLogin, CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import "./MenuBar.css";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";

const MenuBar = ({ handleLogout }) => {
  return (
    <div className="menu-options">
      <div>
        <HomeOutlined />
        <NavLink to="/">Home</NavLink>
      </div>
      <div>
        <AppstoreOutlined />
        <NavLink to="/products">Our Store</NavLink>
      </div>
      <div>
        <FaBloggerB />
        <NavLink to="/blog">Blogs</NavLink>
      </div>
      <div>
        <ContactsOutlined />
        <NavLink to="/contact">Contact us</NavLink>
      </div>
      <div>
        <ShowOnLogin>
          <OrderedListOutlined />
          <NavLink to="/my-orders">My Order</NavLink>
        </ShowOnLogin>
      </div>
      <div>
        <ShowOnLogout>
          <CiLogin />
          <NavLink to="/login">Login</NavLink>
        </ShowOnLogout>
      </div>
      <div>
        <ShowOnLogin>
          <CgProfile />
          <NavLink to="/profile">Profile</NavLink>
        </ShowOnLogin>
      </div>
      <div>
        <ShowOnLogin>
          <CiLogout />
          <button onClick={handleLogout}>Logout</button>
        </ShowOnLogin>
      </div>
    </div>
  );
};
export default MenuBar;
