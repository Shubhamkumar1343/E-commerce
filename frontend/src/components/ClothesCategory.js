import React from "react";
import { Link } from "react-router-dom";

function ClothesCategory(props) {
  return props.gender === "women" ? (
    <div className="col mt-2 mb-4 d-md-none">
      <ul className="d-flex fw-bold py-3 border-start border-4 border-danger overflow-scroll">
        <li>
          <Link className="p-3" to="/classification/women">
            All
          </Link>
        </li>
        <li>
          <Link className="mx-4" to="/classification/women/dresses">
            Dresses
          </Link>
        </li>
        <li>
          <Link className="mx-4" to="/classification/women/tops">
            Tops
          </Link>
        </li>
        <li>
          <Link className="mx-4" to="/classification/women/shirts">
            Shirts
          </Link>
        </li>
        <li>
          <Link className="mx-4" to="/classification/women/pants">
            Pants
          </Link>
        </li>
        <li>
          <Link className="mx-4" to="/classification/women/jeans">
            Jeans
          </Link>
        </li>
        <li>
          <Link className="mx-4" to="/classification/women/shoes">
            Shoes
          </Link>
        </li>
      </ul>
    </div>
  ) : (
    <div className="col mt-2 mb-4 d-md-none">
      <ul className="d-flex fw-bold py-3 border-start border-4 border-danger overflow-scroll">
        <li>
          <Link className="p-3" to="/classification/women">
            All
          </Link>
        </li>
        <li>
          <Link className="mx-4" to="/classification/women/dresses">
            Dresses
          </Link>
        </li>
        <li>
          <Link className="mx-4" to="/classification/women/tops">
            Tops
          </Link>
        </li>
        <li>
          <Link className="mx-4" to="/classification/women/shirts">
            Shirts
          </Link>
        </li>
        <li>
          <Link className="mx-4" to="/classification/women/pants">
            Pants
          </Link>
        </li>
        <li>
          <Link className="mx-4" to="/classification/women/jeans">
            Jeans
          </Link>
        </li>
        <li>
          <Link className="mx-4" to="/classification/women/shoes">
            Shoes
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ClothesCategory;
