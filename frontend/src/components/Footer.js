import React from "react";
import logo from "../images/logo.png"

function Footer() {
  return (
    <React.Fragment>
      <footer className=" mt-auto pt-5 pb-4 fw-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-4 gap-4 gap-md-0 mb-5">
            <div className="col pb-5">
              <ul>
                <li className="">
                  <img
                    className="brand_logo"
                    src={logo}
                    alt=""
                  />
                </li>
              </ul>
            </div>
            <div className="col">
              <ul>
                <h6>Corporate Info</h6>
                <li className="text-secondary">Career at Urban Attire</li>
                <li className="text-secondary">About Urban Attire group</li>
                <li className="text-secondary">sustainability</li>
                <li className="text-secondary">Press</li>
                <li className="text-secondary">Investor Relations</li>
                <li className="text-secondary">Corporate Governance</li>
              </ul>
            </div>
            <div className="col">
              <ul>
                <h6>Help</h6>
                <li className="text-secondary">Customer Service</li>
                <li className="text-secondary">My Account</li>
                <li className="text-secondary">Store Locator</li>
                <li className="text-secondary">Contact</li>
                <li className="text-secondary">Legal & Privacy</li>
                <li className="text-secondary">Gift Card</li>
              </ul>
            </div>
            <div className="col">
              <ul>
                <h6>Become a member</h6>
                <li className="text-secondary">
                  Join now and get 10% off your second purchase, and free
                  returns on all online purchases!
                </li>
              </ul>
            </div>
          </div>
          <div className="row text-secondary" style={{ fontSize: 13 }}>
            <div className="col">
              <p>A Part of SSS Friendship Group</p>
              <p>
                Urban Attire participates in various affiliate marketing programs, which
                means we may get paid commissions on editorially chosen products
                purchased through our links to retailer sites.
              </p>
              <p>©2021 Urban Attire, Inc. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
