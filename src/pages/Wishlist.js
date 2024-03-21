import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserWishList,
  removeFromWishList,
} from "../features/user/userSlice";
import { FaTimes } from "react-icons/fa";

const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWishList());
  }, []);

  const { wishList } = useSelector((state) => state.auth);
  // console.log(wishList);

  const removeItemHandler = (id) => {
    dispatch(removeFromWishList(id));
  };
  return (
    <>
      <Meta title="ShopIto" />
      <BreadCrumb title=" Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishList?.length !== 0 ? (
            wishList?.map((item) => {
              return (
                <div className="col-3" key={item?._id}>
                  <div className="wishlist-card position-relative product-card">
                    <FaTimes
                      className="position-absolute img-fluid cross text-danger"
                      onClick={() => removeItemHandler(item?._id)}
                    />
                    <div className="wishlist-card-image product-image-box">
                      <img
                        src={item?.image?.[0]?.url}
                        className="image-size"
                        alt={item?.title}
                      />
                    </div>
                    <div className="px-3 py-3">
                      <h5 className="title">{item.title}</h5>
                      <h6 className="price">{`₹${item.price}`}</h6>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center fs-5">Your WishList is Empty</div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
