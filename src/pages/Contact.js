import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiInfoCircle, BiPhoneCall } from "react-icons/bi";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createEnquiry } from "../features/contact/contactSlice";

let enquirySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  mobile: Yup.string().required("Mobile Number is required"),
  comment: Yup.string().required("Comment is required"),
});

const Contact = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      mobile: "",
      comment: "",
    },
    validationSchema: enquirySchema,
    onSubmit: (values) => {
      dispatch(createEnquiry(values));
      // console.log(values);
      formik.resetForm();
    },
  });

  const { contact } = useSelector((state) => state.contact);
  //console.log(contact);

  return (
    <>
      <Meta title="Contact Us" />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.1087648494204!2d76.82013447519668!3d29.947549974972524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e3f422f5244e7%3A0x9c630c311d6349b8!2sNIT%20KURUKSHETRA!5e0!3m2!1sen!2sin!4v1699971414669!5m2!1sen!2sin"
              width="600"
              height="450"
              className="border-0 w-100"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mb-4">Contact</h3>
                  <form
                    action=""
                    className="d-flex flex-column gap-15"
                    onSubmit={formik.handleSubmit}
                  >
                    <CustomInput
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                    />
                    <div className="error">
                      {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div>
                      ) : null}
                    </div>
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
                    <div>
                      <textarea
                        name="comment"
                        id="comment"
                        className="w-100 form-control"
                        cols="30"
                        rows="4"
                        placeholder="Comments..."
                        onChange={formik.handleChange("comment")}
                        onBlur={formik.handleBlur("comment")}
                        value={formik.values.comment}
                      ></textarea>
                    </div>
                    <div className="error">
                      {formik.touched.comment && formik.errors.comment ? (
                        <div>{formik.errors.comment}</div>
                      ) : null}
                    </div>
                    <div>
                      <button className="button border-0">Submit</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title mb-4">Get in touch with us</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineHome className="fs-5" />
                        <address className="mb-0">
                          Hostel No: 08, NIT Kurukshetra, Haryana, India
                        </address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiPhoneCall className="fs-5" />
                        <a href="tel:+91 8529922324">+91 8529922324</a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineMail className="fs-5" />
                        <a href="mailto:codelikearockstar@gmail.com">
                          codelikearockstar@gmail.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiInfoCircle className="fs-5" />
                        <p className="mb-0">Monday - Friday 10 AM - 8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
