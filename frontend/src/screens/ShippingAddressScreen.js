import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../action/cartActions";

function ShippingAddressScreen(props) {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // when a user do a sign out, user will redirect to the home screen from shipping screen
  if (!userInfo) {
    props.history.push("/signin");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };

  return (
    <div className="container pt-4 pb-5">
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="d-flex justify-content-center align-items-center">
        <form className="form" onSubmit={submitHandler}>
          <h1 className="mb-4">Shipping</h1>

          <div className="mb-3">
            <label className="form-label" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="form-control"
              value={fullName}
              placeholder="Enter full name"
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <div class="form-text">Fill in your first name and last name.</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="form-control"
              value={address}
              placeholder="Enter address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <div class="form-text">Fill in your Address exactly.</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              className="form-control"
              value={city}
              placeholder="Enter city"
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="postal code">
              Postal Code
            </label>
            <input
              type="text"
              id="postal code"
              className="form-control"
              value={postalCode}
              placeholder="Enter postal code"
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label className="form-label" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              id="country"
              className="form-control"
              value={country}
              placeholder="Enter country"
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-outline-dark" type="submit">
              Continue to payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShippingAddressScreen;
