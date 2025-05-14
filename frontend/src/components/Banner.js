import React from "react";

function Banner(props) {
  return (
    <div
      className={`d-flex flex-column align-items-center mb-5 p-4 text-center ${props.type}`}
    >
      <h3 className="text-white ">{props.mainText}</h3>
      <span className="fs-6 fw-light text-white">{props.subText}</span>
    </div>
  );
}

export default Banner;
