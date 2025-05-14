import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { signout } from "./action/userActions";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Classification from "./screens/Classification";
import Footer from "./components/Footer";
import FavoritesScreen from "./screens/FavoritesScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
    window.location.href = "/";
  };

  return (
    <BrowserRouter>
      {/* Nav */}
      <nav
        className="navbar navbar-expand-lg navbar-light sticky-top my-1"
        style={{ backgroundColor: "#FAF9F8" }}
      >
        <div className="container">
          {/* nav brand */}
          <Link className="navbar-brand order-2 order-lg-1 me-auto" to="/">
            <img className="brand_logo" src="/images/h&m_logo.png" alt="" />
          </Link>
          {/* nav mobile toggle btn */}
          <button
            className="navbar-toggler border-0 order-1"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
            // data-bs-toggle="collapse"
            // data-bs-target="#navbarSupportedContent"
            // aria-controls="navbarSupportedContent"
            // aria-expanded="false"
            // aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* nav offcanvas content mobile */}
          <div
            class="offcanvas offcanvas-start fw-light"
            tabindex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div class="offcanvas-header">
              {/* <img className="brand_logo" src="/images/h&m_logo.png" alt="" /> */}
              {!userInfo ? (
                <Link
                  className="d-flex align-items-center ps-2 fw-light"
                  to="/signin"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <i className="far fa-user-circle fs-3 me-3"></i>
                  <span className="fs-5">Sign In</span>
                </Link>
              ) : (
                <div className="d-flex align-items-center ps-2 text-secondary fw-light">
                  <i className="far fa-user-circle me-3 fs-3 "></i>
                  <span className="fs-5">Welcome! {userInfo.name}</span>
                </div>
              )}

              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body fs-5 ps-4">
              <ul className="">
                <li className="">
                  <Link
                    className=""
                    to="/"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    Home
                  </Link>
                </li>
                <li className="">
                  <Link
                    className=""
                    to="/classification/men"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    Men
                  </Link>
                </li>
                <li className="">
                  <Link
                    className=""
                    to="/classification/women"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    Women
                  </Link>
                </li>
                <li className="">
                  <Link
                    className=""
                    to="/favorites"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    Favorites
                  </Link>
                </li>
                {userInfo ? (
                  <li className="">
                    <Link
                      className="dropdown-toggle collapsed"
                      href="#"
                      role="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#user-collapse"
                      aria-expanded="false"
                    >
                      {userInfo.name}
                    </Link>
                    <ul id="user-collapse" className="collapse fs-6 ps-3">
                      <li>
                        <Link
                          className=""
                          to="/profile"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        >
                          User Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className=""
                          to="/orderhistory"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        >
                          Order History
                        </Link>
                      </li>

                      <li>
                        <Link
                          className=""
                          to="#"
                          onClick={signoutHandler}
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        >
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <>
                    <li className="">
                      <Link
                        className=""
                        to="/signin"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        Sign In
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        className=""
                        to="/register"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}

                {userInfo && userInfo.isAdmin && (
                  <li className="">
                    <Link
                      className="dropdown-toggle collapsed"
                      href="#"
                      role="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#admin-collapse"
                      aria-expanded="false"
                    >
                      Admin
                    </Link>
                    <ul className="collapse fs-6 ps-3" id="admin-collapse">
                      <li>
                        <Link
                          className=""
                          to="/orderhistory"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        >
                          Order History
                        </Link>
                      </li>

                      <li>
                        <Link
                          className=""
                          to="/productlist"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        >
                          Product List
                        </Link>
                      </li>

                      <li>
                        <Link
                          className=""
                          to="/userlist"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        >
                          User List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className=""
                          to="/#"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        >
                          Orders
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}

                <li className="mt-5">
                  <Link
                    className="cart"
                    to="/cart"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    <ShoppingCartIcon style={{ fontSize: 28 }} /> Cart
                    {cartItems.length > 0 && (
                      <span className="badge">
                        <span>{cartItems.length}</span>
                      </span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* nav content (lg ->) */}
          <div
            className="collapse navbar-collapse order-lg-2"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/classification/women">
                  Women
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/classification/men">
                  Men
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/favorites">
                  Favorites
                </Link>
              </li>
              {userInfo ? (
                <li className="nav-item dropdown hover-menu">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userInfo.name}
                  </Link>
                  <ul className="border p-2" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        User Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/orderhistory">
                        Order History
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}

              {userInfo && userInfo.isAdmin && (
                <li className="nav-item dropdown hover-menu">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin
                  </Link>
                  <ul className="border p-2" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/orderhistory">
                        Order History
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/productlist">
                        Product List
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/userlist">
                        User List
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/#">
                        Orders
                      </Link>
                    </li>
                  </ul>
                </li>
              )}

              <li className="nav-item">
                <Link className="nav-link cart" to="/cart">
                  <ShoppingCartIcon style={{ fontSize: 28 }} />

                  {cartItems.length > 0 && (
                    <span className="badge">
                      <span>{cartItems.length}</span>
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Router Screen */}
      <main className="my-auto">
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/shipping" component={ShippingAddressScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
        <Route path="/profile" component={ProfileScreen}></Route>
        {/* <Route
          path="/classification/:gender"
          exact
          component={Classification}
        ></Route> */}
        <Route
          path="/classification/:gender/:category?"
          exact
          component={Classification}
        ></Route>
        <Route path="/favorites" exact component={FavoritesScreen}></Route>
        <Route
          path="/productlist"
          exact
          render={(props) =>
            userInfo && userInfo.isAdmin ? (
              <ProductListScreen {...props}></ProductListScreen>
            ) : (
              <Redirect to="/"></Redirect>
            )
          }
        ></Route>
        <Route
          path="/product/:id/edit"
          exact
          render={(props) =>
            userInfo && userInfo.isAdmin ? (
              <ProductEditScreen {...props}></ProductEditScreen>
            ) : (
              <Redirect to="/signin" />
            )
          }
        ></Route>
        <Route
          path="/userlist"
          exact
          render={(props) =>
            userInfo && userInfo.isAdmin ? (
              <UserListScreen {...props}></UserListScreen>
            ) : (
              <Redirect to="/"></Redirect>
            )
          }
        ></Route>
        <Route
          path="/users/:id/edit"
          exact
          render={(props) =>
            userInfo && userInfo.isAdmin ? (
              <UserEditScreen {...props}></UserEditScreen>
            ) : (
              <Redirect to="/"></Redirect>
            )
          }
        ></Route>
        <Route path="/" component={HomeScreen} exact></Route>
      </main>

      {/* Footer Component */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
