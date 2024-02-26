import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { updateCartQuantity } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { MdProductionQuantityLimits } from "react-icons/md";

const CartComponent = ({
  cartItem,
  handleTotalAmount,
  handleRemoveAProductFromCart,
}) => {
  const [quantity, setCartQuantity] = useState(cartItem?.quantity);
  const dispatch = useDispatch();

  const cartQuantityHandler = (newQuantity = 0) => {
    const diff = newQuantity - quantity;
    const newAmount = diff * cartItem?.productId?.price;
    //console.log(newAmount);
    handleTotalAmount(newAmount);
    setCartQuantity(newQuantity);
  };

  const handleQuantityChange = () => {
    const data = { id: cartItem?.productId?._id, quantity };
    dispatch(updateCartQuantity(data));
  };

  return (
    <div
      key={cartItem?._id}
      className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
    >
      <div className="cart-col-1 gap-15 d-flex align-items-center">
        <div className="w-25">
          <img
            src={cartItem?.productId?.image?.[0]?.url}
            className="img-fluid"
            alt="Headphone"
          />
        </div>
        <div className="w-75">
          <p>{cartItem?.productId?.title}</p>
          <p>Size: M</p>
          <p
            style={{
              backgroundColor: `${cartItem?.color?.title}`,
              width: "40px",
              height: "20px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            Color
          </p>
        </div>
      </div>
      <div className="cart-col-2">
        <h5 className="price">{`₹${cartItem?.productId?.price}`}</h5>
      </div>
      <div className="cart-col-3 d-flex align-items-center gap-15">
        <div>
          <input
            min={1}
            max={cartItem?.productId?.quantity}
            className="form-control"
            type="number"
            name="quantity"
            id="quantity"
            onChange={(e) => {
              cartQuantityHandler(e.target.value);
            }}
            value={quantity}
          />
        </div>
        <div>
          <MdProductionQuantityLimits
            style={{ cursor: "pointer" }}
            className="text-black"
            onClick={() => handleQuantityChange()}
          />
        </div>
        <div>
          <AiFillDelete
            style={{ cursor: "pointer" }}
            className="text-danger"
            onClick={() =>
              handleRemoveAProductFromCart(cartItem?.productId?._id)
            }
          />
        </div>
      </div>
      <div className="cart-col-4">
        <h5 className="price">{`₹${quantity * cartItem?.productId?.price}`}</h5>
      </div>
    </div>
  );
};

export default CartComponent;
