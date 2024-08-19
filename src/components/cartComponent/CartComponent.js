import "./CartComponent.css";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { updateCartQuantity } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useTranslation } from "react-i18next";

const CartComponent = ({
  handleRemoveAProductFromCart,
  matchingProduct,
  setShipping,
  handleQuantityChange,
  shippingDateString,
}) => {
  const [quantity, setCartQuantity] = useState(matchingProduct?.quantity);
  const { t } = useTranslation();
  //console.log(initialDate);
  const dispatch = useDispatch();

  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        {t("delivery_date")}: {shippingDateString}
      </div>

      <div className="cart-item-details-grid">
        <img
          className="product-image"
          src={matchingProduct?.productId?.image?.[0]?.url}
        />

        <div className="cart-item-details">
          <div className="product-name">
            {matchingProduct?.productId?.title}
          </div>
          <div className="product-price">{matchingProduct?.price}</div>
          <div className="product-quantity">
            <span>
              {t("quantities")}:{" "}
              <input
                min={1}
                max={matchingProduct?.productId?.quantity}
                className="quantity-label"
                type="number"
                name="quantity"
                id="quantity"
                onChange={(e) => {
                  setCartQuantity(e.target.value);
                }}
                value={quantity}
              />
              {/* <span className="quantity-label">
                {matchingProduct?.quantity}
              </span> */}
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={() =>
                handleQuantityChange(matchingProduct?.productId?._id, quantity)
              }
            >
              {t("update")}
            </span>
            <span
              className="delete-quantity-link link-secondary"
              onClick={() =>
                handleRemoveAProductFromCart(matchingProduct?.productId?._id)
              }
            >
              {t("delete")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
