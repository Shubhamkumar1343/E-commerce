import React, { useState } from "react";

function Filter(props) {
  return (
    <div className="d-flex justify-content-between mb-4 align-items-center">
      <span className="fs-6 fw-light text-secondary">
        {props.count <= 1
          ? props.count + " item found"
          : props.count + " items found"}
      </span>
      <div className="d-flex align-items-center">
        <span className="me-3 fs-6 fw-light">Sort:</span>
        <select className="form-select fw-light" onChange={props.sortProducts}>
          <option value="oldest">Oldest</option>
          <option value="latest">Latest</option>
          <option value="highest">Highest Price</option>
          <option value="lowest">Lowest Price</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
