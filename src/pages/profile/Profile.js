import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  RESET_AUTH,
  getAUser,
  updateUser,
  updateUserPhoto,
} from "../../features/user/userSlice";
import "./Profile.css";
import { uploadProductImg } from "../../features/upload/uploadSlice";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";

let loginSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  mobile: Yup.string().required("Mobile Number is required"),
  address: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  pinCode: Yup.string().required("Pin Code is required"),
});

const Profile = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      mobile: "",
      state: "",
      city: "",
      pinCode: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const userAddress = {
        address: values.address,
        city: values.city,
        state: values.state,
        pinCode: values.pinCode,
      };
      values.address = userAddress;
      dispatch(updateUser(values))
        .then((data) => {
          const userData = data.payload;
          //console.log(userData);
          formik.setValues({
            firstName: userData?.[0]?.firstName,
            lastName: userData?.[0]?.lastName,
            mobile: userData?.[0]?.mobile,
            address: userData?.[0]?.address?.address,
            city: userData?.[0]?.address?.city,
            state: userData?.[0]?.address?.state,
            pinCode: userData?.[0]?.address?.pinCode,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  useEffect(() => {
    dispatch(getAUser())
      .then((data) => {
        const userData = data.payload;
        formik.setValues({
          firstName: userData?.[0]?.firstName,
          lastName: userData?.[0]?.lastName,
          mobile: userData?.[0]?.mobile,
          address: userData?.[0]?.address?.address,
          city: userData?.[0]?.address?.city,
          state: userData?.[0]?.address?.state,
          pinCode: userData?.[0]?.address?.pinCode,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });

    return () => {
      RESET_AUTH();
    };
  }, []);
  const { user } = useSelector((state) => state.auth);

  const savePhoto = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(uploadProductImg(profileImage));
      if (response) {
        dispatch(updateUserPhoto({ photo: response.payload[0].url }))
          .then((data) => {
            const userData = data.payload;
            formik.setValues({
              firstName: userData?.[0]?.firstName,
              lastName: userData?.[0]?.lastName,
              mobile: userData?.[0]?.mobile,
              address: userData?.[0]?.address?.address,
              city: userData?.[0]?.address?.city,
              state: userData?.[0]?.address?.state,
              pinCode: userData?.[0]?.address?.pinCode,
            });
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const showImage = (acceptedFiles) => {
    setProfileImage(acceptedFiles);
    setImagePreview(URL.createObjectURL(acceptedFiles[0]));
  };

  //console.log(user);

  return (
    <>
      <Meta title="ShopIto" />
      <BreadCrumb title="My Profile" />
      <Container class1="py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <div className="profile-photo">
                <div>
                  <img
                    src={
                      imagePreview === null ? user?.[0]?.photo : imagePreview
                    }
                    alt="profile"
                  />
                  <h3>Role: {user?.[0]?.role}</h3>
                  {imagePreview !== null && (
                    <div className="--center-all">
                      <button
                        className="--btn --btn-secondary"
                        onClick={savePhoto}
                      >
                        <AiOutlineCloudUpload size={18} /> Upload Photo
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <div className="text-center">
                  <label className="mx-3">Change Photo:</label>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      showImage(acceptedFiles);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>
                            Drag 'n' drop some files here, or click to select
                            files
                          </p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="input-email"
                  value={user?.[0]?.email ? user?.[0]?.email : ""}
                  disabled
                />
                <CustomInput
                  type="text"
                  placeholder="First Name"
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
                  placeholder="Last Name"
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
                  type="text"
                  placeholder="Mobile"
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
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                />
                <div className="error">
                  {formik.touched.address && formik.errors.address ? (
                    <div>{formik.errors.address}</div>
                  ) : null}
                </div>
                <CustomInput
                  type="text"
                  placeholder="State"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange("state")}
                  onBlur={formik.handleBlur("state")}
                />
                <div className="error">
                  {formik.touched.state && formik.errors.state ? (
                    <div>{formik.errors.state}</div>
                  ) : null}
                </div>
                <CustomInput
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange("city")}
                  onBlur={formik.handleBlur("city")}
                />
                <div className="error">
                  {formik.touched.city && formik.errors.city ? (
                    <div>{formik.errors.city}</div>
                  ) : null}
                </div>
                <CustomInput
                  type="text"
                  placeholder="Pin Code"
                  name="pinCode"
                  value={formik.values.pinCode}
                  onChange={formik.handleChange("pinCode")}
                  onBlur={formik.handleBlur("pinCode")}
                />
                <div className="error">
                  {formik.touched.pinCode && formik.errors.pinCode ? (
                    <div>{formik.errors.pinCode}</div>
                  ) : null}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Update Profile
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

export default Profile;
