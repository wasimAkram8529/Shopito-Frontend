import "./Footer.css";
import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";
import { useTranslation } from "react-i18next";
// import newLetterImg from '../../'

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <footer className="py-4 footer">
        <div className="container-xxl">
          <div className="row align-items-center footer-top">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="../../images/newsletter.png" alt="newsletter" />
                <h2 className="mb-0 text-white">
                  {t("sign_up_for_newsletter")}
                </h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  {t("subscribe")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">{t("contact_us")}</h4>
              <div>
                <address className="text-white fs-6">
                  Hno: 16 , At Rajpur, <br /> Supaul, Bihar <br />
                  PinCode: 852138
                </address>
                <a
                  href="tel:+91 8529922324"
                  className="mt-3 d-block mb-1 text-white"
                >
                  +91 8529922324
                </a>
                <a
                  href="mailto: codelikearockstar@gmail.com"
                  className="mt-2 d-block mb-0 text-white"
                >
                  {t("email_to_admin")}
                </a>
                <div className="social-icons d-flex align-items-center gap-15">
                  <a
                    className="text-white"
                    href="https://www.linkedin.com/in/wasim-akram-a27594207/"
                  >
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a
                    className="text-white"
                    href="https://github.com/wasimAkram8529"
                  >
                    <BsGithub className="fs-4" />
                  </a>
                  <a
                    className="text-white"
                    href="https://www.instagram.com/m_r_i_mperfect/m"
                  >
                    <BsInstagram className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-4">
              <h4 className="text-white mb-4">{t("information")}</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">
                  {t("privacy_policy")}
                </Link>
                <Link className="text-white py-2 mb-1">
                  {t("refund_policy")}
                </Link>
                <Link className="text-white py-2 mb-1">
                  {t("shipping_policy")}
                </Link>
                <Link className="text-white py-2 mb-1">
                  {t("terms_of_service")}
                </Link>
              </div>
            </div>
            <div className="col-4">
              <h4 className="text-white mb-4">{t("account")}</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">{t("search")}</Link>
                <Link className="text-white py-2 mb-1">{t("about_us")}</Link>
                <Link className="text-white py-2 mb-1">{t("faq")}</Link>
                <Link className="text-white py-2 mb-1">{t("contact")}</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy;{new Date().getFullYear()} All rights are reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
