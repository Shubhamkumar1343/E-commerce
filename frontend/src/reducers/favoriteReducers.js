import {
  FAVORITE_ADD_ITEM,
  FAVORITE_CLEAR_ALL,
  FAVORITE_REMOVE_ITEM,
} from "../constants/favoriteConstants";

export const favoriteReducer = (state = { favoriteItems: [] }, action) => {
  switch (action.type) {
    case FAVORITE_ADD_ITEM:
      const item = action.payload;
      return { ...state, favoriteItems: [...state.favoriteItems, item] };

    case FAVORITE_REMOVE_ITEM:
      return {
        ...state,
        favoriteItems: state.favoriteItems.filter(
          (el) => el._id !== action.payload
        ),
      };

    case FAVORITE_CLEAR_ALL:
      return { ...state, favoriteItems: [] };

    default:
      return state;
  }
};
