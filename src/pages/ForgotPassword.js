import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { NavLink } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../features/user/userSlice";
import { useTranslation } from "react-i18next";

let forgotSchema = Yup.object().shape({
  email: Yup.string().email().required("Please Enter A Unique Email"),
});
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotSchema,
    onSubmit: (values) => {
      //console.log(values);
      dispatch(forgotPassword(values));
      formik.resetForm();
    },
  });

  return (
    <>
      <Meta title="ShopIto" />
      <BreadCrumb title=" Forgot Password" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      {t("submit")}
                    </button>
                    <NavLink to="/login">Cancel</NavLink>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
