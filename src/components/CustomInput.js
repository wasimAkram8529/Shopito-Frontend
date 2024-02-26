import React from "react";

const CustomInput = (props) => {
  const {
    type,
    name,
    placeholder,
    className,
    value,
    onChange,
    onBlur,
    editable,
  } = props;
  return (
    <div className={className ? className : ""}>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        name={name}
        value={value ? value : ""}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default CustomInput;
