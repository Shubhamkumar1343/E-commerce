import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct } from "../action/productActions";
import { addToFavorite, removeFromFavorite } from "../action/favoriteActions";
import Recommend from "../components/Recommend";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);

  const favorite = useSelector((state) => state.favorite);
  const { favoriteItems } = favorite;

  const [favorites, setFavorites] = useState({ clicked: false, favorite: "" });

  const productDetails = useSelector((state) => state.productDetails);
  const productId = props.match.params.id;
  const { loading, error, product } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [productId]);

  // toggle favorites
  useEffect(() => {
    if (favorites.favorite && favorites.clicked === true) {
      dispatch(addToFavorite(productId));
      setFavorites({ ...favorites, clicked: false });
    } else if (favorites.favorite === false) {
      dispatch(removeFromFavorite(productId));
    }
  }, [favorites]);

  // For checking an item already been added to favorites section
  useEffect(() => {
    const alreadyAdded = favoriteItems.find((el) => el._id === productId);

    if (alreadyAdded) {
      setFavorites({ ...favorites, favorite: true });
    }
  }, []);

  // For adding an item to the cart
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <React.Fragment>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="container py-3">
          {/* <Link to="/">Back to home</Link> */}
          <div className="row row-cols-1 row-cols-md-2">
            <div className="col-md-6 text-center mb-3">
              <img
                // style={{ maxWidth: 300 }}
                className="img-fluid"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="col-md-6">
              <ul>
                <li>
                  <h2>{product.name}</h2>
                </li>
                <li className="mb-3">
                  <h6>{product.brand}</h6>
                </li>
                <li className="d-flex align-items-center justify-content-between">
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                  {favorites.favorite ? (
                    <span
                      className="mb-3 me-5 text-danger pointer"
                      onClick={() => {
                        setFavorites({
                          favorite: !favorites.favorite,
                          clicked: true,
                        });
                      }}
                    >
                      <i class="fas fa-heart"> Favorite</i>
                    </span>
                  ) : (
                    <span
                      className="mb-3 me-5 pointer"
                      onClick={() => {
                        setFavorites({
                          favorite: !favorites.favorite,
                          clicked: true,
                        });
                      }}
                    >
                      <i className="far fa-heart"> Favorite</i>
                    </span>
                  )}
                </li>
                <li className="mb-3 text-danger fs-5">
                  ${Number(product.price).toFixed(2)}
                </li>
                <li className="text-secondary fw-light">
                  <p>{product.description}</p>
                </li>
              </ul>

              <ul>
                <li className="mb-2">
                  <h5 className="mb-1">Status</h5>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="text-success fs-5">In Stock</span>
                    ) : (
                      <span className="text-danger fs-5">Unavailable</span>
                    )}
                  </div>
                </li>
                {product.countInStock > 0 && (
                  <>
                    <li className="mb-4">
                      <div className="">
                        <h5 className="mb-2">Qty</h5>
                        <div className="">
                          <select
                            style={{ width: 70 }}
                            className="form-select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (item) => (
                                <option key={item + 1} value={item + 1}>
                                  {item + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </li>
                    <li>
                      <button
                        className="btn btn-dark btn-lg"
                        onClick={addToCartHandler}
                      >
                        ADD TO CART
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <Recommend
            gender={product.gender}
            category={product.category}
            id={productId}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default ProductScreen;
