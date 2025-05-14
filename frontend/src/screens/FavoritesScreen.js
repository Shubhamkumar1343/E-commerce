import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllFavorite } from "../action/favoriteActions";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";

function FavoritesScreen(props) {
  const favorite = useSelector((state) => state.favorite);
  const { favoriteItems } = favorite;
  const dispatch = useDispatch();

  const clearAll = () => {
    dispatch(clearAllFavorite());
  };

  const browseNow = () => {
    props.history.push("/classification/women");
  };

  return (
    <div className="container my-5 p-5 text-center">
      <div className="mb-4">
        <h1 className="">Favorites</h1>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="d-flex flex-column justify-content-center align-items-center mb-5">
          <h6 className="fs-5 mb-3">SAVE YOUR FAVORITE ITEMS</h6>
          <p className="text-secondary fw-light mb-5">
            Like to save the items that you love? Just click on the heart symbol
            on the item and it will show up here.
          </p>
          <button className="btn btn-outline-dark btn-lg" onClick={browseNow}>
            Browse Now
          </button>
        </div>
      ) : (
        <>
          <div className="row row-cols-2 row-cols-md-3">
            {favoriteItems.map((favorite) => (
              <Product key={favorite._id} product={favorite} />
            ))}
          </div>
          <div className="d-flex justify-content-center mb-5">
            <button className="btn btn-outline-dark" onClick={clearAll}>
              Clear All Favorites
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default FavoritesScreen;
