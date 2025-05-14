import React from "react";

function OffCanvas() {
  return (
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
  );
}

export default OffCanvas;
