import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import ReactStars from "react-rating-stars-component";

const reviewSchema = Yup.object().shape({
  review: Yup.string().required("Product Review is Required"),
});
const CreateOrUpdateReview = ({
  handleWriteReview,
  handleUpdateReview,
  edit,
  user,
  productId,
  setEdit,
}) => {
  const [star, setRating] = useState(0);
  const formik = useFormik({
    initialValues: {
      review: "",
    },
    validationSchema: reviewSchema,
    onSubmit: (values) => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;

      values.reviewDate = formattedDate;
      values.star = star;
      values.userId = user ? user?.[0]?._id : "";

      //console.log(newReview);
      if (!edit) {
        const newReview = {
          id: productId,
          review: values,
        };
        handleWriteReview(newReview);
      } else {
        const newReview = {
          id: productId,
          review: values,
        };
        //console.log(newReview);
        handleUpdateReview(newReview);
        setEdit(false);
      }
      formik.resetForm();
    },
  });

  const handleRatingChange = (newStar) => {
    setRating(newStar);
  };
  return (
    <div className="review-form py-4">
      <h4>{edit ? "Update Your Review" : "Write a Review"}</h4>
      <form
        action=""
        onSubmit={formik.handleSubmit}
        className="d-flex flex-column gap-15"
      >
        <div>
          <ReactStars
            count={5}
            size={24}
            value={star}
            edit={true}
            onChange={handleRatingChange}
            activeColor="#ffd700"
          />
        </div>
        <div>
          <textarea
            name="review"
            id="review"
            className="w-100 form-control"
            cols="30"
            rows="4"
            value={formik.values.review}
            onChange={formik.handleChange("review")}
            onBlur={formik.handleBlur("review")}
            placeholder="Comments..."
          ></textarea>
          {formik.touched.review && formik.errors.review ? (
            <div style={{ color: "red" }}>{formik.errors.review}</div>
          ) : null}
        </div>
        <div className="d-flex justify-content-end">
          <button className="button border-0 submit-review" type="submit">
            {edit ? "Update Review" : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrUpdateReview;
