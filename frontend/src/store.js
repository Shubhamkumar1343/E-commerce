import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { favoriteReducer } from "./reducers/favoriteReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMineListReducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import {
  productDetailsReducers,
  productListReducers,
  productCreateReducer,
  productDeleteReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userEditReducer,
  userListReducer,
  userRegisterReducer,
  userSignReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : "",
    paymentMethod: "PayPal",
  },
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : "",
  },
  favorite: {
    favoriteItems: localStorage.getItem("favoriteItems")
      ? JSON.parse(localStorage.getItem("favoriteItems"))
      : [],
  },
};
const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  userSignin: userSignReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userEdit: userEditReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
