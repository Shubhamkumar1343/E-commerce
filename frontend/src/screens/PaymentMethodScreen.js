import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../action/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // when a user don't type any value of address then redirect back to the shipping screen
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const { userInfo } = useSelector((state) => state.userSignin);

  // when a user log out, redirect user to the home screen
  if (!userInfo) {
    props.history.push("/");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <div className="container pt-4 pb-5">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="d-flex justify-content-center align-items-center">
        <form className="form" onSubmit={submitHandler}>
          <h1 className="mb-3">Payment</h1>
          <div id="emailHelp" className="form-text mb-4 ">
            Select one of the payment methods you will use.
          </div>
          <div className="form-check fs-5 mb-2">
            <input
              className="form-check-input"
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label className="form-check-label" htmlFor="paypal">
              PayPal
            </label>
          </div>
          <div className="form-check mb-4 fs-5">
            <input
              className="form-check-input"
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label className="form-check-label" htmlFor="stripe">
              Stripe
            </label>
          </div>

          <div className="d-grid">
            <button className="btn btn-outline-dark" type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentMethodScreen;
