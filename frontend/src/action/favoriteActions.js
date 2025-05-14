import axios from "axios";
import {
  FAVORITE_ADD_ITEM,
  FAVORITE_CLEAR_ALL,
  FAVORITE_REMOVE_ITEM,
} from "../constants/favoriteConstants";

export const addToFavorite = (productId) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${productId}`);
  dispatch({
    type: FAVORITE_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      brand: data.brand,
      category: data.category,
      _id: data._id,
    },
  });

  localStorage.setItem(
    "favoriteItems",
    JSON.stringify(getState().favorite.favoriteItems)
  );
};

export const removeFromFavorite = (productId) => (dispatch, getState) => {
  dispatch({ type: FAVORITE_REMOVE_ITEM, payload: productId });
  localStorage.setItem(
    "favoriteItems",
    JSON.stringify(getState().favorite.favoriteItems)
  );
};

export const clearAllFavorite = () => (dispatch) => {
  dispatch({ type: FAVORITE_CLEAR_ALL });
  localStorage.setItem("favoriteItems", JSON.stringify([]));
};
