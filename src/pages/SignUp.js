import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, register } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader/Loader";
import registerImg from "../images/register.png";

let signUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Email is required").required(),
  mobile: Yup.string().required("Mobile number is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm password is required"),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      if (values.password !== values.confirmPassword) {
        alert("password and confirm password do not match");
        return;
      }
      delete values.confirmPassword;
      dispatch(register(values));
      formik.resetForm();
    },
  });

  const { user, isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess && user.length !== 0) {
      RESET_AUTH();
      navigate("/");
    } else if (isError) {
      // console.log(message);
    }
    return () => {
      RESET_AUTH();
    };
  }, [user, isSuccess, isError, message]);

  return (
    <>
      {isLoading && <Loader />}
      <Meta title="Shopito" />
      <BreadCrumb title=" Sign Up" />
      <Container class1="login-wrapper">
        <div className="auth-container">
          <div className="auth-register-img">
            <img src={registerImg} alt="Register image" />
          </div>
          <div className="auth-card">
            <h3 className="text-center mb-3">Create Account</h3>
            {/* <div className="error text-center">{message}</div> */}
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex flex-column gap-15"
            >
              <CustomInput
                type="text"
                placeholder="First name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange("firstName")}
                onBlur={formik.handleBlur("firstName")}
              />
              <div className="error">
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div>{formik.errors.firstName}</div>
                ) : null}
              </div>
              <CustomInput
                type="text"
                placeholder="Last name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange("lastName")}
                onBlur={formik.handleBlur("lastName")}
              />
              <div className="error">
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div>{formik.errors.lastName}</div>
                ) : null}
              </div>
              <CustomInput
                type="email"
                className="mt-1"
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
              <CustomInput
                type="tel"
                className="mt-1"
                placeholder="Mobile number"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange("mobile")}
                onBlur={formik.handleBlur("mobile")}
              />
              <div className="error">
                {formik.touched.mobile && formik.errors.mobile ? (
                  <div>{formik.errors.mobile}</div>
                ) : null}
              </div>
              <CustomInput
                type="password"
                className="mt-1"
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
                type="password"
                className="mt-1"
                placeholder="Confirm password"
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
                  <button className="auth-button border-0" type="submit">
                    Create Account
                  </button>
                </div>
                <div className="signup-box">
                  <span>
                    Already have an account? <Link to="/login">Login</Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
