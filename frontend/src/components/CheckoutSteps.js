import React from "react";

function CheckoutSteps(props) {
  return (
    <div className="flex checkout-steps mb-5 text-center">
      <div className={props.step2 ? "active" : ""}>Shipping</div>
      <div className={props.step3 ? "active" : ""}>Payment</div>
      <div className={props.step4 ? "active" : ""}>Place Order</div>
    </div>
  );
}

export default CheckoutSteps;
