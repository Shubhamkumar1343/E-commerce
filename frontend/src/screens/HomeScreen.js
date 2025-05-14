import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../action/productActions";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import Showcase from "../components/Showcase";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <React.Fragment>
      {/* carousel */}
      <div
        id="carouselExampleCaptions"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div
            className="carousel-item active"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2252&q=80")`,
            }}
          >
            {/* <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2252&q=80"
              className="d-block w-100"
              alt="..."
            /> */}
            <div className="carousel-caption">
              <h1>Women Collection</h1>
              <p className="fw-light fs-5">
                Check it out. Our best quality item in the world.
              </p>
              <Link to="/classification/women">
                <button className="btn btn-outline-light btn-lg mt-3">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
          <div
            className="carousel-item"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1507702553912-a15641e827c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2252&q=80")`,
            }}
          >
            {/* <img
              src="https://images.unsplash.com/photo-1507702553912-a15641e827c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2252&q=80"
              className="d-block w-100"
              alt="..."
            /> */}
            <div className="carousel-caption">
              <h1>Luxuries Items</h1>
              <p className="fw-light fs-5">
                Find the best item in the world at best quality
              </p>
              <button className="btn btn-outline-light btn-lg">Shop Now</button>
            </div>
          </div>
          <div
            className="carousel-item"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1494578379344-d6c710782a3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2250&q=80")`,
            }}
          >
            {/* <img
              src="https://images.unsplash.com/photo-1494578379344-d6c710782a3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2250&q=80"
              className="d-block"
              alt="..."
            /> */}
            <div className="carousel-caption">
              <h1>Women Collection</h1>
              <p className="fw-light fs-5">
                Check it out. Our best quality item in the world.
              </p>
              <button className="btn btn-outline-light btn-lg">Shop Now</button>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container">
        {/* shipping banner */}
        <Banner
          type={"shipping_banner"}
          mainText={"Free shipping on every order!"}
          subText={"Receive items in 3-6 business days"}
        />
      </div>

      <div className="container">
        {/* showcase btn */}
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col mb-5">
            <Showcase
              title={"Women"}
              subtitle={"Look at the women's items"}
              background="https://images.unsplash.com/photo-1494228766058-1430438d10fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2704&q=80"
              link={"/classification/women"}
            />
          </div>
          <div className="col mb-5">
            <Showcase
              title={"Men"}
              subtitle={"Find clothes fit your need"}
              background="https://images.unsplash.com/photo-1603252109303-2751441dd157?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80"
              link={"classification/men"}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center mb-5">
          <h1>New Arrivals</h1>
          <p className="fs-5 fw-light">Look at best Items fit your need!</p>
        </div>

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default HomeScreen;
