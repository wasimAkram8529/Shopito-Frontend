import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RESET_AUTH, login } from "../features/user/userSlice";
import Loader from "../components/loader/Loader";
import loginImg from "../images/login.png";
//import Loader from ".././components/loader/Loader";

let loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = ({ setRenderHeader }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      delete values.confirmPassword;
      dispatch(login(values));
      formik.resetForm();
    },
  });
  const { user, isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.auth
  );
  //console.log(user);

  useEffect(() => {
    if (isSuccess && user?.length !== 0) {
      setRenderHeader(true);
      navigate(-1);
    } else if (isError) {
      //console.log(message);
    }
    return () => {
      RESET_AUTH();
    };
  }, [user, isSuccess, isError, message]);

  return (
    <>
      {isLoading && <Loader />}
      <Meta title="Shopito" />
      <BreadCrumb title=" Login" />
      <Container class1="login-wrapper">
        {/* <div className="row">
          
        </div> */}
        <div className="auth-container">
          <div className="auth-login-img">
            <img src={loginImg} alt="Login image" />
          </div>
          <div className="auth-card">
            <h3 className="text-center mb-3 auth-text">Login</h3>
            {/* <div className="error text-center">{message}</div> */}
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex flex-column gap-15"
            >
              <CustomInput
                type="email"
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
              <div>
                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                  <button className="auth-button border-0" type="submit">
                    Login
                  </button>
                  {/* <Link to="/signup" className="button signup">
                    Sign Up
                  </Link> */}
                </div>
                <div className="signup-box">
                  <span>
                    Don't have an account yet?{" "}
                    <Link to="/signup">Create Account</Link>
                  </span>
                </div>
                <div className="signup-box">
                  <Link to="/forgot-password">Forgot your password?</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
