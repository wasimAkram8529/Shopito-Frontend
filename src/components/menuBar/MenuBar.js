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
import { useTranslation } from "react-i18next";

const MenuBar = ({ handleLogout, userCart }) => {
  const { t } = useTranslation();
  return (
    <div className="menu-options">
      <div>
        <HomeOutlined />
        <NavLink to="/">{t("home")}</NavLink>
      </div>
      <div>
        <AppstoreOutlined />
        <NavLink to="/products">{t("our_store")}</NavLink>
      </div>
      <div>
        <FaBloggerB />
        <NavLink to="/blog">{t("blogs")}</NavLink>
      </div>
      <div>
        <ContactsOutlined />
        <NavLink to="/contact">{t("contact_us")}</NavLink>
      </div>
      <div>
        <ShowOnLogin>
          <OrderedListOutlined />
          <NavLink to={`/my-orders/${userCart?.[0]?.userId}`}>
            {t("my_order")}
          </NavLink>
        </ShowOnLogin>
      </div>
      <div>
        <ShowOnLogout>
          <CiLogin />
          <NavLink to="/login">{t("login")}</NavLink>
        </ShowOnLogout>
      </div>
      <div>
        <ShowOnLogin>
          <CgProfile />
          <NavLink to={`/user-profile/${userCart?.[0]?.userId}`}>
            {t("my_profile")}
          </NavLink>
        </ShowOnLogin>
      </div>
      <div>
        <ShowOnLogin>
          <CiLogout />
          <button onClick={handleLogout}>{t("log_out")}</button>
        </ShowOnLogin>
      </div>
    </div>
  );
};
export default MenuBar;
