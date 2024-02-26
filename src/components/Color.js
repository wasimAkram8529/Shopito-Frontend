import React from "react";
// import nearestColor from "nearest-color";
// import colorNameList from "color-name-list";

// nearestColor need objects {name => hex} as input

const Color = ({ colorData, setColorHandler }) => {
  // const colors = colorNameList.reduce(
  //   (o, { name, hex }) => Object.assign(o, { [name]: hex }),
  //   {}
  // );

  // const nearest = nearestColor.from(colors);
  // console.log(nearest("#f1c1d1"));

  // console.log(colorData);
  //console.log(colorList);
  return (
    <>
      <ul className="colors ps-0">
        {colorData
          ? colorData?.map((item) => {
              return (
                <li
                  style={{ backgroundColor: `${item?.title}` }}
                  onClick={() => setColorHandler(item?._id)}
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
