import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContactsOutlined,
  HomeOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { FaBloggerB } from "react-icons/fa";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  // getItem("Category", "sub1", <MailOutlined />, [
  //   getItem("Option 1", "1"),
  //   getItem("Option 2", "2"),
  //   getItem("Option 3", "3"),
  //   getItem("Option 4", "4"),
  // ]),
  getItem(<NavLink to="">Home</NavLink>, "home", <HomeOutlined />),
  getItem(
    <NavLink to="products">Our Store</NavLink>,
    "store",
    <AppstoreOutlined />
  ),
  getItem(<NavLink to="blog">Blogs</NavLink>, "blog", <FaBloggerB />),
  getItem(
    <NavLink to="contact">Contact</NavLink>,
    "contact",
    <ContactsOutlined />
  ),
  // getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
  //   getItem("Option 5", "5"),
  //   getItem("Option 6", "6"),
  //   getItem("Submenu", "sub3", null, [
  //     getItem("Option 7", "7"),
  //     getItem("Option 8", "8"),
  //   ]),
  // ]),
  // getItem("Navigation Three", "sub4", <SettingOutlined />, [
  //   getItem("Option 9", "9"),
  //   getItem("Option 10", "10"),
  //   getItem("Option 11", "11"),
  //   getItem("Option 12", "12"),
  // ]),
  getItem(
    <NavLink to="/my-orders">My Order</NavLink>,
    "link",
    <OrderedListOutlined />
  ),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const MenuBar = ({ className, click }) => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Menu
      className={className}
      mode="inline"
      openKeys={openKeys}
      onClick={click}
      onOpenChange={onOpenChange}
      style={{
        width: 256,
      }}
      items={items}
    />
  );
};
export default MenuBar;
