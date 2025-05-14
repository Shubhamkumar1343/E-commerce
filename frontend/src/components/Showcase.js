import React from "react";
import { Link } from "react-router-dom";
function Showcase(props) {
  return (
    <Link to={props.link}>
      <div className="showcase-container">
        <div className="typography">
          <h1>{props.title}</h1>
          <p>{props.subtitle}</p>
        </div>
        <div
          className="showcase"
          style={{ backgroundImage: `url(${props.background})` }}
        ></div>
      </div>
    </Link>
  );
}

export default Showcase;
