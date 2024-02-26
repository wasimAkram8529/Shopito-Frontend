import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";

const RefundPolicy = () => {
  return (
    <>
      <Meta title="Shopito" />
      <BreadCrumb title=" Refund Policy" />
      <Container class1="policy-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="policy"></div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default RefundPolicy;
