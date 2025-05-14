import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import { createOrder } from "../action/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);

  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice >= 100 ? toPrice(0) : toPrice(10);

  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      // delete order data. order data is in the database
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success]);

  return (
    <div className="container py-5">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="">
        <div className="">
          <h2>Shipping</h2>
          <p>
            <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
            <strong>Address:</strong> {cart.shippingAddress.address} <br />
            <strong>City:</strong> {cart.shippingAddress.city} <br />
            <strong>Postal Code:</strong> {cart.shippingAddress.postalCode}{" "}
            <br />
            <strong>Country:</strong> {cart.shippingAddress.country} <br />
          </p>
        </div>

        <div className="">
          <h2>Payment</h2>
          <p>
            <strong>Method:</strong> {cart.paymentMethod} <br />
          </p>
        </div>

        <div className="">
          <h2>Order Items</h2>
          <ul className="row row-cols-2 row-cols-md-3">
            {cart.cartItems.map((item) => (
              <li className="col" key={item.product}>
                <div className="">
                  <div>
                    <img
                      className=""
                      src={item.image}
                      alt={item.name}
                      style={{ height: 200 }}
                    />
                  </div>
                  <div className="">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div className="">
                    {item.qty} EA x ${item.price} = ${item.qty * item.price}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <ul>
            <li>
              <h2>Order Summary</h2>
            </li>
            <li>
              <div className="mb-2">
                <div className="">Items Price:</div>
                <div className="">${cart.itemsPrice.toFixed(2)}</div>
              </div>
            </li>
            <li>
              <div className="mb-2">
                <div className="">Shipping Price</div>
                <div className="">${cart.shippingPrice.toFixed(2)}</div>
              </div>
            </li>
            <li>
              <div className="">
                <div className="">Tax</div>
                <div className="">${cart.taxPrice.toFixed(2)}</div>
              </div>
            </li>
            <li>
              <div className="mt-3">
                <h4>Order Total</h4>
                <h4 className="fs-3 text-danger">
                  ${cart.totalPrice.toFixed(2)}
                </h4>
              </div>
            </li>
            <li>
              <button
                type="button"
                onClick={placeOrderHandler}
                className="btn btn-dark mt-4 btn-lg"
                disabled={cart.cartItems.length === 0}
              >
                Place Order
              </button>
            </li>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
