import React from "react";
import { Link } from "react-router-dom";

function Sidebar(props) {
  return props.gender === "women" ? (
    <div className="col-2 mt-5 d-none d-md-block">
      <ul className="d-grid gap-4 fw-light">
        <li className="fs-5 fw-bold">
          <span className="border-bottom border-3 border-danger pb-1">
            WOMEN
          </span>
        </li>
        <li>
          <Link to="/classification/women">View All</Link>
        </li>
        <li>
          <Link to="/classification/women/dresses">Dresses</Link>
        </li>
        <li>
          <Link to="/classification/women/tops">Tops</Link>
        </li>
        <li>
          <Link to="/classification/women/shirts">Shirts</Link>
        </li>
        <li>
          <Link to="/classification/women/pants">Pants</Link>
        </li>
        <li>
          <Link to="/classification/women/jeans">Jeans</Link>
        </li>
        <li>
          <Link to="/classification/women/shoes">Shoes</Link>
        </li>
      </ul>
    </div>
  ) : (
    <div className="col-2 mt-5 d-none d-md-block">
      <ul className="d-grid gap-4 fw-light">
        <li className="fs-5 fw-bold">
          <span className="border-bottom border-3 border-danger pb-1">MEN</span>
        </li>
        <li>
          <Link to="/classification/men">View All</Link>
        </li>
        <li>
          <Link to="/classification/women/dresses">Dresses</Link>
        </li>
        <li>
          <Link to="/classification/women/tops">Tops</Link>
        </li>
        <li>
          <Link to="/classification/women/shirts">Shirts</Link>
        </li>
        <li>
          <Link to="/classification/women/pants">Pants</Link>
        </li>
        <li>
          <Link to="/classification/women/jeans">Jeans</Link>
        </li>
        <li>
          <Link to="/classification/women/shoes">Shoes</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
