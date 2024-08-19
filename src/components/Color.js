import React from "react";

const Color = ({ colorData, setColorHandler }) => {
  return (
    <>
      <ul className="colors ps-0">
        {colorData
          ? colorData?.map((item) => {
              return (
                <li
                  style={{ backgroundColor: `${item?.title}` }}
                  onClick={() => setColorHandler(item?._id, item?.title)}
                  key={item?._id}
                ></li>
              );
            })
          : ""}
      </ul>
    </>
  );
};

export default Color;
