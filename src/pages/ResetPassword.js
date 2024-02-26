import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPassword } from "../features/user/userSlice";
import { toast } from "react-toastify";

let resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm Password is required"),
});
const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = location.pathname.split("/")[2];

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      //console.log(values);
      if (values.password !== values.confirmPassword) {
        toast.error("Password And Confirm Password Should me Matched");
        return;
      }
      delete values.confirmPassword;
      const confidentialData = { token, userData: values };
      dispatch(resetPassword(confidentialData))
        .then((data) => {
          if (data.payload.message === "Password Updated") {
            toast.success("Password Updated");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      formik.resetForm();
    },
  });
  return (
    <>
      <Meta title="ShopIto" />
      <BreadCrumb title=" Reset Password" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
                <CustomInput
                  type="text"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange("confirmPassword")}
                  onBlur={formik.handleBlur("confirmPassword")}
                />
                <div className="error">
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div>{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Ok
                    </button>
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

export default ResetPassword;
