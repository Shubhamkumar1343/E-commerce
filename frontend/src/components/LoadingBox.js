import React from "react";

function LoadingBox() {
  return (
    // <div className="loading">
    //   Loading... <i className="fa fa-spinner fa-spin"></i>
    // </div>
    <div className="d-flex justify-content-center align-items-center">
      <div className="spinner-border text-secondary me-3" role="status"></div>
      <span className="text-secondary fs-3"> Loading...</span>
    </div>
  );
}

export default LoadingBox;
