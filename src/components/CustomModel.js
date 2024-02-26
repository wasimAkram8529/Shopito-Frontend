import React from "react";
import { Modal } from "antd";

const CustomModel = ({ open, hideModal, performAction, title }) => {
  return (
    <Modal
      title="Confirm Deletion"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModel;
