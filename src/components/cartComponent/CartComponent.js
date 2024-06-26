import "./CartComponent.css";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { updateCartQuantity } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { MdProductionQuantityLimits } from "react-icons/md";
import dayjs from "dayjs";

const findDate = (number = 7) => {
  const today = dayjs();
  const deliveryDate = today.add(number, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");
  return dateString;
};
const CartComponent = ({
  handleRemoveAProductFromCart,
  matchingProduct,
  setShipping,
  handleQuantityChange,
}) => {
  const [quantity, setCartQuantity] = useState(matchingProduct?.quantity);
  let initialDate = findDate(7);
  const [shippingDateString, setDateString] = useState(initialDate);
  //console.log(initialDate);
  const dispatch = useDispatch();

  return (
    <div className="cart-item-container">
      <div className="delivery-date">Delivery date: {shippingDateString}</div>

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
              Quantity:{" "}
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
              Update
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={() =>
                handleRemoveAProductFromCart(matchingProduct?.productId?._id)
              }
            >
              Delete
            </span>
          </div>
        </div>

        <div className="delivery-options">
          <div className="delivery-options-title">
            Choose a delivery option:
          </div>
          <div className="delivery-option">
            <input
              type="radio"
              className="delivery-option-input"
              name="delivery-option-1"
              value="1"
              onClick={(e) => {
                setShipping({ id: "1", deliveryDays: 7, price: 0 });
                setDateString(findDate(7));
              }}
            />
            <div>
              <div className="delivery-option-date">{findDate(7)}</div>
              <div className="delivery-option-price">FREE Shipping</div>
            </div>
          </div>
          <div className="delivery-option">
            <input
              type="radio"
              className="delivery-option-input"
              name="delivery-option-1"
              value="2"
              onClick={(e) => {
                setShipping({
                  id: "2",
                  deliveryDays: 3,
                  price: 49,
                });
                setDateString(findDate(3));
              }}
            />
            <div>
              <div className="delivery-option-date">{findDate(3)}</div>
              <div className="delivery-option-price">₹49.00 - Shipping</div>
            </div>
          </div>
          <div className="delivery-option">
            <input
              type="radio"
              className="delivery-option-input"
              name="delivery-option-1"
              value="3"
              onClick={(e) => {
                setShipping({
                  id: "3",
                  deliveryDays: 1,
                  price: 99,
                });
                setDateString(findDate(1));
              }}
            />
            <div>
              <div className="delivery-option-date">{findDate(1)}</div>
              <div className="delivery-option-price">₹99.00 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
