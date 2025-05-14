import React, { useEffect, useState } from "react";
import axios from "axios";
import data from "../data";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import LoadingBox from "../components/LoadingBox";
import Filter from "../components/Filter";
import ClothesCategory from "../components/ClothesCategory";
import Banner from "../components/Banner";

function Classification(props) {
  const gender = props.match.params.gender;
  const category = props.match.params.category;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const visible = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 10;

  const [numOfVisibleItems, setNumOfVisibleItems] = useState(visible);

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    setNumOfVisibleItems(visible);
  }, [visible]);

  useEffect(async () => {
    if (category) {
      const { data } = await axios.get(
        `/api/classification/${gender}/${category}`
      );
      setProducts(data);
    } else {
      const { data } = await axios.get(`/api/classification/${gender}`);
      setProducts(data);
    }
    setLoading(false);
  }, [gender, category]);

  // for loading more items
  const showMoreItems = () => {
    if (category) {
      props.history.replace(
        `/classification/${gender}/${category}?visible=${numOfVisibleItems + 5}`
      );
    } else {
      props.history.replace(
        `/classification/${gender}?visible=${numOfVisibleItems + 5}`
      );
    }
  };

  // when user changes order option, this function is called
  const sortProducts = (e) => {
    const sortBy = e.target.value;

    setProducts(
      products
        .slice()
        .sort((a, b) =>
          sortBy === "lowest"
            ? a.price - b.price
            : sortBy === "highest"
            ? b.price - a.price
            : sortBy === "latest"
            ? new Date(b.createdAt) - new Date(a.createdAt)
            : new Date(a.createdAt) - new Date(b.createdAt)
        )
    );
  };

  return loading ? (
    <LoadingBox />
  ) : (
    <div className="container mt-5 mb-5">
      <div className="row row-cols-1">
        {/* Side bar component for category */}
        <Sidebar gender={gender} hiding={"d-none d-md-block"} />
        <div className="col-12 col-md-10">
          <div className="d-flex justify-content-center mb-3 fw-lighter">
            <Link className="text-dark text-decoration-none" to="/">
              home{" "}
            </Link>
            <span className="">{" / "}</span>
            <Link
              className="text-dark text-decoration-none"
              to="/classification/women"
            >
              {gender}
            </Link>
            {category && (
              <>
                <span className="">{"/"}</span>
                <Link className="text-dark text-decoration-none">
                  {category}
                </Link>
              </>
            )}
          </div>
          <div className="d-flex flex-column mb-5">
            <Banner
              type={"perk_banner"}
              mainText={"Member perk: 15% off your app order"}
              subText={
                "Download & find the code in the app! not a member Join now"
              }
            />

            <ClothesCategory gender={gender} />

            <h1 className="fs-1 fw-bold mb-3">
              {gender === "women" ? "Women's Clothing" : "Men's Clothing"}
            </h1>
            <p className="fs-6 fw-light text-secondary">
              {gender === "women"
                ? data.staticText.womenText
                : data.staticText.menText}
            </p>
          </div>

          {/* <div className="d-flex flex-column justify-content-center align-items-center mb-5">
            <h1>Our New Products</h1>
            <p className="fs-5 fw-light">
              Here's Our Gorgeous {gender} Product
            </p>
          </div> */}

          <Filter count={products?.length} sortProducts={sortProducts} />

          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
            {products.slice(0, numOfVisibleItems).map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          {numOfVisibleItems < products.length && (
            <button
              className="btn btn-outline-dark mb-4"
              type="button"
              onClick={showMoreItems}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Classification;
